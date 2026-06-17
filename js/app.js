/**
 * 功過格アプリケーションコアロジック
 * 
 * 状態管理、LocalStorage連携、UIレンダリング、Chart.js描画、
 * データのインポート/エクスポート、カスタム項目編集などの機能を含みます。
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. アプリケーションの状態 (State)
  // ==========================================================================
  
  let state = {
    currentDate: getTodayDateString(),
    currentPreset: "modern", // 'modern' or 'traditional'
    theme: "light",          // 'light' (和紙) or 'dark' (禅)
    items: {
      modern: { merits: [], demerits: [] },
      traditional: { merits: [], demerits: [] }
    },
    records: {},             // 'YYYY-MM-DD' => { counts: { itemId: count }, diary: "" }
    goal: null               // { title, target, description, startDate }
  };

  // チャートインスタンスの参照保持用
  let cumulativeChartInstance = null;
  let categoryChartInstance = null;

  // ==========================================================================
  // 2. 初期化とデータ読み込み (Initialization & LocalStorage)
  // ==========================================================================

  function init() {
    // 2.1 テーマの読み込み
    const savedTheme = localStorage.getItem("koukakaku_theme");
    if (savedTheme) {
      state.theme = savedTheme;
    } else {
      state.theme = "light"; // デフォルトは和紙ライト
    }
    applyTheme(state.theme);

    // 2.2 プリセット項目の読み込み・初期化
    const savedItems = localStorage.getItem("koukakaku_items");
    if (savedItems) {
      try {
        state.items = JSON.parse(savedItems);
      } catch (e) {
        console.error("項目データのパースに失敗しました。デフォルトをロードします。", e);
        loadDefaultPresets();
      }
    } else {
      loadDefaultPresets();
    }

    // 2.3 選択中プリセットの読み込み
    const savedPreset = localStorage.getItem("koukakaku_current_preset");
    if (savedPreset && (savedPreset === "modern" || savedPreset === "traditional")) {
      state.currentPreset = savedPreset;
    }

    // 2.4 記録データの読み込み
    const savedRecords = localStorage.getItem("koukakaku_records");
    if (savedRecords) {
      try {
        state.records = JSON.parse(savedRecords);
      } catch (e) {
        console.error("記録データのパースに失敗しました。", e);
        state.records = {};
      }
    }

    // 2.5 目標（誓願）データの読み込み
    const savedGoal = localStorage.getItem("koukakaku_goal");
    if (savedGoal) {
      try {
        state.goal = JSON.parse(savedGoal);
      } catch (e) {
        console.error("目標データのパースに失敗しました。", e);
        state.goal = null;
      }
    }

    // 2.6 UI要素への日付反映と各種設定の描画
    document.getElementById("current-date-picker").value = state.currentDate;
    updatePresetSwitcherUI();

    // 初回レンダリング
    renderAll();
    setupEventListeners();
  }

  // デフォルトプリセットを presets.js からロードする
  function loadDefaultPresets() {
    state.items.modern.merits = JSON.parse(JSON.stringify(KOUKAKAKU_PRESETS.modern.merits));
    state.items.modern.demerits = JSON.parse(JSON.stringify(KOUKAKAKU_PRESETS.modern.demerits));
    state.items.traditional.merits = JSON.parse(JSON.stringify(KOUKAKAKU_PRESETS.traditional.merits));
    state.items.traditional.demerits = JSON.parse(JSON.stringify(KOUKAKAKU_PRESETS.traditional.demerits));
    saveItemsToStorage();
  }

  // 永続化ヘルパー
  function saveItemsToStorage() {
    localStorage.setItem("koukakaku_items", JSON.stringify(state.items));
  }

  function saveRecordsToStorage() {
    localStorage.setItem("koukakaku_records", JSON.stringify(state.records));
  }

  function saveGoalToStorage() {
    if (state.goal) {
      localStorage.setItem("koukakaku_goal", JSON.stringify(state.goal));
    } else {
      localStorage.removeItem("koukakaku_goal");
    }
  }

  // ==========================================================================
  // 3. UIの更新・描画 (Rendering)
  // ==========================================================================

  function renderAll() {
    renderDashboard();
    renderReflectionTab();
    renderStatsTab();
    renderGoalTab();
    renderEditorTab();
  }

  // 3.1 ダッシュボード（今日の功・過・相殺スコア）の描画
  function renderDashboard() {
    const dayScores = calculateDayScore(state.currentDate);

    // 善（功）点数
    const dispMerit = document.getElementById("disp-today-merit");
    dispMerit.innerHTML = `${dayScores.merit}<span class="unit">点</span>`;
    document.getElementById("trend-today-merit").textContent = `善行回数: ${dayScores.meritCount}回`;

    // 悪（過）点数
    const dispDemerit = document.getElementById("disp-today-demerit");
    dispDemerit.innerHTML = `${dayScores.demerit}<span class="unit">点</span>`; // 負の値で表示
    document.getElementById("trend-today-demerit").textContent = `悪行回数: ${dayScores.demeritCount}回`;

    // 相殺スコア
    const dispNet = document.getElementById("disp-today-net");
    const trendNet = document.getElementById("trend-today-net");
    const net = dayScores.net;

    if (net > 0) {
      dispNet.innerHTML = `+${net}<span class="unit">点</span>`;
      dispNet.style.color = "var(--color-merit)";
      trendNet.textContent = "素晴らしい一日でした！この調子で善を積みましょう。";
    } else if (net < 0) {
      dispNet.innerHTML = `${net}<span class="unit">点</span>`;
      dispNet.style.color = "var(--color-demerit)";
      trendNet.textContent = "深く省察し、明日はより良き行いを心がけましょう。";
    } else {
      dispNet.innerHTML = `±0<span class="unit">点</span>`;
      dispNet.style.color = "var(--text-primary)";
      trendNet.textContent = "自己の省察に努め、一日一善を意識しましょう。";
    }
  }

  // 3.2 「今日の省察」タブの描画
  function renderReflectionTab() {
    const activePreset = state.items[state.currentPreset];
    const record = state.records[state.currentDate] || { counts: {}, diary: "" };

    const meritContainer = document.getElementById("merit-list-container");
    const demeritContainer = document.getElementById("demerit-list-container");
    const diaryInput = document.getElementById("reflection-diary-input");

    // 日記テキストの設定
    diaryInput.value = record.diary || "";

    // リスト初期化
    meritContainer.innerHTML = "";
    demeritContainer.innerHTML = "";

    let totalMeritsPoints = 0;
    let totalDemeritsPoints = 0;

    // 善行リストのレンダリング
    activePreset.merits.forEach(item => {
      const count = record.counts[item.id] || 0;
      totalMeritsPoints += count * item.points;

      const itemEl = createLedgerItemElement(item, count, "merit");
      meritContainer.appendChild(itemEl);
    });

    // 悪行リストのレンダリング
    activePreset.demerits.forEach(item => {
      const count = record.counts[item.id] || 0;
      totalDemeritsPoints += count * item.points; // item.points は負数

      const itemEl = createLedgerItemElement(item, count, "demerit");
      demeritContainer.appendChild(itemEl);
    });

    // カラムヘッダーの合計点更新
    document.getElementById("merit-column-total").textContent = `+${totalMeritsPoints}点`;
    document.getElementById("demerit-column-total").textContent = `${totalDemeritsPoints}点`;
  }

  // 功過アイテム要素の作成
  function createLedgerItemElement(item, count, type) {
    const div = document.createElement("div");
    div.className = `ledger-item ${count > 0 ? 'has-count' : ''}`;
    div.setAttribute("data-id", item.id);

    const sign = type === "merit" ? "+" : "";
    
    div.innerHTML = `
      <div class="item-info">
        <div class="item-header">
          <span class="item-name">${escapeHTML(item.name)}</span>
          <span class="item-badge">${sign}${item.points}</span>
        </div>
        ${item.desc ? `<div class="item-desc">${escapeHTML(item.desc)}</div>` : ''}
      </div>
      <div class="item-controls">
        <button type="button" class="count-btn btn-decrement" aria-label="減らす">−</button>
        <span class="count-display">${count}</span>
        <button type="button" class="count-btn btn-increment" aria-label="増やす">+</button>
      </div>
    `;

    // イベントリスナーの追加
    const btnDec = div.querySelector(".btn-decrement");
    const btnInc = div.querySelector(".btn-increment");
    const display = div.querySelector(".count-display");

    btnDec.addEventListener("click", () => {
      updateItemCount(item.id, -1);
    });

    btnInc.addEventListener("click", () => {
      updateItemCount(item.id, 1);
    });

    return div;
  }

  // 3.3 「統計・軌跡」タブの描画
  function renderStatsTab() {
    renderCalendarGrid();
    renderCharts();
  }

  // GitHub風芝生カレンダーの描画
  function renderCalendarGrid() {
    const container = document.getElementById("calendar-weeks-grid");
    container.innerHTML = "";

    // 直近365日（53週分）の日付リストを作成
    const today = new Date();
    const dates = [];

    // 日曜日から始めるため、364日前の週の日曜日を探す
    const totalDays = 364; // 52週 * 7日 = 364
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - totalDays);
    
    // 開始日を日曜日まで戻す
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);

    const tempDate = new Date(startDate);
    const endDate = new Date(today);

    while (tempDate <= endDate) {
      dates.push(new Date(tempDate));
      tempDate.setDate(tempDate.getDate() + 1);
    }

    // 週ごとにグループ化して配置する
    let currentWeekEl = null;

    dates.forEach((date, index) => {
      // 日曜日に新しい週要素を作成
      if (index % 7 === 0) {
        currentWeekEl = document.createElement("div");
        currentWeekEl.className = "calendar-week";
        container.appendChild(currentWeekEl);
      }

      const dateStr = formatDate(date);
      const scores = calculateDayScore(dateStr);
      const net = scores.net;

      const dayEl = document.createElement("div");
      dayEl.className = "calendar-day";
      dayEl.setAttribute("data-date", dateStr);
      dayEl.setAttribute("data-score", net);

      // 芝生の色レベル（功過スコア）の決定
      let level = "zero";
      if (net > 0) {
        if (net <= 3) level = "m-1";
        else if (net <= 10) level = "m-2";
        else level = "m-3";
      } else if (net < 0) {
        if (net >= -3) level = "d-1";
        else if (net >= -10) level = "d-2";
        else level = "d-3";
      }
      dayEl.setAttribute("data-level", level);

      // クリックでその日の編集画面にジャンプする
      dayEl.addEventListener("click", () => {
        state.currentDate = dateStr;
        document.getElementById("current-date-picker").value = dateStr;
        
        // 今日の省察タブに切り替え
        switchTab("tab-reflection");
        renderDashboard();
        renderReflectionTab();
      });

      currentWeekEl.appendChild(dayEl);
    });
  }

  // 3.4 グラフ描画（Chart.js）
  function renderCharts() {
    // データ収集
    const allDates = Object.keys(state.records).sort();
    if (allDates.length === 0) {
      // 記録がない場合のプレースホルダー処理
      drawEmptyCharts();
      return;
    }

    // --- 1. 累積スコア推移グラフ ---
    const cumulativeLabels = [];
    const cumulativeData = [];
    let runningSum = 0;

    // 最新の記録日に向けて時系列順に集計
    allDates.forEach(dateStr => {
      const net = calculateDayScore(dateStr).net;
      runningSum += net;
      cumulativeLabels.push(dateStr.substring(5)); // 'MM-DD' にトリミングして見やすく
      cumulativeData.push(runningSum);
    });

    const ctxCumulative = document.getElementById("chart-cumulative-score").getContext("2d");
    if (cumulativeChartInstance) {
      cumulativeChartInstance.destroy();
    }

    const isDark = state.theme === "dark";
    const gridColor = isDark ? "#2c3830" : "#d1c9b7";
    const textColor = isDark ? "#dfede5" : "#2b2b2b";

    cumulativeChartInstance = new Chart(ctxCumulative, {
      type: 'line',
      data: {
        labels: cumulativeLabels,
        datasets: [{
          label: '累積スコア',
          data: cumulativeData,
          borderColor: isDark ? '#3ebd8e' : '#c29c53',
          backgroundColor: isDark ? 'rgba(62, 189, 142, 0.1)' : 'rgba(194, 156, 83, 0.1)',
          fill: true,
          tension: 0.2,
          borderWidth: 2,
          pointRadius: cumulativeData.length < 30 ? 3 : 0,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: textColor, font: { family: 'Montserrat' } }
          },
          y: {
            grid: { color: gridColor },
            ticks: { color: textColor, font: { family: 'Montserrat' } }
          }
        }
      }
    });

    // --- 2. カテゴリ別比率グラフ（善行のみ） ---
    const categoryCounts = {};
    Object.values(state.records).forEach(record => {
      Object.entries(record.counts).forEach(([itemId, count]) => {
        if (count <= 0) return;
        
        // プリセット・カスタム全体から項目を探す
        const item = findItemById(itemId);
        if (item && item.points > 0) { // 善行のみ
          const cat = item.category || "その他";
          categoryCounts[cat] = (categoryCounts[cat] || 0) + count;
        }
      });
    });

    const categories = Object.keys(categoryCounts);
    const categoryData = Object.values(categoryCounts);

    const ctxCategory = document.getElementById("chart-category-ratio").getContext("2d");
    if (categoryChartInstance) {
      categoryChartInstance.destroy();
    }

    if (categories.length === 0) {
      drawEmptyCategoryChart();
      return;
    }

    // 和紙/禅にあわせた配色
    const colors = isDark 
      ? ['#3ebd8e', '#d4af37', '#62776d', '#2ebdcd', '#b388ff', '#ff80ab']
      : ['#1e5f49', '#c29c53', '#5a5447', '#3a7280', '#6d5a80', '#b54e3d'];

    categoryChartInstance = new Chart(ctxCategory, {
      type: 'doughnut',
      data: {
        labels: categories,
        datasets: [{
          data: categoryData,
          backgroundColor: colors.slice(0, categories.length),
          borderWidth: isDark ? 2 : 1,
          borderColor: isDark ? '#0c120e' : '#f6f3eb'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: { color: textColor, font: { family: 'Noto Sans JP' } }
          }
        }
      }
    });
  }

  function drawEmptyCharts() {
    const ctx1 = document.getElementById("chart-cumulative-score").getContext("2d");
    if (cumulativeChartInstance) cumulativeChartInstance.destroy();
    ctx1.clearRect(0,0,300,300);

    const ctx2 = document.getElementById("chart-category-ratio").getContext("2d");
    if (categoryChartInstance) categoryChartInstance.destroy();
    ctx2.clearRect(0,0,300,300);
  }

  function drawEmptyCategoryChart() {
    const ctx = document.getElementById("chart-category-ratio").getContext("2d");
    if (categoryChartInstance) categoryChartInstance.destroy();
    ctx.clearRect(0,0,300,300);
  }

  // 3.5 「立命の誓願」タブの描画
  function renderGoalTab() {
    const statusContainer = document.getElementById("goal-status-container");
    const setupForm = document.getElementById("goal-setup-form");

    if (state.goal) {
      statusContainer.style.display = "flex";
      setupForm.style.display = "none";

      // 値の算出
      document.getElementById("display-goal-title").textContent = state.goal.title;
      document.getElementById("display-goal-description").textContent = state.goal.description || "（決意の記述なし）";
      document.getElementById("display-goal-start-date").textContent = state.goal.startDate;

      // 開始日からの累計ポイント計算
      const accumulatedScore = calculateAccumulatedScoreFrom(state.goal.startDate);
      document.getElementById("display-goal-current-score").textContent = `${accumulatedScore} 点`;

      // 目標スコアと進捗率
      const target = state.goal.target;
      const percent = Math.max(0, Math.min(100, Math.round((accumulatedScore / target) * 100)));
      document.getElementById("display-goal-progress-text").textContent = `${accumulatedScore} / ${target} 点 (${percent}%)`;
      document.getElementById("goal-progress-bar-fill").style.width = `${percent}%`;

      // 一日平均スコアの計算
      const daysElapsed = getDaysBetween(state.goal.startDate, getTodayDateString()) + 1; // 当日も含めるため+1
      const dailyAvg = (accumulatedScore / daysElapsed).toFixed(1);
      document.getElementById("display-goal-daily-avg").textContent = `${dailyAvg} 点`;

      // 予測日の計算
      const estDateEl = document.getElementById("display-goal-estimated-date");
      const remainingScore = target - accumulatedScore;

      if (remainingScore <= 0) {
        estDateEl.textContent = "祝・誓願達成！";
        estDateEl.style.color = "var(--color-merit)";
      } else if (dailyAvg <= 0) {
        estDateEl.textContent = "測定不能（善行を重ねましょう）";
        estDateEl.style.color = "var(--text-muted)";
      } else {
        const daysToTarget = Math.ceil(remainingScore / dailyAvg);
        const estDate = new Date();
        estDate.setDate(estDate.getDate() + daysToTarget);
        estDateEl.textContent = formatDate(estDate);
        estDateEl.style.color = "var(--text-primary)";
      }

    } else {
      statusContainer.style.display = "none";
      setupForm.style.display = "block";
    }
  }

  // 3.6 「項目の編集」タブの描画
  function renderEditorTab() {
    const listContainer = document.getElementById("editor-items-container");
    listContainer.innerHTML = "";

    const activePreset = state.items[state.currentPreset];
    const filter = document.getElementById("editor-filter-preset").value;

    const renderList = [];

    if (filter === "all" || filter === "merits") {
      activePreset.merits.forEach(item => renderList.push({ ...item, type: "merit" }));
    }
    if (filter === "all" || filter === "demerits") {
      activePreset.demerits.forEach(item => renderList.push({ ...item, type: "demerit" }));
    }

    renderList.forEach(item => {
      const card = document.createElement("div");
      card.className = "ledger-item";
      card.style.padding = "12px 16px";
      
      const typeLabel = item.type === "merit" ? "善" : "悪";
      const typeClass = item.type === "merit" ? "var(--color-merit)" : "var(--color-demerit)";
      const sign = item.type === "merit" ? "+" : "";

      card.innerHTML = `
        <div class="item-info">
          <div class="item-header" style="gap: 6px;">
            <span style="font-size: 11px; font-weight: 700; background: ${typeClass}; color: #fff; padding: 1px 4px; border-radius: 3px;">${typeLabel}</span>
            <span class="item-name" style="font-size: 14px;">${escapeHTML(item.name)}</span>
            <span class="item-badge">${sign}${item.points}点</span>
          </div>
          <div class="item-desc" style="font-size: 11px; color: var(--text-secondary);">${escapeHTML(item.category || "その他")} ${item.desc ? ` - ${escapeHTML(item.desc)}` : ''}</div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button type="button" class="preset-btn btn-edit-item" style="padding: 4px 10px; font-size:11px;">編集</button>
          <button type="button" class="item-delete-btn" aria-label="削除">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </button>
        </div>
      `;

      // 編集イベント
      card.querySelector(".btn-edit-item").addEventListener("click", () => {
        setupEditForm(item);
      });

      // 削除イベント
      card.querySelector(".item-delete-btn").addEventListener("click", () => {
        if (confirm(`「${item.name}」を削除しますか？\n（これまでの記録データに含まれるこの項目の点数は集計されなくなります）`)) {
          deleteItem(item.id, item.type);
        }
      });

      listContainer.appendChild(card);
    });
  }

  // 編集フォームのセットアップ
  function setupEditForm(item) {
    document.getElementById("editor-form-title").textContent = "項目の編集";
    document.getElementById("edit-item-id").value = item.id;
    document.getElementById("custom-item-name").value = item.name;
    document.getElementById("custom-item-points").value = Math.abs(item.points);
    document.getElementById("custom-item-category").value = item.category || "";
    document.getElementById("custom-item-desc").value = item.desc || "";

    const radios = document.getElementsByName("custom-item-type");
    for (let r of radios) {
      r.checked = r.value === item.type;
      r.disabled = true; // タイプの変更は不可とする（安全のため）
    }

    document.getElementById("btn-cancel-custom-edit").style.display = "inline-block";
    document.getElementById("btn-save-custom-item").textContent = "更新する";
  }

  function resetEditorForm() {
    document.getElementById("editor-form-title").textContent = "新規項目の追加";
    document.getElementById("edit-item-id").value = "";
    document.getElementById("custom-item-name").value = "";
    document.getElementById("custom-item-points").value = "1";
    document.getElementById("custom-item-category").value = "";
    document.getElementById("custom-item-desc").value = "";

    const radios = document.getElementsByName("custom-item-type");
    for (let r of radios) {
      r.disabled = false;
    }
    radios[0].checked = true;

    document.getElementById("btn-cancel-custom-edit").style.display = "none";
    document.getElementById("btn-save-custom-item").textContent = "保存する";
  }

  // ==========================================================================
  // 4. データ操作ロジック (Data Operations)
  // ==========================================================================

  // 今日の特定項目のカウント加減
  function updateItemCount(itemId, diff) {
    if (!state.records[state.currentDate]) {
      state.records[state.currentDate] = { counts: {}, diary: "" };
    }
    
    const record = state.records[state.currentDate];
    const currentCount = record.counts[itemId] || 0;
    const newCount = Math.max(0, currentCount + diff);

    if (newCount === 0) {
      delete record.counts[itemId];
    } else {
      record.counts[itemId] = newCount;
    }

    // 空のレコードはクリーンアップ
    if (Object.keys(record.counts).length === 0 && (!record.diary || record.diary.trim() === "")) {
      delete state.records[state.currentDate];
    }

    saveRecordsToStorage();
    renderDashboard();
    renderReflectionTab();
  }

  // 1日のスコア算出
  function calculateDayScore(dateStr) {
    const record = state.records[dateStr];
    let merit = 0;
    let demerit = 0;
    let meritCount = 0;
    let demeritCount = 0;

    if (record && record.counts) {
      Object.entries(record.counts).forEach(([itemId, count]) => {
        const item = findItemById(itemId);
        if (item) {
          if (item.points > 0) {
            merit += count * item.points;
            meritCount += count;
          } else {
            demerit += count * item.points; // demerit points は負値
            demeritCount += count;
          }
        }
      });
    }

    return {
      merit,
      demerit,
      meritCount,
      demeritCount,
      net: merit + demerit
    };
  }

  // 目標期間内の累積スコアの計算
  function calculateAccumulatedScoreFrom(startDateStr) {
    let sum = 0;
    const start = new Date(startDateStr);

    Object.keys(state.records).forEach(dateStr => {
      const date = new Date(dateStr);
      if (date >= start) {
        sum += calculateDayScore(dateStr).net;
      }
    });

    return sum;
  }

  // 全アイテムの中からIDで検索
  function findItemById(id) {
    // アクティブなプリセット内を探す
    const active = state.items[state.currentPreset];
    let found = active.merits.find(i => i.id === id) || active.demerits.find(i => i.id === id);
    if (found) return found;

    // 非アクティブなプリセット内も探す（過去の記録整合性のため）
    const inactivePresetName = state.currentPreset === "modern" ? "traditional" : "modern";
    const inactive = state.items[inactivePresetName];
    return inactive.merits.find(i => i.id === id) || inactive.demerits.find(i => i.id === id);
  }

  // 項目の削除
  function deleteItem(id, type) {
    const listName = type === "merit" ? "merits" : "demerits";
    state.items[state.currentPreset][listName] = state.items[state.currentPreset][listName].filter(item => item.id !== id);
    
    saveItemsToStorage();
    renderAll();
    resetEditorForm();
  }

  // プリセット切り替え
  function togglePreset() {
    state.currentPreset = state.currentPreset === "modern" ? "traditional" : "modern";
    localStorage.setItem("koukakaku_current_preset", state.currentPreset);
    updatePresetSwitcherUI();
    renderAll();
  }

  function updatePresetSwitcherUI() {
    const title = document.getElementById("current-preset-name");
    const desc = document.getElementById("current-preset-desc");
    const btn = document.getElementById("btn-toggle-preset");

    if (state.currentPreset === "modern") {
      title.textContent = "現代版（セルフケア項目）";
      desc.textContent = "日常生活の習慣改善、メンタルケア、自己研鑽を重視した項目です。";
      btn.textContent = "伝統版（古典項目）へ切り替え";
    } else {
      title.textContent = "伝統版（古典項目）";
      desc.textContent = "社会倫理、命の尊厳、克己の精神を重視する伝統的な善悪基準です。";
      btn.textContent = "現代版（セルフケア項目）へ切り替え";
    }
  }

  // ==========================================================================
  // 5. イベントリスナーの設定 (Event Listeners)
  // ==========================================================================

  function setupEventListeners() {
    // 5.1 ナビゲーション切り替え
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
      item.addEventListener("click", () => {
        const targetTab = item.getAttribute("data-target");
        
        // アクティブ表示切り替え
        navItems.forEach(n => n.classList.remove("active"));
        item.classList.add("active");

        switchTab(targetTab);
      });
    });

    // 5.2 日付切り替え
    const datePicker = document.getElementById("current-date-picker");
    datePicker.addEventListener("change", (e) => {
      state.currentDate = e.target.value;
      renderDashboard();
      renderReflectionTab();
    });

    document.getElementById("btn-prev-day").addEventListener("click", () => {
      changeDay(-1);
    });

    document.getElementById("btn-next-day").addEventListener("click", () => {
      changeDay(1);
    });

    // 5.3 日記（省察録）入力
    const diaryInput = document.getElementById("reflection-diary-input");
    diaryInput.addEventListener("input", (e) => {
      if (!state.records[state.currentDate]) {
        state.records[state.currentDate] = { counts: {}, diary: "" };
      }
      state.records[state.currentDate].diary = e.target.value;
      
      // 空なら削除
      if (e.target.value.trim() === "" && Object.keys(state.records[state.currentDate].counts).length === 0) {
        delete state.records[state.currentDate];
      }

      saveRecordsToStorage();
      renderDashboard(); // 相殺文言等のアップデート
    });

    // 5.4 プリセット切り替えボタン
    document.getElementById("btn-toggle-preset").addEventListener("click", togglePreset);

    // 5.5 テーマ切り替えボタン
    document.getElementById("btn-theme-toggle").addEventListener("click", () => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("koukakaku_theme", state.theme);
      applyTheme(state.theme);
      renderCharts(); // テーマ変更に応じてグラフ再描画
    });

    // 5.6 新規・カスタム項目の保存
    document.getElementById("custom-item-form").addEventListener("submit", (e) => {
      e.preventDefault();

      const editId = document.getElementById("edit-item-id").value;
      const name = document.getElementById("custom-item-name").value.trim();
      const pointsInput = parseInt(document.getElementById("custom-item-points").value, 10);
      const category = document.getElementById("custom-item-category").value.trim();
      const desc = document.getElementById("custom-item-desc").value.trim();

      const type = document.querySelector('input[name="custom-item-type"]:checked').value;
      const points = type === "merit" ? Math.abs(pointsInput) : -Math.abs(pointsInput);

      const activeList = state.items[state.currentPreset][type === "merit" ? "merits" : "demerits"];

      if (editId) {
        // 更新処理
        const itemIndex = activeList.findIndex(i => i.id === editId);
        if (itemIndex > -1) {
          activeList[itemIndex].name = name;
          activeList[itemIndex].points = points;
          activeList[itemIndex].category = category;
          activeList[itemIndex].desc = desc;
        }
      } else {
        // 新規作成処理
        const newId = `c_${type === "merit" ? "m" : "d"}_${Date.now()}`;
        activeList.push({ id: newId, name, points, category, desc });
      }

      saveItemsToStorage();
      renderAll();
      resetEditorForm();
    });

    // カスタム項目編集のキャンセル
    document.getElementById("btn-cancel-custom-edit").addEventListener("click", resetEditorForm);

    // カスタムリストのフィルター
    document.getElementById("editor-filter-preset").addEventListener("change", renderEditorTab);

    // 5.7 新しい誓願の作成
    document.getElementById("setup-goal-form").addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("input-goal-title").value.trim();
      const target = parseInt(document.getElementById("input-goal-target").value, 10);
      const description = document.getElementById("input-goal-desc").value.trim();

      state.goal = {
        title,
        target,
        description,
        startDate: getTodayDateString()
      };

      saveGoalToStorage();
      renderGoalTab();
      // フォームのクリア
      document.getElementById("input-goal-title").value = "";
      document.getElementById("input-goal-target").value = "3000";
      document.getElementById("input-goal-desc").value = "";
    });

    // 誓願の取り消し
    document.getElementById("btn-cancel-goal").addEventListener("click", () => {
      if (confirm("現在の誓願（目標）を削除しますか？\n（これまでの累積スコアデータは削除されません）")) {
        state.goal = null;
        saveGoalToStorage();
        renderGoalTab();
      }
    });

    // 5.8 エクスポート
    document.getElementById("btn-export-data").addEventListener("click", () => {
      const dataStr = JSON.stringify({
        preset: state.currentPreset,
        items: state.items,
        records: state.records,
        goal: state.goal
      }, null, 2);

      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `koukakaku_backup_${getTodayDateString()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });

    // インポート
    const fileSelector = document.getElementById("import-file-selector");
    fileSelector.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          
          if (imported.records && imported.items) {
            if (confirm("バックアップデータを読み込みます。現在のデータは上書きされます。よろしいですか？")) {
              state.records = imported.records;
              state.items = imported.items;
              state.currentPreset = imported.preset || "modern";
              state.goal = imported.goal || null;

              // LocalStorageに保存
              saveRecordsToStorage();
              saveItemsToStorage();
              saveGoalToStorage();
              localStorage.setItem("koukakaku_current_preset", state.currentPreset);

              // 画面リロード
              location.reload();
            }
          } else {
            alert("無効なバックアップファイル形式です。");
          }
        } catch (err) {
          alert("データの読み込みに失敗しました。JSONファイルが壊れている可能性があります。");
          console.error(err);
        }
      };
      reader.readAsText(file);
    });

    // アプリデータの初期化
    document.getElementById("btn-reset-data").addEventListener("click", () => {
      if (confirm("警告：すべての記録データが完全に消去されます。元に戻すことはできません。本当によろしいですか？")) {
        if (confirm("本当に初期化します。よろしいですか？")) {
          localStorage.clear();
          location.reload();
        }
      }
    });
  }

  // タブ切り替えロジック
  function switchTab(targetId) {
    const panels = document.querySelectorAll(".tab-panel");
    panels.forEach(panel => {
      panel.classList.remove("active");
    });
    
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.classList.add("active");
    }

    // タブが切り替わったときの特定処理
    if (targetId === "tab-stats") {
      renderStatsTab();
    } else if (targetId === "tab-goal") {
      renderGoalTab();
    } else if (targetId === "tab-editor") {
      renderEditorTab();
      resetEditorForm();
    }
  }

  // 日付の増減移動
  function changeDay(offset) {
    const datePicker = document.getElementById("current-date-picker");
    const current = new Date(state.currentDate);
    current.setDate(current.getDate() + offset);
    
    const newDateStr = formatDate(current);
    state.currentDate = newDateStr;
    datePicker.value = newDateStr;

    renderDashboard();
    renderReflectionTab();
  }

  // テーマ適用
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const sunIcon = document.getElementById("theme-icon-sun");
    const moonIcon = document.getElementById("theme-icon-moon");

    if (theme === "dark") {
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    } else {
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    }
  }

  // ==========================================================================
  // 6. 汎用ヘルパー関数 (Helper Functions)
  // ==========================================================================

  function getTodayDateString() {
    return formatDate(new Date());
  }

  function formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function getDaysBetween(dateStr1, dateStr2) {
    const d1 = new Date(dateStr1);
    const d2 = new Date(dateStr2);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  function escapeHTML(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // アプリ起動
  init();
});
