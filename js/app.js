/**
 * 功過格アプリケーションコアロジック (10言語対応版)
 * Supports: ja, en, zh, fr, it, es, de, ru, ar (RTL), hi
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. UI翻訳データ (Translations Dictionary)
  // ==========================================================================
  
  const TRANSLATIONS = {
    app_title: { ja: "修身功過帳", en: "Koukakaku Ledger", zh: "修身功過帳", fr: "Registre Koukakaku", it: "Registro Koukakaku", es: "Registro Koukakaku", de: "Koukakaku-Register", ru: "Книга Коукакаку", ar: "سجل كوكاكوكو", hi: "कोकाकाकू बहीखाता" },
    app_subtitle: { ja: "Koukakaku Ledger", en: "Koukakaku Ledger", zh: "Koukakaku Ledger", fr: "Registre Koukakaku", it: "Registro Koukakaku", es: "Registro Koukakaku", de: "Koukakaku-Register", ru: "Книга Коукакаку", ar: "سجل كوكاكوكو", hi: "कोकाकाकू बहीखाता" },
    nav_reflection: { ja: "今日の省察", en: "Today's Reflection", zh: "今日省察", fr: "Réflexion du jour", it: "Riflessione di oggi", es: "Reflexión de hoy", de: "Heutige Reflexion", ru: "Размышление сегодня", ar: "تأمل اليوم", hi: "आज का आत्मनिरीक्षण" },
    nav_stats: { ja: "功過の軌跡", en: "Ledger History", zh: "功過軌跡", fr: "Historique", it: "Cronologia", es: "Historial", de: "Verlauf", ru: "История", ar: "سجل المسار", hi: "बहीखाता इतिहास" },
    nav_goal: { ja: "立命の誓願", en: "Vows & Goals", zh: "立命誓願", fr: "Vœux & Objectifs", it: "Voti & Obiettivi", es: "Votos & Objetivos", de: "Gelübde & Ziele", ru: "Обеты и цели", ar: "العهود والأهداف", hi: "संकल्प और लक्ष्य" },
    nav_editor: { ja: "項目の編集", en: "Customize Items", zh: "編輯項目", fr: "Personnaliser", it: "Personalizza", es: "Personalizar", de: "Anpassen", ru: "Настройка", ar: "تخصيص البنود", hi: "आइटम कस्टमाइज़" },
    nav_settings: { ja: "帳面の管理", en: "Data Settings", zh: "帳面管理", fr: "Données", it: "Dati", es: "Datos", de: "Daten", ru: "Данные", ar: "إدارة البيانات", hi: "डेटा सेटिंग्स" },
    app_footer: { ja: "修身功過帳", en: "Koukakaku Ledger", zh: "修身功過帳", fr: "Registre Koukakaku", it: "Registro Koukakaku", es: "Registro Koukakaku", de: "Koukakaku-Register", ru: "Книга Коукакаку", ar: "سجل كوكاكوكو", hi: "कोकाकाकू बहीखाता" },
    today_merits: { ja: "今日の善（功）", en: "Today's Merits", zh: "今日善（功）", fr: "Mérites du jour", it: "Meriti di oggi", es: "Méritos de hoy", de: "Heutige Verdienste", ru: "Заслуги за день", ar: "حسنات اليوم", hi: "आज के पुण्य" },
    today_demerits: { ja: "今日の悪（過）", en: "Today's 悪（過）", zh: "今日惡（過）", fr: "Démérites du jour", it: "Demeriti di oggi", es: "Deméritos de hoy", de: "Heutige Vergehen", ru: "Проступки за день", ar: "سيئات اليوم", hi: "आज के पाप" },
    today_net: { ja: "本日の相殺スコア", en: "Today's Net Score", zh: "今日相殺分數", fr: "Score net du jour", it: "Punteggio netto", es: "Puntuación neta", de: "Tages-Netto-Ergebnis", ru: "Итоговый балл", ar: "صافي نقاط اليوم", hi: "आज का शुद्ध स्कोर" },
    unit_points: { ja: "点", en: " pts", zh: "分", fr: " pts", it: " pt", es: " pts", de: " Pkt.", ru: " бал.", ar: " نقطة", hi: " अंक" },
    reflection_title: { ja: "今日の省察", en: "Today's Reflection", zh: "今日省察", fr: "Réflexion du jour", it: "Riflessione di oggi", es: "Reflexión de hoy", de: "Heutige Reflexion", ru: "Размышление сегодня", ar: "تأمل اليوم", hi: "आज का आत्मनिरीक्षण" },
    reflection_subtitle: { ja: "その日の行いを振り返り、あてはまる項目を加算または減算してください。", en: "Reflect on your actions today and adjust the counters for applicable items.", zh: "回顧今日的言行，加減相應的項目。", fr: "Réfléchissez à vos actions d'aujourd'hui et ajustez les compteurs correspondants.", it: "Rifletti sulle tue azioni di oggi e regola i relativi contatori.", es: "Reflexione sobre sus acciones de hoy y ajuste los contadores correspondientes.", de: "Reflektieren Sie Ihre heutigen Taten und passen Sie die Zähler an.", ru: "Поразмыслите о своих поступках сегодня и измените счетчики.", ar: "تأمل في أفعالك اليوم وقم بزيادة أو تقليل العدادات المناسبة.", hi: "आज के अपने कार्यों पर विचार करें और प्रासंगिक वस्तुओं के लिए संख्या बढ़ाएँ या घटाएँ।" },
    merit_column_header: { ja: "善行（功）を積む", en: "Accumulate Merits", zh: "積累善行（功）", fr: "Accumuler des mérites", it: "Accumulare meriti", es: "Acumular méritos", de: "Verdienste sammeln", ru: "Копить заслуги", ar: "جمع الحسنات", hi: "पुण्य संचित करें" },
    demerit_column_header: { ja: "悪行（過）を省みる", en: "Reflect on Demerits", zh: "省思惡行（過）", fr: "Réfléchir aux démérites", it: "Riflettere sui demeriti", es: "Reflexionar sobre deméritos", de: "Vergehen reflektieren", ru: "Размышлять о проступках", ar: "مراجعة السيئات", hi: "पापों पर आत्मनिरीक्षण" },
    diary_header: { ja: "一日の振り返り（省察録）", en: "Daily Reflection Diary", zh: "一日省察錄", fr: "Journal de réflexion quotidien", it: "Diario di riflessione quotidiano", es: "Diario de reflexión diario", de: "Tägliches Reflexionstagebuch", ru: "Дневник ежедневных размышлений", ar: "دفتر التأمل اليومي", hi: "दैनिक आत्मनिरीक्षण डायरी" },
    diary_placeholder: { ja: "今日の自分の心を静かに見つめ直し、気づきや明日への誓いを書き留めてください。", en: "Look quietly into your mind today, and write down any insights or vows for tomorrow...", zh: "今日靜心反省，寫下領悟或明天的誓言...", fr: "Regardez calmement dans votre esprit aujourd'hui et notez vos idées ou vos vœux pour demain...", it: "Guarda con calma nella tua mente oggi e annota idee o voti per domani...", es: "Mire con calma en su mente hoy y anote ideas o votos para mañana...", de: "Schauen Sie heute in sich und notieren Sie Erkenntnisse oder Gelübde für morgen...", ru: "Спокойно загляните сегодня в свои мысли и запишите обеты на завтра...", ar: "انظر بهدوء إلى عقلك اليوم، واكتب أي أفكار أو عهود للغد...", hi: "आज शांति से अपने मन में झांकें, और कल के लिए कोई भी संकल्प या विचार लिखें..." },
    stats_title: { ja: "功過の軌跡", en: "Ledger History", zh: "功過軌跡", fr: "Historique du registre", it: "Cronologia registro", es: "Historial de registro", de: "Registerverlauf", ru: "История книги", ar: "سجل المسار", hi: "बहीखाता इतिहास" },
    stats_subtitle: { ja: "継続は最大の力です。あなたの心の軌跡を可視化します。", en: "Consistency is key. Visualizing the trajectory of your mind.", zh: "持之以恆是關鍵。將心靈的軌跡可視化。", fr: "La régularité est la clé. Visualisez la trajectoire de votre esprit.", it: "La costanza è fondamentale. Visualizza la traiettoria della tua mente.", es: "La constancia es la clave. Visualice la trayectoria de su mente.", de: "Beständigkeit ist der Schlüssel. Visualisieren Sie die Entwicklung Ihres Geistes.", ru: "Постоянство — залог успеха. Визуализация траектории вашего разума.", ar: "الاستمرارية هي المفتاح. تصور مسار عقلك.", hi: "निरंतरता महत्वपूर्ण है। अपने मन के पथ की कल्पना करें।" },
    calendar_title: { ja: "年間功過マトリクス", en: "Annual Merit Matrix", zh: "年度功過矩陣", fr: "Matrice annuelle des mérites", it: "Matrice annuale dei meriti", es: "Matriz anual de méritos", de: "Jährliche Verdienstmatrix", ru: "Годовая матрица заслуг", ar: "مصفوفة الحسنات السنوية", hi: "वार्षिक पुण्य मैट्रिक्स" },
    legend_more_demerits: { ja: "悪が多い", en: "More Demerits", zh: "惡行較多", fr: "Plus de démérites", it: "Più demeriti", es: "Más deméritos", de: "Mehr Vergehen", ru: "Больше проступков", ar: "سيئات أكثر", hi: "अधिक पाप" },
    legend_more_merits: { ja: "善が多い", en: "More Merits", zh: "善行較多", fr: "Plus de mérites", it: "Più meriti", es: "Más méritos", de: "Mehr Verdienste", ru: "Больше заслуг", ar: "حسنات أكثر", hi: "अधिक पुण्य" },
    cumulative_chart_title: { ja: "累計スコア推移", en: "Cumulative Score Trend", zh: "累積分數趨勢", fr: "Évolution du score cumulé", it: "Andamento punteggio cumulativo", es: "Tendencia del score acumulativo", de: "Trend des kumulierten Wertes", ru: "Тренды общего балла", ar: "اتجاه النقاط التراكمية", hi: "संचयी स्कोर प्रवृत्ति" },
    category_chart_title: { ja: "主な活動傾向", en: "Primary Activity Trends", zh: "主要活動傾向", fr: "Tendances des activités principales", it: "Tendenze delle attività principali", es: "Tendencias de actividades principales", de: "Hauptaktivitätstrends", ru: "Основные направления деятельности", ar: "اتجاهات الأنشطة الرئيسية", hi: "मुख्य गतिविधि प्रवृत्तियाँ" },
    goal_title: { ja: "立命の誓願（目標管理）", en: "Vow of Destiny (Goal Management)", zh: "立命誓願（目標管理）", fr: "Vœu du destin (Gestion des objectifs)", it: "Voto del destino (Gestione obiettivi)", es: "Voto del destino (Gestión de objetivos)", de: "Schicksalsgelübde (Zielverwaltung)", ru: "Обет судьбы (Управление целями)", ar: "عهد القدر (إدارة الأهداف)", hi: "संकल्प का भाग्य (लक्ष्य प्रबंधन)" },
    goal_subtitle: { ja: "自らの望みをかなえるため、目標となる善（功）の累計数を誓います。", en: "To fulfill your aspirations, vow a target cumulative score of merits.", zh: "為實現心中所願，立誓累積目標善行（功）分數。", fr: "Pour réaliser vos aspirations, engagez-vous sur un score cible de mérites.", it: "Per realizzare le tue aspirazioni, fai voto di raggiungere un punteggio obiettivo.", es: "Para cumplir sus aspiraciones, prometa una puntuación objetivo de méritos.", de: "Um Ihre Hoffnungen zu erfüllen, geloben Sie einen Zielwert an Verdiensten.", ru: "Чтобы исполнить свои стремления, дайте обет достичь целевого показателя.", ar: "لتحقيق تطلعاتك、تعهد بتحقيق نقاط مستهدفة تراكمية من الحسنات.", hi: "अपनी आकांक्षाओं को पूरा करने के लिए, पुण्यों के संचयी लक्ष्य स्कोर का संकल्प लें।" },
    btn_cancel_goal: { ja: "誓願を取り消す", en: "Cancel Vow", zh: "取消誓願", fr: "Annuler le vœu", it: "Annulla il voto", es: "Cancelar voto", de: "Gelübde stornieren", ru: "Отменить обет", ar: "إلغاء العهد", hi: "संकल्प रद्द करें" },
    goal_progress_label: { ja: "目標達成度", en: "Goal Progress", zh: "目標達成度", fr: "Progression de l'objectif", it: "Progresso obiettivo", es: "Progreso del objetivo", de: "Zielfortschritt", ru: "Прогресс цели", ar: "التقدم نحو الهدف", hi: "लक्ष्य की प्रगति" },
    goal_start_date: { ja: "誓願立命日", en: "Vow Start Date", zh: "誓願立命日", fr: "Date de début du vœu", it: "Data di inizio voto", es: "Fecha de inicio del voto", de: "Gelübde-Startdatum", ru: "Дата начала обета", ar: "تاريخ بدء العهد", hi: "संकल्प शुरू होने की तिथि" },
    goal_current_score: { ja: "現在の累計功過値", en: "Current Cumulative Score", zh: "當前累積功過值", fr: "Score cumulé actuel", it: "Punteggio cumulativo attuale", es: "Score acumulativo actual", de: "Aktueller kumulierter Wert", ru: "Текущий общий балл", ar: "النقاط التراكمية الحالية", hi: "वर्तमान संचयी स्कोर" },
    goal_daily_avg: { ja: "一日平均スコア", en: "Daily Average Score", zh: "日均分數", fr: "Score moyen quotidien", it: "Punteggio medio giornaliero", es: "Score promedio diario", de: "Täglicher Durchschnitt", ru: "Средний балл в день", ar: "متوسط النقاط اليومي", hi: "दैनिक औसत स्कोर" },
    goal_estimated_date: { ja: "達成予測日", en: "Estimated Completion Date", zh: "預計達成日期", fr: "Date de réussite estimée", it: "Data di completamento stimata", es: "Fecha de finalización estimada", de: "Voraussichtliches Enddatum", ru: "Ожидаемая дата достижения", ar: "التاريخ المقدر للإنجاز", hi: "अनुमानित पूर्णता तिथि" },
    setup_goal_title: { ja: "新たな誓願（立命）を立てる", en: "Make a New Vow (Establish Destiny)", zh: "確立新誓願（立命）", fr: "Faire un nouveau vœu (Établir le destin)", it: "Fai un nuovo voto (Stabilisci il destino)", es: "Hacer un nuevo voto (Establecer el destino)", de: "Ein neues Gelübde ablegen (Schicksal begründen)", ru: "Дать новый обет (Определить судьбу)", ar: "تقديم عهد جديد (تحديد المصير)", hi: "एक नया संकल्प लें (भाग्य स्थापित करें)" },
    input_goal_title_label: { ja: "誓願の題目（目標名）", en: "Vow Title (Goal Name)", zh: "誓願題目（目標名稱）", fr: "Titre du vœu (Nom de l'objectif)", it: "Titolo del voto (Nome obiettivo)", es: "Título del voto (Nombre del objetivo)", de: "Gelübdetitel (Zielname)", ru: "Название обета (Имя цели)", ar: "عنوان العهد (اسم الهدف)", hi: "संकल्प का शीर्षक (लक्ष्य का नाम)" },
    input_goal_title_placeholder: { ja: "例: 難関試験の合格、家族の健康と長寿、自己変革など", en: "e.g., Passing an exam, family health, self-transformation...", zh: "例：通過考試、家人健康與長寿、自我改造等", fr: "ex: Réussir un examen, santé familiale, transformation de soi...", it: "es: Superare un esame, salute della famiglia, trasformazione di sé...", es: "ej. Aprobar un examen, salud familiar, autotransformación...", de: "z.B. Prüfung bestehen, Familiengesundheit, Selbsttransformation...", ru: "напр., сдача экзамена, здоровье семьи, самосовершенствование...", ar: "مثال: اجتياز الامتحان، صحة الأسرة، تغيير الذات...", hi: "जैसे: परीक्षा उत्तीर्ण करना, पारिवारिक स्वास्थ्य, आत्म-परिवर्तन..." },
    input_goal_target_label: { ja: "目標となる累積「善行」スコア", en: "Target Cumulative Merit Score", zh: "目標累積「善行」分數", fr: "Score cible cumulé des mérites", it: "Punteggio di merito cumulativo target", es: "Puntuación de mérito acumulada objetivo", de: "Zielwert kumulierter Verdienste", ru: "Целевой общий балл заслуг", ar: "نقاط الحسنات التراكمية المستهدفة", hi: "संचयी पुण्य का लक्ष्य स्कोर" },
    input_goal_desc_label: { ja: "誓願の誓い（理由や決意の記述）", en: "Declaration of Vow (Reason & Determination)", zh: "誓願誓言（理由或決心描述）", fr: "Déclaration de vœu (Raison & Détermination)", it: "Dichiarazione di voto (Motivo & Determinazione)", es: "Declaración de voto (Motivo y Determinación)", de: "Gelübdeerklärung (Grund & Entschlossenheit)", ru: "Декларация обета (Причина и решимость)", ar: "إعلان العهد (السبب والعزيمة)", hi: "संकल्प की घोषणा (कारण और दृढ़ संकल्प)" },
    input_goal_desc_placeholder: { ja: "この目標を達成することによって、どのような自分になりたいか、どのような未来を望むかを書き留めてください。", en: "Write down what kind of person you want to become or what future you aspire to by achieving this goal...", zh: "寫下通過實現此目標，你想成為怎樣的人，或是期盼怎樣的未來...", fr: "Notez quel genre de personne vous voulez devenir ou quel avenir vous espérez en atteignant cet objectif...", it: "Scrivi che tipo di persona vuoi diventare o quale futuro speri di raggiungere con questo obiettivo...", es: "Escriba qué tipo de persona quiere llegar a ser o qué futuro espera alcanzar con este objetivo...", de: "Schreiben Sie auf, was für ein Mensch Sie werden wollen oder welche Zukunft Sie anstreben...", ru: "Запишите, каким человеком вы хотите стать или какого будущего желаете достичь с этой целью...", ar: "اكتب نوع الشخص الذي تريد أن تصبح عليه أو المستقبل الذي تطمح إليه من خلال تحقيق هذا الهدف...", hi: "लिखें कि इस लक्ष्य को प्राप्त करके आप किस तरह के इंसान बनना चाहते हैं या किस भविष्य की आकांक्षा रखते हैं..." },
    btn_submit_goal: { ja: "誓願を立てる（保存）", en: "Make Vow (Save)", zh: "確立誓願（保存）", fr: "Faire le vœu (Sauvegarder)", it: "Fai il voto (Salva)", es: "Hacer voto (Guardar)", de: "Gelübde ablegen (Speichern)", ru: "Принять обет (Сохранить)", ar: "تقديم العهد (حفظ)", hi: "संकल्प लें (सहेजें)" },
    editor_title: { ja: "項目の編集（カスタマイズ）", en: "Customize Items", zh: "編輯項目（自訂）", fr: "Personnaliser (Éditeur)", it: "Personalizza (Editore)", es: "Personalizar (Editor)", de: "Anpassen (Editor)", ru: "Настройка (Редактор)", ar: "تخصيص البنود (تعديل)", hi: "आइटम संपादित करें (कस्टमाइज़)" },
    editor_subtitle: { ja: "プリセット項目を編集したり、独自の善行・悪行を追加して自分だけの功過格表を作成できます。", en: "Edit preset items or add custom merits/demerits to create your personal ledger.", zh: "編輯預設項目，或新增自訂善行/惡行以建立專屬功過格表。", fr: "Modifiez les éléments prédéfinis ou ajoutez vos propres mérites/démérites.", it: "Modifica le voci predefinite o aggiungi i tuoi meriti/demeriti.", es: "Edite elementos predefinidos o añada sus propios méritos/deméritos.", de: "Bearbeiten Sie Voreinstellungen oder fügen Sie eigene Verdienste/Vergehen hinzu.", ru: "Редактируйте предустановки или добавляйте свои заслуги/проступки.", ar: "قم بتعديل البنود المحددة مسبقاً أو أضف حسنات/سيئات خاصة بك.", hi: "अपनी व्यक्तिगत बहीखाता बनाने के लिए पूर्व-निर्धारित आइटम संपादित करें या कस्टम पुण्य/पाप जोड़ें।" },
    editor_form_add_title: { ja: "新規項目の追加", en: "Add New Item", zh: "新增項目", fr: "Ajouter un élément", it: "Aggiungi voce", es: "Añadir elemento", de: "Neues Element hinzufügen", ru: "Добавить новый элемент", ar: "إضافة بند جديد", hi: "नया आइटम जोड़ें" },
    item_type_label: { ja: "区分", en: "Type", zh: "類別", fr: "Type", it: "Tipo", es: "Tipo", de: "Typ", ru: "Тип", ar: "النوع", hi: "प्रकार" },
    item_type_merit: { ja: "善行（功）", en: "Merit (+)", zh: "善行（功）", fr: "Mérite (+)", it: "Merito (+)", es: "Mérito (+)", de: "Verdienst (+)", ru: "Заслуга (+)", ar: "حسنات (+)", hi: "पुण्य (+)" },
    item_type_demerit: { ja: "悪行（過）", en: "悪行（過）", zh: "惡行（過）", fr: "Démérite (-)", it: "Demerito (-)", es: "Demérito (-)", de: "Vergehen (-)", ru: "Проступок (-)", ar: "سيئات (-)", hi: "पाप (-)" },
    item_name_label: { ja: "項目名", en: "Item Name", zh: "項目名稱", fr: "Nom de l'élément", it: "Nome voce", es: "Nombre del elemento", de: "Name", ru: "Название", ar: "اسم البند", hi: "आइटम का नाम" },
    item_name_placeholder: { ja: "例: 早起きをした、愚痴を言った", en: "e.g., Woke up early, complained...", zh: "例：早起、抱怨了", fr: "ex: Levé tôt, plaint...", it: "es: Alzato presto, lamentato...", es: "ej. Levantarse temprano, quejarse...", de: "z.B. Früh aufgestanden, beklagt...", ru: "напр., рано встал, пожаловался...", ar: "مثال: الاستيقاظ مبكراً، التذمر...", hi: "जैसे: सुबह जल्दी उठा, शिकायत की..." },
    item_points_label: { ja: "点数", en: "Points", zh: "分數", fr: "Points", it: "Punti", es: "Puntos", de: "Punkte", ru: "Баллы", ar: "النقاط", hi: "अंक" },
    item_points_help: { ja: "※値は自動で善行ならプラス、悪行ならマイナスに処理されます。正の数を入力してください。", en: "Note: Values are auto-processed (positive for merits, negative for demerits). Enter a positive number.", zh: "※分數會根據善惡自動處理為正值或負值。請輸入正整數。", fr: "Note: Les valeurs sont gérées automatiquement (+ pour mérites, - pour démérites). Entrez un chiffre positif.", it: "Nota: I valori sono gestiti in automatico (+ per meriti, - per demeriti). Inserisci un numero positivo.", es: "Nota: Los valores se gestionan automáticamente (+ para méritos, - para deméritos). Introduzca un número positivo.", de: "Hinweis: Werte werden automatisch verarbeitet (+ für Verdienste, - für Vergehen). Geben Sie eine positive Zahl ein.", ru: "Примечание: Значения обрабатываются автоматически (+ для заслуг, - для проступков). Введите положительное число.", ar: "ملاحظة: يتم معالجة القيم تلقائيًا (إيجابية للحسنات، وسلبية للسيئات). أدخل رقمًا موجبًا.", hi: "नोट: मान स्वचालित रूप से संसाधित होते हैं (पुण्य के लिए सकारात्मक, पाप के लिए नकारात्मक)। एक सकारात्मक संख्या दर्ज करें।" },
    item_category_label: { ja: "カテゴリ", en: "Category", zh: "分類", fr: "Catégorie", it: "Categoria", es: "Categoría", de: "Kategorie", ru: "Категория", ar: "الفئة", hi: "श्रेणी" },
    item_category_placeholder: { ja: "例: 健康・生活、人間関係、学習", en: "e.g., Health, Relations, Learning...", zh: "例：健康生活、人際關係、學習", fr: "ex: Santé, Relations, Apprentissage...", it: "es: Salute, Relazioni, Apprendimento...", es: "ej. Salud, Relaciones, Aprendizaje...", de: "z.B. Gesundheit, Beziehungen, Lernen...", ru: "напр., здоровье, отношения, учеба...", ar: "مثال: الصحة، العلاقات، التعلم...", hi: "जैसे: स्वास्थ्य, संबंध, सीखना..." },
    item_desc_label: { ja: "説明（詳細）", en: "Description (Details)", zh: "說明（詳細）", fr: "Description (Détails)", it: "Descrizione (Dettagli)", es: "Descripción (Detalles)", de: "Beschreibung (Details)", ru: "Описание (Детали)", ar: "الوصف (التفاصيل)", hi: "विवरण (विवरण)" },
    item_desc_placeholder: { ja: "具体的な判断基準などがあれば記入してください。", en: "Describe specific criteria or details if any...", zh: "可填寫具體的判斷基準等詳細內容。", fr: "Décrivez les critères spécifiques si besoin...", it: "Descrivi criteri specifici se necessario...", es: "Describa los criterios específicos si es necesario...", de: "Beschreiben Sie gegebenenfalls bestimmte Kriterien...", ru: "Опишите конкретные критерии, если они есть...", ar: "وصف معايير محددة إذا وجدت...", hi: "यदि कोई हो तो विशिष्ट मानदंड का वर्णन करें..." },
    btn_save_item: { ja: "保存する", en: "Save Item", zh: "保存項目", fr: "Enregistrer", it: "Salva voce", es: "Guardar", de: "Speichern", ru: "Сохранить", ar: "حفظ البند", hi: "सहेजें" },
    btn_cancel_edit: { ja: "キャンセル", en: "Cancel", zh: "取消", fr: "Annuler", it: "Annulla", es: "Cancelar", de: "Abbrechen", ru: "Отмена", ar: "إلغاء", hi: "रद्द करें" },
    registered_items_title: { ja: "登録項目一覧", en: "Registered Items List", zh: "已註冊項目列表", fr: "Liste des éléments enregistrés", it: "Elenco voci registrate", es: "Lista de elementos registrados", de: "Liste registrierter Elemente", ru: "Список зарегистрированных элементов", ar: "قائمة البنود المسجلة", hi: "पंजीकृत आइटमों की सूची" },
    filter_all: { ja: "すべての項目", en: "All Items", zh: "所有項目", fr: "Tous les éléments", it: "Tutte le voci", es: "Todos los elementos", de: "Alle Elemente", ru: "Все элементы", ar: "جميع البنود", hi: "सभी आइटम" },
    filter_merits: { ja: "善行（功）のみ", en: "Merits Only", zh: "僅善行（功）", fr: "Mérites uniquement", it: "Solo meriti", es: "Solo méritos", de: "Nur Verdienste", ru: "Только заслуги", ar: "الحسنات فقط", hi: "केवल पुण्य" },
    filter_demerits: { ja: "悪行（過）のみ", en: "Demerits Only", zh: "僅惡行（過）", fr: "Démérites uniquement", it: "Solo demeriti", es: "Solo deméritos", de: "Nur Vergehen", ru: "Только проступки", ar: "السيئات فقط", hi: "केवल पाप" },
    settings_title: { ja: "帳面の管理（データ設定）", en: "Data Management", zh: "帳面管理（數據設定）", fr: "Données & Sauvegarde", it: "Gestione Dati", es: "Gestión de Datos", de: "Datenverwaltung", ru: "Управление данными", ar: "إدارة البيانات", hi: "डेटा प्रबंधन" },
    settings_subtitle: { ja: "データのバックアップ、復元、および初期化が可能です。", en: "Backup, restore, or reset your ledger data.", zh: "可進行數據備份、恢復及初始化。", fr: "Sauvegardez, restaurez ou réinitialisez vos données.", it: "Esegui il backup, ripristina o resetta i dati del registro.", es: "Haga una copia de seguridad, restaure o restablezca sus datos.", de: "Sichern, wiederherstellen oder setzen Sie Ihre Registerdaten zurück.", ru: "Резервное копирование, восстановление или сброс данных.", ar: "النسخ الاحتياطي، الاستعادة، أو إعادة تعيين البيانات.", hi: "अपनी बहीखाता डेटा सहेजें, पुनर्स्थापित करें, या रीसेट करें।" },
    backup_card_title: { ja: "データのバックアップ・復元", en: "Data Backup & Restore", zh: "數據備份與恢復", fr: "Sauvegarde & Restauration", it: "Backup & Ripristino", es: "Copia de seguridad y Restauración", de: "Datensicherung & Wiederherstellung", ru: "Бэкап и восстановление данных", ar: "نسخ البيانات واستعادتها", hi: "डेटा बैकअप और पुनर्स्थापना" },
    backup_card_desc: { ja: "このアプリはお使いのブラウザ（LocalStorage）にデータを保存します。別の端末への移行や、データの紛失を防ぐため、定期的にバックアップファイルを出力してください。", en: "This app stores data locally in your browser (LocalStorage). Export backups periodically to prevent data loss or move to other devices.", zh: "此應用程式將數據儲存於您的瀏覽器中（LocalStorage）。請定期導出備份文件，以防數據丟失或便於轉移至其他設備。", fr: "Cette application enregistre les données localement dans votre navigateur (LocalStorage). Exportez périodiquement pour éviter la perte de données.", it: "Questa app salva i dati localmente nel browser (LocalStorage). Esporta periodicamente per evitare perdite di dati.", es: "Esta aplicación guarda los datos localmente en su navegador (LocalStorage). Exporte copias periódicamente para evitar pérdidas.", de: "Diese App speichert Daten lokal in Ihrem Browser (LocalStorage). Sichern Sie diese regelmäßig, um Datenverlust zu vermeiden.", ru: "Это приложение сохраняет данные локально в браузере (LocalStorage). Периодически делайте бэкап во избежание потери данных.", ar: "يحفظ هذا التطبيق البيانات محلياً في متصفحك (LocalStorage). قم بتصدير النسخ الاحتياطية دورياً لتجنب فقدان البيانات.", hi: "यह ऐप आपके ब्राउज़र (LocalStorage) में स्थानीय रूप से डेटा सहेजता है। डेटा हानि को रोकने या अन्य उपकरणों में स्थानांतरित करने के लिए समय-समय पर बैकअप निर्यात करें।" },
    btn_export_data: { ja: "帳面データを保存する（エクスポート）", en: "Export Ledger Data", zh: "保存帳面數據（導出）", fr: "Exporter les données du registre", it: "Esporta dati del registro", es: "Exportar datos del registro", de: "Registerdaten exportieren", ru: "Экспортировать данные книги", ar: "تصدير بيانات السجل", hi: "बहीखाता डेटा निर्यात करें" },
    btn_import_data: { ja: "帳面データを読み込む（インポート）", en: "Import Ledger Data", zh: "讀取帳面數據（導入）", fr: "Importer les données du registre", it: "Importa dati del registro", es: "Importar datos del registro", de: "Registerdaten importieren", ru: "Импортировать данные книги", ar: "استيراد بيانات السجل", hi: "बहीखाata डेटा आयात करें" },
    danger_card_title: { ja: "危険な操作", en: "Danger Zone", zh: "危險操作", fr: "Zone de danger", it: "Zona di pericolo", es: "Zona de peligro", de: "Gefahrenbereich", ru: "Опасная зона", ar: "منطقة الخطر", hi: "खतरे का क्षेत्र" },
    danger_card_desc: { ja: "これまでに記録したすべての功過データ、目標、およびカスタム項目が完全に削除されます。この操作は取り消せません。", en: "All recorded ledger entries, goals, and custom items will be permanently deleted. This cannot be undone.", zh: "先前記錄的所有功過數據、目標及自訂項目將被永久刪除。此操作無法撤銷。", fr: "Toutes les entrées du registre, les objectifs et les éléments personnalisés seront supprimés définitivement.", it: "Tutte le voci del registro, gli obiettivi e gli elementi personalizzati saranno eliminati definitivamente.", es: "Se eliminarán permanentemente todas las entradas del registro, objetivos y elementos personalizados.", de: "Alle aufgezeichneten Registereinträge, Ziele und benutzerdefinierten Elemente werden dauerhaft gelöscht.", ru: "Все записи книги, цели и пользовательские элементы будут безвозвратно удалены.", ar: "سيتم حذف جميع إدخالات السجل والأهداف والبنود المخصصة نهائياً. لا يمكن التراجع عن هذا الإجراء.", hi: "सभी दर्ज बहीखाता प्रविष्टियाँ, लक्ष्य और कस्टम आइटम स्थायी रूप से हटा दिए जाएंगे। इसे पूर्ववत नहीं किया जा सकता।" },
    btn_reset_data: { ja: "すべての記録を初期化する", en: "Reset All Ledger Data", zh: "初始化所有記錄", fr: "Réinitialiser toutes les données", it: "Ripristina tutti i dati", es: "Restablecer todos los datos", de: "Alle Registerdaten zurücksetzen", ru: "Сбросить все данные книги", ar: "إعادة تعيين كافة بيانات السجل", hi: "सभी बहीखाता डेटा रीसेट करें" },
    
    // ダイアログ・確認テキスト
    confirm_reset: {
      ja: "警告：すべての記録データが完全に消去されます。元に戻すことはできません。本当によろしいですか？",
      en: "Warning: All recorded data will be permanently erased. This cannot be undone. Are you sure?",
      zh: "警告：所有記錄數據將被完全清除。此操作無法復原。確定要繼續嗎？",
      fr: "Attention : Toutes les données seront effacées définitivement. Cette action est irréversible. Êtes-vous sûr ?",
      it: "Attenzione: Tutti i dati saranno cancellati definitivamente. Questa azione è irreversibile. Sei sicuro?",
      es: "Advertencia: Todos los datos serán borrados permanentemente. Esta acción no se puede deshacer. ¿Está seguro?",
      de: "Warnung: Alle aufgezeichneten Daten werden dauerhaft gelöscht. Dies kann nicht rückgängig gemacht werden. Sind Sie sicher?",
      ru: "Предупреждение: Все данные будут безвозвратно удалены. Это действие нельзя отменить. Вы уверены?",
      ar: "تحذير: سيتم مسح جميع البيانات المسجلة نهائياً. لا يمكن التراجع عن هذا الإجراء. هل أنت متأكد؟",
      hi: "चेतावनी: सभी सहेजे गए डेटा स्थायी रूप से मिटा दिए जाएंगे। इसे पूर्ववत नहीं किया जा सकता। क्या आप सुनिश्चित हैं?"
    },
    confirm_import: {
      ja: "バックアップデータを読み込みます。現在のデータは上書きされます。よろしいですか？",
      en: "Importing backup data will overwrite your current ledger. Do you want to proceed?",
      zh: "即將讀取備份數據，這將覆蓋當前數據。是否確定？",
      fr: "L'importation des données va écraser votre registre actuel. Voulez-vous continuer ?",
      it: "L'importazione dei dati sovrascriverà il registro corrente. Vuoi procedere?",
      es: "La importación de datos sobrescribirá su registro actual. ¿Desea continuar?",
      de: "Das Importieren von Backups überschreibt Ihre aktuellen Daten. Möchten Sie fortfahren?",
      ru: "Импорт данных перезапишет текущую книгу. Хотите продолжить?",
      ar: "سيؤدي استيراد النسخة الاحتياطية إلى الكتابة فوق السجل الحالي. هل تريد الاستمرار؟",
      hi: "बैकअप डेटा आयात करने से आपकी वर्तमान बहीखाता ओवरराइट हो जाएगी। क्या आप आगे बढ़ना चाहते हैं?"
    },
    confirm_delete_item: {
      ja: "この項目を削除しますか？\n（これまでの記録データに含まれるこの項目の点数は集計されなくなります）",
      en: "Delete this item? (Counts for this item in past records will no longer be compiled.)",
      zh: "確定要刪除此項目嗎？\n（過去記錄中該項目的分數將不再累計）",
      fr: "Supprimer cet élément ? (Les comptes de cet élément dans les anciens enregistrements ne seront plus comptabilisés.)",
      it: "Eliminare questa voce? (I conteggi nei record passati non verranno più conteggiati.)",
      es: "¿Eliminar este elemento? (Los conteos de este elemento en registros pasados ya no se compilarán.)",
      de: "Dieses Element löschen? (Zählungen in vergangenen Einträgen werden nicht mehr berücksichtigt.)",
      ru: "Удалить этот элемент? (Подсчеты для него в прошлых записях больше не будут учитываться.)",
      ar: "حذف هذا البند؟ (لن يتم احتساب النقاط لهذا البند في السجلات السابقة بعد الآن.)",
      hi: "क्या आप इस आइटम को हटाना चाहते हैं? (पिछले रिकॉर्ड में इस आइटम के अंकों को अब नहीं जोड़ा जाएगा।)"
    },
    confirm_cancel_goal: {
      ja: "現在の誓願（目標）を削除しますか？\n（これまでの累積スコアデータは削除されません）",
      en: "Cancel current vow? (Your past cumulative scores will not be deleted.)",
      zh: "確定要取消當前誓願嗎？\n（之前的累積分數數據將保留）",
      fr: "Annuler le vœu actuel ? (Vos anciens scores cumulés ne seront pas supprimés.)",
      it: "Annullare il voto corrente? (I punteggi cumulativi passati non verranno eliminati.)",
      es: "¿Cancelar el voto actual? (Sus puntuaciones acumuladas pasadas no se eliminarán.)",
      de: "Aktuelles Gelübde stornieren? (Ihre bisherigen kumulierten Werte werden nicht gelöscht.)",
      ru: "Отменить текущий обет? (Ваши прошлые общие баллы не будут удалены.)",
      ar: "إلغاء العهد الحالي؟ (لن يتم حذف نقاطك التراكمية السابقة.)",
      hi: "वर्तमान संकल्प को रद्द करें? (आपके पिछले संचयी स्कोर नहीं हटाए जाएंगे।)"
    },
    trend_merits: { ja: "善行回数: {count}回", en: "Merits: {count} times", zh: "善行次數: {count}次", fr: "Mérites : {count} fois", it: "Meriti: {count} volte", es: "Méritos: {count} veces", de: "Verdienste: {count}-mal", ru: "Заслуги: {count} раз(а)", ar: "الحسنات: {count} مرة", hi: "पुण्य: {count} बार" },
    trend_demerits: { ja: "悪行回数: {count}回", en: "Demerits: {count} times", zh: "惡行次數: {count}次", fr: "Démérites : {count} fois", it: "Demeriti: {count} volte", es: "Deméritos: {count} veces", de: "Vergehen: {count}-mal", ru: "Проступки: {count} раз(а)", ar: "السيئات: {count} مرة", hi: "पाप: {count} बार" },
    trend_net_pos: {
      ja: "素晴らしい一日でした！この調子で善を積みましょう。",
      en: "A wonderful day! Keep accumulating good deeds.",
      zh: "美好的一天！請繼續積累善行。",
      fr: "Une merveilleuse journée ! Continuez à accumuler des mérites.",
      it: "Una giornata meravigliosa! Continua ad accumulare meriti.",
      es: "¡Un día maravilloso! Siga acumulando méritos.",
      de: "Ein wunderbarer Tag! Sammeln Sie weiter gute Taten.",
      ru: "Прекрасный день! Продолжайте копить добрые дела.",
      ar: "يوم رائع! استمر في جمع الحسنات.",
      hi: "एक शानदार दिन! पुण्य संचित करते रहें।"
    },
    trend_net_neg: {
      ja: "深く省察し、明日はより良き行いを心がけましょう。",
      en: "Reflect deeply and strive for better actions tomorrow.",
      zh: "深切省思，明日當更勉力行善。",
      fr: "Réfléchissez profondément et efforcez-vous de faire mieux demain.",
      it: "Rifletti profondamente e sforzati di fare meglio domani.",
      es: "Reflexione profundamente y esfuércese por actuar mejor mañana.",
      de: "Reflektieren Sie tief und streben Sie morgen nach besseren Taten.",
      ru: "Глубоко поразмыслите и постарайтесь поступать лучше завтра.",
      ar: "تأمل بعمق واسعَ لأفعال أفضل غداً.",
      hi: "गहराई से आत्मनिरीक्षण करें और कल बेहतर कार्यों के लिए प्रयास करें।"
    },
    trend_net_zero: {
      ja: "自己の省察に努め、一日一善を意識しましょう。",
      en: "Practice self-reflection and aim for one good deed a day.",
      zh: "努力自省，注重一日一善。",
      fr: "Pratiquez l'introspection et visez une bonne action par jour.",
      it: "Pratica l'auto-riflessione e punta a una buona azione al giorno.",
      es: "Practique la autorreflexión y aspire a una buena acción al día.",
      de: "Üben Sie Selbstreflexion und streben Sie täglich eine gute Tat an.",
      ru: "Практикуйте самопознание и стремитесь делать одно доброе дело в день.",
      ar: "ممارسة التأمل الذاتي والسعي لحسنة واحدة يومياً.",
      hi: "आत्मनिरीक्षण का अभ्यास करें और दिन में एक पुण्य कार्य का लक्ष्य रखें।"
    },
    goal_est_success: { ja: "祝・誓願達成！", en: "Congratulations! Vow Accomplished!", zh: "祝賀・誓願達成！", fr: "Félicitations ! Vœu accompli !", it: "Congratulazioni! Voto compiuto!", es: "¡Felicidades! Voto cumplido.", de: "Glückwunsch! Gelübde erfüllt!", ru: "Поздравляем! Обет исполнен!", ar: "تهانينا! تم إنجاز العهد!", hi: "बधाई हो! संकल्प पूरा हुआ!" },
    goal_est_impossible: { ja: "測定不能（善行を重ねましょう）", en: "Unmeasurable (Focus on doing good)", zh: "無法測算（請多積善行）", fr: "Non mesurable (Concentrez-vous sur les mérites)", it: "Non misurabile (Concentrati sui meriti)", es: "Incalculable (Concéntrese en hacer el bien)", de: "Unmessbar (Gute Taten machen)", ru: "Невозможно рассчитать (сделайте больше добрых дел)", ar: "غير قابل القياس (ركز على فعل الخير)", hi: "अमापनीय (पुण्य कार्य करने पर ध्यान दें)" },
    btn_update_item: { ja: "更新する", en: "Update Item", zh: "更新項目", fr: "Mettre à jour", it: "Aggiorna voce", es: "Actualizar", de: "Aktualisieren", ru: "Обновить", ar: "تحديث البند", hi: "अद्यतन करें" }
  };

  // ==========================================================================
  // 2. アプリケーションの状態 (State)
  // ==========================================================================
  
  let state = {
    currentDate: getTodayDateString(),
    currentPreset: "modern", // 'modern' or 'traditional'
    theme: "light",          // 'light' (和紙) or 'dark' (禅)
    language: "ja",         // ja, en, zh, fr, it, es, de, ru, ar, hi
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
  // 3. 初期化とデータ読み込み (Initialization & LocalStorage)
  // ==========================================================================

  function init() {
    // 3.1 言語設定の読み込み
    const savedLang = localStorage.getItem("koukakaku_lang");
    if (savedLang) {
      state.language = savedLang;
    } else {
      // ブラウザの言語に合わせて初期化を試みる
      const sysLang = navigator.language.substring(0, 2);
      if (["ja", "en", "zh", "fr", "it", "es", "de", "ru", "ar", "hi"].includes(sysLang)) {
        state.language = sysLang;
      } else {
        state.language = "ja"; // デフォルト日本語
      }
    }
    document.getElementById("lang-selector").value = state.language;

    // 3.2 テーマの読み込み
    const savedTheme = localStorage.getItem("koukakaku_theme");
    if (savedTheme) {
      state.theme = savedTheme;
    } else {
      state.theme = "light"; // デフォルトは和紙ライト
    }
    applyTheme(state.theme);

    // 3.3 プリセット項目の読み込み・初期化
    const savedItems = localStorage.getItem("koukakaku_items");
    if (savedItems) {
      try {
        state.items = JSON.parse(savedItems);
        
        // マイグレーション: 旧仕様の単一言語（文字列）の項目データが含まれている場合、10言語プリセットで上書きマージする
        let needsMigration = false;
        for (const presetKey of ['modern', 'traditional']) {
          for (const typeKey of ['merits', 'demerits']) {
            const list = state.items[presetKey]?.[typeKey];
            if (list && list.some(item => typeof item.name === 'string')) {
              needsMigration = true;
              break;
            }
          }
        }
        if (needsMigration) {
          console.log("古い形式の項目データを検知しました。10言語対応のプリセットデータに移行します。");
          loadDefaultPresets();
        }
      } catch (e) {
        console.error("項目データのパースに失敗しました。デフォルトをロードします。", e);
        loadDefaultPresets();
      }
    } else {
      loadDefaultPresets();
    }

    // 3.4 選択中プリセットの読み込み
    const savedPreset = localStorage.getItem("koukakaku_current_preset");
    if (savedPreset && (savedPreset === "modern" || savedPreset === "traditional")) {
      state.currentPreset = savedPreset;
    }

    // 3.5 記録データの読み込み
    const savedRecords = localStorage.getItem("koukakaku_records");
    if (savedRecords) {
      try {
        state.records = JSON.parse(savedRecords);
      } catch (e) {
        console.error("記録データのパースに失敗しました。", e);
        state.records = {};
      }
    }

    // 3.6 目標（誓願）データの読み込み
    const savedGoal = localStorage.getItem("koukakaku_goal");
    if (savedGoal) {
      try {
        state.goal = JSON.parse(savedGoal);
      } catch (e) {
        console.error("目標データのパースに失敗しました。", e);
        state.goal = null;
      }
    }

    // 3.7 UI要素への反映
    document.getElementById("current-date-picker").value = state.currentDate;
    
    // UIテキスト・方向の反映
    setLanguage(state.language);

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
  // 4. UIの更新・描画 (Rendering)
  // ==========================================================================

  function renderAll() {
    updatePresetSwitcherUI();
    renderDashboard();
    renderReflectionTab();
    renderStatsTab();
    renderGoalTab();
    renderEditorTab();
  }

  // 4.1 ダッシュボード（今日の功・過・相殺スコア）の描画
  function renderDashboard() {
    updateDateDisplay();
    const dayScores = calculateDayScore(state.currentDate);
    const l = state.language;

    // 善（功）点数
    const dispMerit = document.getElementById("disp-today-merit");
    dispMerit.innerHTML = `${dayScores.merit}<span class="unit">${getTranslation("unit_points")}</span>`;
    document.getElementById("trend-today-merit").textContent = getTranslation("trend_merits").replace("{count}", dayScores.meritCount);

    // 悪（過）点数
    const dispDemerit = document.getElementById("disp-today-demerit");
    dispDemerit.innerHTML = `${dayScores.demerit}<span class="unit">${getTranslation("unit_points")}</span>`; 
    document.getElementById("trend-today-demerit").textContent = getTranslation("trend_demerits").replace("{count}", dayScores.demeritCount);

    // 相殺スコア
    const dispNet = document.getElementById("disp-today-net");
    const trendNet = document.getElementById("trend-today-net");
    const net = dayScores.net;

    if (net > 0) {
      dispNet.innerHTML = `+${net}<span class="unit">${getTranslation("unit_points")}</span>`;
      dispNet.style.color = "var(--color-merit)";
      trendNet.textContent = getTranslation("trend_net_pos");
    } else if (net < 0) {
      dispNet.innerHTML = `${net}<span class="unit">${getTranslation("unit_points")}</span>`;
      dispNet.style.color = "var(--color-demerit)";
      trendNet.textContent = getTranslation("trend_net_neg");
    } else {
      dispNet.innerHTML = `±0<span class="unit">${getTranslation("unit_points")}</span>`;
      dispNet.style.color = "var(--text-primary)";
      trendNet.textContent = getTranslation("trend_net_zero");
    }
  }

  // 4.2 「今日の省察」タブの描画
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
    document.getElementById("merit-column-total").textContent = `+${totalMeritsPoints}${getTranslation("unit_points")}`;
    document.getElementById("demerit-column-total").textContent = `${totalDemeritsPoints}${getTranslation("unit_points")}`;
  }

  // 功過アイテム要素の作成
  function createLedgerItemElement(item, count, type) {
    const div = document.createElement("div");
    div.className = `ledger-item ${count > 0 ? 'has-count' : ''}`;
    div.setAttribute("data-id", item.id);

    const sign = type === "merit" ? "+" : "";
    const pts = Math.abs(item.points);
    const l = state.language;

    // カスタム項目の名前・説明は文字列、プリセットは多言語オブジェクトである場合を吸収
    const nameText = typeof item.name === "string" ? item.name : (item.name[l] || item.name["ja"] || "");
    const descText = item.desc ? (typeof item.desc === "string" ? item.desc : (item.desc[l] || item.desc["ja"] || "")) : "";

    div.innerHTML = `
      <div class="item-info">
        <div class="item-header">
          <span class="item-name">${escapeHTML(nameText)}</span>
          <span class="item-badge">${sign}${pts}${getTranslation("unit_points")}</span>
        </div>
        ${descText ? `<div class="item-desc">${escapeHTML(descText)}</div>` : ''}
      </div>
      <div class="item-controls">
        <button type="button" class="count-btn btn-decrement" aria-label="減らす">−</button>
        <span class="count-display">${count}</span>
        <button type="button" class="count-btn btn-increment" aria-label="増やす">+</button>
      </div>
    `;

    // イベントリスナーの追加
    div.querySelector(".btn-decrement").addEventListener("click", () => {
      updateItemCount(item.id, -1);
    });

    div.querySelector(".btn-increment").addEventListener("click", () => {
      updateItemCount(item.id, 1);
    });

    return div;
  }

  // 4.3 「統計・軌跡」タブの描画
  function renderStatsTab() {
    renderCalendarGrid();
    renderCharts();
  }

  // GitHub風芝生カレンダーの描画
  function renderCalendarGrid() {
    const container = document.getElementById("calendar-weeks-grid");
    container.innerHTML = "";

    const today = new Date();
    const dates = [];

    const totalDays = 364; 
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

    let currentWeekEl = null;

    dates.forEach((date, index) => {
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

      // ツールチップ用テキスト
      dayEl.style.setProperty("--tooltip-text", `"${dateStr}: ${net} pts"`);

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

      // クリックでその日の編集へ
      dayEl.addEventListener("click", () => {
        state.currentDate = dateStr;
        document.getElementById("current-date-picker").value = dateStr;
        
        switchTab("tab-reflection");
        renderDashboard();
        renderReflectionTab();
      });

      currentWeekEl.appendChild(dayEl);
    });
  }

  // 4.4 グラフ描画（Chart.js）
  function renderCharts() {
    const allDates = Object.keys(state.records).sort();
    if (allDates.length === 0) {
      drawEmptyCharts();
      return;
    }

    const l = state.language;

    // --- 1. 累積スコア推移グラフ ---
    const cumulativeLabels = [];
    const cumulativeData = [];
    let runningSum = 0;

    allDates.forEach(dateStr => {
      const net = calculateDayScore(dateStr).net;
      runningSum += net;
      cumulativeLabels.push(dateStr.substring(5)); // 'MM-DD'
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
          label: getTranslation("cumulative_chart_title"),
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
        
        const item = findItemById(itemId);
        if (item && item.points > 0) { 
          const catObj = item.category || { ja: "その他" };
          const catText = typeof catObj === "string" ? catObj : (catObj[l] || catObj["ja"] || "Other");
          categoryCounts[catText] = (categoryCounts[catText] || 0) + count;
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

  // 4.5 「立命の誓願」タブの描画
  function renderGoalTab() {
    const statusContainer = document.getElementById("goal-status-container");
    const setupForm = document.getElementById("goal-setup-form");

    if (state.goal) {
      statusContainer.style.display = "flex";
      setupForm.style.display = "none";

      document.getElementById("display-goal-title").textContent = state.goal.title;
      document.getElementById("display-goal-description").textContent = state.goal.description || "...";
      document.getElementById("display-goal-start-date").textContent = state.goal.startDate;

      const accumulatedScore = calculateAccumulatedScoreFrom(state.goal.startDate);
      document.getElementById("display-goal-current-score").textContent = `${accumulatedScore} ${getTranslation("unit_points")}`;

      const target = state.goal.target;
      const percent = Math.max(0, Math.min(100, Math.round((accumulatedScore / target) * 100)));
      document.getElementById("display-goal-progress-text").textContent = `${accumulatedScore} / ${target} ${getTranslation("unit_points")} (${percent}%)`;
      document.getElementById("goal-progress-bar-fill").style.width = `${percent}%`;

      const daysElapsed = getDaysBetween(state.goal.startDate, getTodayDateString()) + 1;
      const dailyAvg = (accumulatedScore / daysElapsed).toFixed(1);
      document.getElementById("display-goal-daily-avg").textContent = `${dailyAvg} ${getTranslation("unit_points")}`;

      const estDateEl = document.getElementById("display-goal-estimated-date");
      const remainingScore = target - accumulatedScore;

      if (remainingScore <= 0) {
        estDateEl.textContent = getTranslation("goal_est_success");
        estDateEl.style.color = "var(--color-merit)";
      } else if (dailyAvg <= 0) {
        estDateEl.textContent = getTranslation("goal_est_impossible");
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

  // 4.6 「項目の編集」タブの描画
  function renderEditorTab() {
    const listContainer = document.getElementById("editor-items-container");
    listContainer.innerHTML = "";

    const activePreset = state.items[state.currentPreset];
    const filter = document.getElementById("editor-filter-preset").value;
    const l = state.language;

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
      
      const typeLabel = item.type === "merit" ? (l === "ja" || l === "zh" ? "善" : "M") : (l === "ja" || l === "zh" ? "悪" : "D");
      const typeClass = item.type === "merit" ? "var(--color-merit)" : "var(--color-demerit)";
      const sign = item.type === "merit" ? "+" : "";

      const nameText = typeof item.name === "string" ? item.name : (item.name[l] || item.name["ja"] || "");
      const catText = item.category ? (typeof item.category === "string" ? item.category : (item.category[l] || item.category["ja"] || "")) : "";
      const descText = item.desc ? (typeof item.desc === "string" ? item.desc : (item.desc[l] || item.desc["ja"] || "")) : "";

      card.innerHTML = `
        <div class="item-info">
          <div class="item-header" style="gap: 6px;">
            <span style="font-size: 11px; font-weight: 700; background: ${typeClass}; color: #fff; padding: 1px 4px; border-radius: 3px;">${typeLabel}</span>
            <span class="item-name" style="font-size: 14px;">${escapeHTML(nameText)}</span>
            <span class="item-badge">${sign}${Math.abs(item.points)}${getTranslation("unit_points")}</span>
          </div>
          <div class="item-desc" style="font-size: 11px; color: var(--text-secondary);">${escapeHTML(catText)} ${descText ? ` - ${escapeHTML(descText)}` : ''}</div>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <button type="button" class="preset-btn btn-edit-item" style="padding: 4px 10px; font-size:11px;">${l === "ja" || l === "zh" ? "編集" : "Edit"}</button>
          <button type="button" class="item-delete-btn" aria-label="Delete">
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
        if (confirm(getTranslation("confirm_delete_item").replace("{item}", nameText))) {
          deleteItem(item.id, item.type);
        }
      });

      listContainer.appendChild(card);
    });
  }

  // 編集フォームのセットアップ
  function setupEditForm(item) {
    const l = state.language;
    document.getElementById("editor-form-title").textContent = getTranslation("editor_form_edit_title");
    document.getElementById("edit-item-id").value = item.id;
    
    // 多言語オブジェクトとプレーンテキストのハンドリング
    document.getElementById("custom-item-name").value = typeof item.name === "string" ? item.name : (item.name[l] || item.name["ja"] || "");
    document.getElementById("custom-item-points").value = Math.abs(item.points);
    document.getElementById("custom-item-category").value = typeof item.category === "string" ? item.category : (item.category[l] || item.category["ja"] || "");
    document.getElementById("custom-item-desc").value = typeof item.desc === "string" ? item.desc : (item.desc[l] || item.desc["ja"] || "");

    const radios = document.getElementsByName("custom-item-type");
    for (let r of radios) {
      r.checked = r.value === item.type;
      r.disabled = true; 
    }

    document.getElementById("btn-cancel-custom-edit").style.display = "inline-block";
    document.getElementById("btn-save-custom-item").textContent = getTranslation("btn_update_item");
  }

  function resetEditorForm() {
    document.getElementById("editor-form-title").textContent = getTranslation("editor_form_add_title");
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
    document.getElementById("btn-save-custom-item").textContent = getTranslation("btn_save_item");
  }

  // ==========================================================================
  // 5. 多言語切り替えエンジン (Localization Engine)
  // ==========================================================================

  function setLanguage(lang) {
    state.language = lang;
    localStorage.setItem("koukakaku_lang", lang);

    // 5.1 HTMLのdir（書字方向）設定
    const isRTL = lang === "ar";
    const container = document.querySelector(".app-container");
    if (isRTL) {
      container.setAttribute("dir", "rtl");
      document.body.setAttribute("dir", "rtl");
    } else {
      container.setAttribute("dir", "ltr");
      document.body.setAttribute("dir", "ltr");
    }

    // 5.2 data-i18n を持つ静的要素の書き換え
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const translation = getTranslation(key);
      if (translation) {
        // SVGアイコンを含むボタンの子要素のテキストノードだけを更新するように配慮
        if (el.tagName === "BUTTON" && el.querySelector("svg")) {
          // アイコン以外のテキストノードを探して書き換え
          let textNodeFound = false;
          el.childNodes.forEach(child => {
            if (child.nodeType === Node.TEXT_NODE && child.textContent.trim() !== "") {
              child.textContent = translation;
              textNodeFound = true;
            } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName === "SPAN") {
              child.textContent = translation;
              textNodeFound = true;
            }
          });
          if (!textNodeFound) {
            // SPANがなく、直接テキストもない場合、SPANを作って追加
            const span = document.createElement("span");
            span.textContent = translation;
            el.appendChild(span);
          }
        } else {
          el.textContent = translation;
        }
      }
    });

    // 5.3 data-i18n-placeholder を持つプレースホルダーの書き換え
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      const translation = getTranslation(key);
      if (translation) {
        el.setAttribute("placeholder", translation);
      }
    });

    // リレンダリング
    renderAll();
  }

  function getTranslation(key) {
    if (TRANSLATIONS[key]) {
      return TRANSLATIONS[key][state.language] || TRANSLATIONS[key]["ja"] || "";
    }
    return "";
  }

  function updatePresetSwitcherUI() {
    const title = document.getElementById("current-preset-name");
    const desc = document.getElementById("current-preset-desc");
    const btn = document.getElementById("btn-toggle-preset");
    const l = state.language;

    const presetData = KOUKAKAKU_PRESETS[state.currentPreset];
    title.textContent = presetData.name[l] || presetData.name["ja"];
    desc.textContent = presetData.description[l] || presetData.description["ja"];

    const switchTarget = state.currentPreset === "modern" ? "traditional" : "modern";
    const targetName = KOUKAKAKU_PRESETS[switchTarget].name[l] || KOUKAKAKU_PRESETS[switchTarget].name["ja"];
    
    if (l === "ja" || l === "zh") {
      btn.textContent = `${targetName}へ切り替え`;
    } else if (l === "ar") {
      btn.textContent = `التبديل إلى ${targetName}`;
    } else {
      btn.textContent = `Switch to ${targetName}`;
    }
  }

  // ==========================================================================
  // 6. データ操作ロジック (Data Operations)
  // ==========================================================================

  // 特定項目のカウント増減
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
            demerit += count * item.points; // points は負値
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

  // 累積スコアの計算
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
    const active = state.items[state.currentPreset];
    let found = active.merits.find(i => i.id === id) || active.demerits.find(i => i.id === id);
    if (found) return found;

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
    renderAll();
  }

  // ==========================================================================
  // 7. イベントリスナーの設定 (Event Listeners)
  // ==========================================================================

  function setupEventListeners() {
    // 7.1 ナビゲーション切り替え
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
      item.addEventListener("click", () => {
        const targetTab = item.getAttribute("data-target");
        navItems.forEach(n => n.classList.remove("active"));
        item.classList.add("active");
        switchTab(targetTab);
      });
    });

    // 7.2 言語選択セレクターのイベント
    document.getElementById("lang-selector").addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });

    // 7.3 日付切り替え
    const datePicker = document.getElementById("current-date-picker");
    datePicker.addEventListener("change", (e) => {
      state.currentDate = e.target.value;
      renderDashboard();
      renderReflectionTab();
    });

    document.getElementById("date-display-trigger").addEventListener("click", () => {
      document.getElementById("current-date-picker").showPicker();
    });

    document.getElementById("btn-prev-day").addEventListener("click", () => changeDay(-1));
    document.getElementById("btn-next-day").addEventListener("click", () => changeDay(1));

    // 7.4 日記（省察録）入力
    const diaryInput = document.getElementById("reflection-diary-input");
    diaryInput.addEventListener("input", (e) => {
      if (!state.records[state.currentDate]) {
        state.records[state.currentDate] = { counts: {}, diary: "" };
      }
      state.records[state.currentDate].diary = e.target.value;
      
      if (e.target.value.trim() === "" && Object.keys(state.records[state.currentDate].counts).length === 0) {
        delete state.records[state.currentDate];
      }

      saveRecordsToStorage();
      renderDashboard();
    });

    // 7.5 プリセット切り替えボタン
    document.getElementById("btn-toggle-preset").addEventListener("click", togglePreset);

    // 7.6 テーマ切り替えボタン
    document.getElementById("btn-theme-toggle").addEventListener("click", () => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("koukakaku_theme", state.theme);
      applyTheme(state.theme);
      renderCharts();
    });

    // 7.7 カスタム項目の追加・保存
    document.getElementById("custom-item-form").addEventListener("submit", (e) => {
      e.preventDefault();

      const editId = document.getElementById("edit-item-id").value;
      const nameVal = document.getElementById("custom-item-name").value.trim();
      const pointsInput = parseInt(document.getElementById("custom-item-points").value, 10);
      const categoryVal = document.getElementById("custom-item-category").value.trim();
      const descVal = document.getElementById("custom-item-desc").value.trim();

      const type = document.querySelector('input[name="custom-item-type"]:checked').value;
      const points = type === "merit" ? Math.abs(pointsInput) : -Math.abs(pointsInput);

      const activeList = state.items[state.currentPreset][type === "merit" ? "merits" : "demerits"];
      const l = state.language;

      if (editId) {
        const itemIndex = activeList.findIndex(i => i.id === editId);
        if (itemIndex > -1) {
          const item = activeList[itemIndex];
          // もし元データが多言語オブジェクトならその言語キーを更新、文字列ならそのまま更新
          if (typeof item.name === "string") {
            item.name = nameVal;
            item.category = categoryVal;
            item.desc = descVal;
          } else {
            item.name[l] = nameVal;
            item.category[l] = categoryVal;
            item.desc[l] = descVal;
          }
          item.points = points;
        }
      } else {
        const newId = `c_${type === "merit" ? "m" : "d"}_${Date.now()}`;
        // 新規作成時は、現在の表示言語をキーとした多言語オブジェクトとして登録
        const nameObj = { ja: nameVal, en: nameVal, zh: nameVal, fr: nameVal, it: nameVal, es: nameVal, de: nameVal, ru: nameVal, ar: nameVal, hi: nameVal };
        const catObj = { ja: categoryVal, en: categoryVal, zh: categoryVal, fr: categoryVal, it: categoryVal, es: categoryVal, de: categoryVal, ru: categoryVal, ar: categoryVal, hi: categoryVal };
        const descObj = { ja: descVal, en: descVal, zh: descVal, fr: descVal, it: descVal, es: descVal, de: descVal, ru: descVal, ar: descVal, hi: descVal };
        
        activeList.push({ id: newId, name: nameObj, points, category: catObj, desc: descObj });
      }

      saveItemsToStorage();
      renderAll();
      resetEditorForm();
    });

    document.getElementById("btn-cancel-custom-edit").addEventListener("click", resetEditorForm);
    document.getElementById("editor-filter-preset").addEventListener("change", renderEditorTab);

    // 7.8 誓願の登録
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
      
      document.getElementById("input-goal-title").value = "";
      document.getElementById("input-goal-target").value = "3000";
      document.getElementById("input-goal-desc").value = "";
    });

    // 誓願のキャンセル
    document.getElementById("btn-cancel-goal").addEventListener("click", () => {
      if (confirm(getTranslation("confirm_cancel_goal"))) {
        state.goal = null;
        saveGoalToStorage();
        renderGoalTab();
      }
    });

    // 7.9 エクスポート
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
            if (confirm(getTranslation("confirm_import"))) {
              state.records = imported.records;
              state.items = imported.items;
              state.currentPreset = imported.preset || "modern";
              state.goal = imported.goal || null;

              saveRecordsToStorage();
              saveItemsToStorage();
              saveGoalToStorage();
              localStorage.setItem("koukakaku_current_preset", state.currentPreset);
              location.reload();
            }
          } else {
            alert("Invalid backup file format.");
          }
        } catch (err) {
          alert("Import failed. Malformed JSON.");
          console.error(err);
        }
      };
      reader.readAsText(file);
    });

    // 初期化
    document.getElementById("btn-reset-data").addEventListener("click", () => {
      if (confirm(getTranslation("confirm_reset"))) {
        localStorage.clear();
        location.reload();
      }
    });
  }

  // タブ切り替え
  function switchTab(targetId) {
    document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.remove("active"));
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.classList.add("active");
    }

    if (targetId === "tab-stats") {
      renderStatsTab();
    } else if (targetId === "tab-goal") {
      renderGoalTab();
    } else if (targetId === "tab-editor") {
      renderEditorTab();
      resetEditorForm();
    }
  }

  // 日付の変更
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
  // 8. 汎用ヘルパー関数 (Helper Functions)
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

  function getLocalizedDateString(dateStr, lang) {
    const date = new Date(dateStr + 'T00:00:00');
    let intlLang = lang;
    if (lang === "zh") intlLang = "zh-TW";
    try {
      return new Intl.DateTimeFormat(intlLang, { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    } catch (e) {
      return dateStr;
    }
  }

  function updateDateDisplay() {
    const textEl = document.getElementById("date-display-text");
    if (textEl) {
      textEl.textContent = getLocalizedDateString(state.currentDate, state.language);
    }
    const picker = document.getElementById("current-date-picker");
    if (picker) {
      picker.value = state.currentDate;
    }
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

  // 起動
  init();
});
