/**
 * 功過格プリセット項目定義ファイル (10言語対応版)
 * Supports: ja, en, zh (繁體中文), fr, it, es, de, ru, ar (RTL), hi
 */

const KOUKAKAKU_PRESETS = {
  traditional: {
    name: {
      ja: "伝統版（古典項目）",
      en: "Traditional Version (Classical)",
      zh: "傳統版（古典項目）",
      fr: "Version Traditionnelle (Classique)",
      it: "Versione Tradizionale (Classica)",
      es: "Versión Tradicional (Clásica)",
      de: "Traditionelle Version (Klassisch)",
      ru: "Традиционная версия (Классическая)",
      ar: "النسخة التقليدية (الكلاسيكية)",
      hi: "पारंपरिक संस्करण (क्लासिक)"
    },
    description: {
      ja: "古典から伝わる善悪基準。社会倫理や命の尊厳、克己の精神を重視します。",
      en: "Classical ethical criteria. Focuses on social ethics, respect for life, and self-discipline.",
      zh: "源自古典的善惡標準。重視社會倫理、生命尊嚴及克己精神。",
      fr: "Critères éthiques classiques. Axé sur l'éthique sociale, le respect de la vie et l'autodiscipline.",
      it: "Criteri etici classici. Incentrato su etica sociale, rispetto della vita e autodisciplina.",
      es: "Criterios éticos clásicos. Centrado en la ética social, el respeto a la vida y la autodisciplina.",
      de: "Klassische ethische Kriterien. Konzentriert sich auf soziale Ethik, Respekt vor dem Leben und Selbstdisziplin.",
      ru: "Классические этические критерии. Сосредоточено на социальной этике, уважении к жизни и самодисциплине.",
      ar: "المعايير الأخلاقية الكلاسيكية. يركز على الأخلاق الاجتماعية واحترام الحياة والانضباط الذاتي.",
      hi: "शास्त्रीय नैतिक मानदंड। सामाजिक नैतिकता, जीवन के प्रति सम्मान और आत्म-अनुशासन पर ध्यान केंद्रित करता है।"
    },
    merits: [
      {
        id: "t_m_1",
        points: 100,
        category: { ja: "人命・健康", en: "Life & Health", zh: "人命健康", fr: "Vie & Santé", it: "Vita & Salute", es: "Vida & Salud", de: "Leben & Gesundheit", ru: "Жизнь и здоровье", ar: "الحياة والصحة", hi: "जीवन और स्वास्थ्य" },
        name: {
          ja: "人の命を救う", en: "Save a human life", zh: "救人一命", fr: "Sauver une vie humaine", it: "Salvare una vita umana", es: "Salvar una vida humana", de: "Ein Menschenleben retten", ru: "Спасти человеческую жизнь", ar: "إنقاذ حياة بشرية", hi: "किसी का जीवन बचाना"
        },
        desc: {
          ja: "遭難者や重病人の命を救う、自殺を思いとどまらせる。",
          en: "Save someone in danger, prevent a suicide, or aid critical recovery.",
          zh: "挽救他人生命，或勸阻他人自殺。",
          fr: "Sauver quelqu'un en danger, prévenir un suicide ou aider à la guérison.",
          it: "Salvare qualcuno in pericolo, prevenire un suicidio o aiutare la guarigione.",
          es: "Salvar a alguien en peligro, prevenir un suicidio o ayudar a la recuperación.",
          de: "Jemanden in Gefahr retten, Selbstmord verhindern oder bei der Genesung helfen.",
          ru: "Спасти кого-то в опасности, предотвратить самоубийство или помочь выздороветь.",
          ar: "إنقاذ شخص في خطر، أو منع الانتحار، أو المساعدة في الشفاء.",
          hi: "खतरे में किसी को बचाना, आत्महत्या रोकना, या ठीक होने में मदद करना।"
        }
      },
      {
        id: "t_m_2",
        points: 100,
        category: { ja: "人命・健康", en: "Life & Health", zh: "人命健康", fr: "Vie & Santé", it: "Vita & Salute", es: "Vida & Salud", de: "Leben & Gesundheit", ru: "Жизнь и здоровье", ar: "الحياة والصحة", hi: "जीवन और स्वास्थ्य" },
        name: {
          ja: "堕胎を思いとどまらせる", en: "Prevent an abortion", zh: "勸阻堕胎", fr: "Empêcher un avortement", it: "Prevenire un aborto", es: "Prevenir un aborto", de: "Einen Schwangerschaftsabbruch verhindern", ru: "Предотвратить аборт", ar: "منع الإجهاض", hi: "गर्भपात रोकना"
        },
        desc: {
          ja: "命を闇に葬ろうとするのを説得して止めさせる。",
          en: "Persuade someone to preserve an unborn child's life.",
          zh: "說服並阻止他人墮胎，保留生命。",
          fr: "Persuader quelqu'un de préserver la vie d'un enfant à naître.",
          it: "Persuadere qualcuno a preservare la vita di un nascituro.",
          es: "Persuadir a alguien para que preserve la vida de un niño no nacido.",
          de: "Jemanden davon überzeugen, das Leben eines ungeborenen Kindes zu bewahren.",
          ru: "Убедить кого-то сохранить жизнь нерожденного ребенка.",
          ar: "إقناع شخص ما بالحفاظ على حياة طفل لم يولد بعد.",
          hi: "किसी को अजन्मे बच्चे के जीवन की रक्षा करने के लिए मनाना।"
        }
      },
      {
        id: "t_m_3",
        points: 30,
        category: { ja: "教化・教育", en: "Guidance & Education", zh: "教化教育", fr: "Éducation", it: "Educazione", es: "Educación", de: "Erziehung", ru: "Воспитание", ar: "التعليم والإرشاد", hi: "मार्गदर्शन और शिक्षा" },
        name: {
          ja: "迷える人を正しい道へ導く", en: "Guide someone to the right path", zh: "引導迷途者", fr: "Guider quelqu'un sur le droit chemin", it: "Guidare sulla retta via", es: "Guiar por el camino correcto", de: "Jemanden auf den rechten Weg leiten", ru: "Направить на верный путь", ar: "إرشاد شخص إلى الطريق الصحيح", hi: "किसी को सही राह दिखाना"
        },
        desc: {
          ja: "非行や道を踏み外しそうな人を説得・指導し更生させる。",
          en: "Lead wayward or troubled individuals toward reform and morality.",
          zh: "勸導非行者改過自新，引導迷失之人。",
          fr: "Mener les personnes égarées vers la réforme et la moralité.",
          it: "Condurre le persone smarrite verso la riforma e la moralità.",
          es: "Guiar a personas descarriadas hacia la reforma y la moralidad.",
          de: "Irrgeleitete Personen zu Besserung und Moral führen.",
          ru: "Вести заблудших людей к исправлению и нравственности.",
          ar: "توجيه الأشخاص الضائعين نحو الإصلاح والأخلاق.",
          hi: "भटके हुए लोगों को सुधार और नैतिकता की ओर ले जाना।"
        }
      },
      {
        id: "t_m_4",
        points: 30,
        category: { ja: "社会正義", en: "Social Justice", zh: "社會正義", fr: "Justice Sociale", it: "Giustizia Sociale", es: "Justicia Social", de: "Soziale Gerechtigkeit", ru: "Правосудие", ar: "العدالة الاجتماعية", hi: "सामाजिक न्याय" },
        name: {
          ja: "冤罪の人を救う", en: "Save an innocent person", zh: "拯救冤屈之人", fr: "Innocenter un accusé", it: "Salvare un innocente", es: "Salvar a un inocente", de: "Einen Unschuldigen retten", ru: "Спасти невиновного", ar: "إنقاذ شخص بريء", hi: "निर्दोष व्यक्ति को बचाना"
        },
        desc: {
          ja: "濡れ衣を着せられた人の無実を証明し助ける。",
          en: "Clear the name of someone falsely accused.",
          zh: "洗清被誣陷者的冤屈並給予幫助。",
          fr: "Laver le nom de quelqu'un faussement accusé.",
          it: "Ripulire il nome di qualcuno falsamente accusato.",
          es: "Limpiar el nombre de alguien acusado falsamente.",
          de: "Den Namen von jemandem reinwaschen, der fälschlicherweise beschuldigt wurde.",
          ru: "Очистить имя человека, ложно обвиненного в преступлении.",
          ar: "تبرئة اسم شخص متهم كذباً.",
          hi: "झूठे आरोपी का नाम साफ करना।"
        }
      },
      {
        id: "t_m_5",
        points: 10,
        category: { ja: "親族・家庭", en: "Family & Relations", zh: "親族家庭", fr: "Famille", it: "Famiglia", es: "Familia", de: "Familie", ru: "Семья", ar: "العائلة والعلاقات", hi: "परिवार और रिश्ते" },
        name: {
          ja: "親孝行に励む", en: "Practice filial piety", zh: "孝敬父母", fr: "Pratiquer la piété filiale", it: "Praticare la pietà filiale", es: "Practicar la piedad filial", de: "Kindliche Pietät praktizieren", ru: "Почитать родителей", ar: "بر الوالدين", hi: "माता-पिता की सेवा"
        },
        desc: {
          ja: "親に感謝の心を示し、心を尽くして世話をする。",
          en: "Show gratitude and care deeply for one's parents.",
          zh: "對父母心存感激，竭力孝順照料。",
          fr: "Montrer de la gratitude et prendre soin de ses parents.",
          it: "Mostrare gratitudine e prendersi cura dei propri genitori.",
          es: "Mostrar gratitud y cuidar profundamente de los padres.",
          de: "Dankbarkeit zeigen und sich aufopferungsvoll um die Eltern kümmern.",
          ru: "Проявлять благодарность и заботу о своих родителях.",
          ar: "إظهار الامتنان والاهتمام العميق بالوالدين.",
          hi: "अपने माता-पिता के प्रति कृतज्ञता दिखाना और उनकी देखभाल करना।"
        }
      },
      {
        id: "t_m_6",
        points: 3,
        category: { ja: "克己・修養", en: "Self-Discipline", zh: "克己修養", fr: "Discipline", it: "Disciplina", es: "Disciplina", de: "Selbstdisziplin", ru: "Самообладание", ar: "الانضباط الذاتي", hi: "आत्म-अनुशासन" },
        name: {
          ja: "誹謗されても抗弁しない", en: "Do not argue when slandered", zh: "受謗不辯", fr: "Ne pas riposter face aux calomnies", it: "Non ribattere alle calunnie", es: "No discutir ante calumnias", de: "Bei Verleumdung nicht streiten", ru: "Не спорить при клевете", ar: "عدم الجدال عند التعرض للافتراء", hi: "निंदा होने पर बहस न करना"
        },
        desc: {
          ja: "自分のプライドを抑え、争いを避けて黙って耐える。",
          en: "Hold back pride, avoid useless fights, and endure with patience.",
          zh: "放下自尊，避免無謂爭吵，默默忍耐。",
          fr: "Retenir sa fierté, éviter les disputes inutiles et endurer avec patience.",
          it: "Trattenere l'orgoglio, evitare litigi inutili e sopportare con pazienza.",
          es: "Contener el orgullo, evitar peleas inútiles y soportar con paciencia.",
          de: "Stolz zurückhalten, unnötige Kämpfe vermeiden und geduldig ertragen.",
          ru: "Сдерживать гордость, избегать споров и терпеливо переносить.",
          ar: "كبح الكبرياء، وتجنب المعارك غير المفيدة، والاحتمال بالصبر.",
          hi: "अहंकार को रोकना, व्यर्थ के झगड़ों से बचना और धैर्यपूर्वक सहना।"
        }
      },
      {
        id: "t_m_7",
        points: 1,
        category: { ja: "慈悲・放生", en: "Compassion to Animals", zh: "慈悲放生", fr: "Compassion", it: "Compassione", es: "Compasión", de: "Mitgefühl", ru: "Сострадание к животным", ar: "الرحمة بالحيوان", hi: "जीवों पर दया" },
        name: {
          ja: "生き物の命を救う", en: "Save a living creature", zh: "救護生靈/放生", fr: "Sauver une créature vivante", it: "Salvare una creatura vivente", es: "Salvar a una criatura viva", de: "Ein Lebewesen retten", ru: "Спасти живое существо", ar: "إنقاذ مخلوق حي", hi: "किसी जीव का जीवन बचाना"
        },
        desc: {
          ja: "魚、虫、鳥などの小さな生き物を殺さず逃がしてやる。",
          en: "Save and release small animals, fish, insects, or birds.",
          zh: "不殺害並放生魚、蟲、鳥等微小生命。",
          fr: "Sauver et relâcher de petits animaux, poissons, insectes ou oiseaux.",
          it: "Salvare e liberare piccoli animali, pesci, insetti o uccelli.",
          es: "Salvar y liberar pequeños animales, peces, insectos o aves.",
          de: "Kleine Tiere, Fische, Insekten oder Vögel retten und freilassen.",
          ru: "Спасать и отпускать мелких животных, рыб, насекомых или птиц.",
          ar: "إنقاذ وإطلاق سراح الحيوانات الصغيرة أو الأسماك أو الحشرات أو الطيور.",
          hi: "छोटे जानवरों, मछलियों, कीड़ों या पक्षियों को बचाना और छोड़ना।"
        }
      }
    ],
    demerits: [
      {
        id: "t_d_1",
        points: -100,
        category: { ja: "人命・健康", en: "Life & Health", zh: "人命健康", fr: "Vie & Santé", it: "Vita & Salute", es: "Vida & Salud", de: "Leben & Gesundheit", ru: "Жизнь и здоровье", ar: "الحياة والصحة", hi: "जीवन और स्वास्थ्य" },
        name: {
          ja: "人を死に至らしめる", en: "Cause a human death", zh: "致人於死", fr: "Causer la mort d'autrui", it: "Causare la morte di qualcuno", es: "Causar la muerte de alguien", de: "Den Tod eines Menschen verursachen", ru: "Причинить смерть человеку", ar: "التسبب في وفاة إنسان", hi: "किसी की मृत्यु का कारण बनना"
        },
        desc: {
          ja: "故意または重大な過失によって他人の生命を奪う。",
          en: "Directly or through gross negligence take a human life.",
          zh: "故意或因重大過失奪取他人生命。",
          fr: "Directement ou par négligence grave, ôter une vie humaine.",
          it: "Direttamente o per grave negligenza, togliere una vita umana.",
          es: "Directamente o por negligencia grave, quitar una vida humana.",
          de: "Direkt oder durch grobe Fahrlässigkeit ein Menschenleben nehmen.",
          ru: "Напрямую или по грубой неосторожности лишить человека жизни.",
          ar: "إزهاق روح بشرية بشكل مباشر أو بسبب الإهمال الجسيم.",
          hi: "प्रत्यक्ष या घोर लापरवाही से किसी का जीवन लेना।"
        }
      },
      {
        id: "t_d_2",
        points: -100,
        category: { ja: "人命・健康", en: "Life & Health", zh: "人命健康", fr: "Vie & Santé", it: "Vita & Salute", es: "Vida & Salud", de: "Leben & Gesundheit", ru: "Жизнь и здоровье", ar: "الحياة والصحة", hi: "जीवन और स्वास्थ्य" },
        name: {
          ja: "堕胎を行わせる・促す", en: "Cause or urge an abortion", zh: "墮胎或誘使墮胎", fr: "Provoquer ou inciter à l'avortement", it: "Causare o istigare un aborto", es: "Provocar o inducir un aborto", de: "Abtreibung verursachen oder fordern", ru: "Сделать или побудить к аборту", ar: "التسبب في الإجهاض أو الحث عليه", hi: "गर्भपात कराना या उसके लिए उकसाना"
        },
        desc: {
          ja: "お腹の中の命を奪うことに関与する。",
          en: "Take away the life of an unborn child.",
          zh: "參與奪取腹中胎兒生命的行為。",
          fr: "Prendre la vie d'un enfant à naître.",
          it: "Togliere la vita a un nascituro.",
          es: "Quitar la vida a un niño no nacido.",
          de: "Das Leben eines ungeborenen Kindes nehmen.",
          ru: "Лишить жизни нерожденного ребенка.",
          ar: "إنهاء حياة طفل لم يولد بعد.",
          hi: "अजन्मे बच्चे का जीवन लेना।"
        }
      },
      {
        id: "t_d_3",
        points: -30,
        category: { ja: "社会正義", en: "Social Justice", zh: "社會正義", fr: "Justice Sociale", it: "Giustizia Sociale", es: "Justicia Social", de: "Soziale Gerechtigkeit", ru: "Правосудие", ar: "العدالة الاجتماعية", hi: "सामाजिक न्याय" },
        name: {
          ja: "他人を陥れるため中傷誹謗する", en: "Slander to harm someone", zh: "誹謗陷害他人", fr: "Calomnier pour nuire à quelqu'un", it: "Calunniare per nuocere", es: "Calumniar para dañar a alguien", de: "Verleumden, um jemanden zu schaden", ru: "Клеветать во вред кому-то", ar: "الافتراء لإلحاق الضرر بشخص ما", hi: "किसी को नुकसान पहुँचाने के लिए निंदा करना"
        },
        desc: {
          ja: "デマを流して他人の名誉を傷つけ、失脚させようとする。",
          en: "Spread false rumors to damage someone's reputation.",
          zh: "散佈謠言破壞他人名譽，試圖陷害他人。",
          fr: "Répandre de fausses rumeurs pour nuire à la réputation.",
          it: "Diffondere false voci per danneggiare la reputazione altrui.",
          es: "Difundir rumores falsos para dañar la reputación de alguien.",
          de: "Falsche Gerüchte verbreiten, um den Ruf von jemandem zu schädigen.",
          ru: "Распространять ложные слухи, чтобы повредить чьей-то репутации.",
          ar: "نشر شائعات كاذبة لتشويه سمعة شخص ما.",
          hi: "किसी की प्रतिष्ठा को नुकसान पहुँचाने के लिए झूठी अफवाहें फैलाना।"
        }
      },
      {
        id: "t_d_4",
        points: -30,
        category: { ja: "社会正義", en: "Social Justice", zh: "社會正義", fr: "Justice Sociale", it: "Giustizia Sociale", es: "Justicia Social", de: "Soziale Gerechtigkeit", ru: "Правосудие", ar: "العدالة الاجتماعية", hi: "सामाजिक न्याय" },
        name: {
          ja: "他人のプライバシーを暴き妨害する", en: "Expose privacy & obstruct", zh: "揭人隱私並加以干擾", fr: "Divulguer la vie privée & nuire", it: "Divulgare la privacy & ostacolare", es: "Exponer la privacidad y obstruir", de: "Privatsphäre enthüllen & stören", ru: "Раскрыть тайну и помешать", ar: "فضح الخصوصية والعرقلة", hi: "गोपनीयता उजागर करना और बाधा डालना"
        },
        desc: {
          ja: "秘密を暴いて弱みを握り、仕事や生活を妨害する。",
          en: "Reveal secrets to exploit weaknesses and disrupt lives.",
          zh: "揭露他人秘密以抓住痛處，干擾其工作或生活。",
          fr: "Révéler des secrets pour exploiter les faiblesses.",
          it: "Svelare segreti per sfruttare le debolezze altrui.",
          es: "Revelar secretos para explotar debilidades e interferir.",
          de: "Geheimnisse enthüllen, um Schwächen auszunutzen.",
          ru: "Раскрывать секреты, чтобы использовать слабости и мешать жить.",
          ar: "كشف الأسرار لاستغلال نقاط الضعف وعرقلة الحياة.",
          hi: "कमजोरियों का फायदा उठाने और जीवन को बाधित करने के लिए रहस्य उजागर करना।"
        }
      },
      {
        id: "t_d_5",
        points: -10,
        category: { ja: "親族・家庭", en: "Family & Relations", zh: "親族家庭", fr: "Famille", it: "Famiglia", es: "Familia", de: "Familie", ru: "Семья", ar: "العائلة والعلاقات", hi: "परिवार और रिश्ते" },
        name: {
          ja: "親不孝な言動をとる", en: "Behave unfilially", zh: "忤逆父母", fr: "Se comporter de manière ingrate", it: "Comportarsi in modo non filiale", es: "Comportarse de forma ingrata", de: "Sich undankbar verhalten", ru: "Быть непочтительным к родителям", ar: "عقوق الوالدين", hi: "माता-पिता के प्रति अभद्र व्यवहार"
        },
        desc: {
          ja: "親をないがしろにし、精神的・肉体的に苦しめる。",
          en: "Disrespect parents, causing them physical or emotional pain.",
          zh: "怠慢父母，使其在精神或肉體上遭受痛苦。",
          fr: "Manquer de respect envers ses parents, causant de la douleur.",
          it: "Mancare di rispetto ai genitori, causando dolore fisico o emotivo.",
          es: "Faltar al respeto a los padres, causándoles dolor físico o emocional.",
          de: "Eltern missachten und ihnen Schmerzen oder Kummer bereiten.",
          ru: "Не уважать родителей, причиняя им физическую или душевную боль.",
          ar: "عدم احترام الوالدين، مما يسبب لهما ألمًا جسديًا أو نفسيًا.",
          hi: "माता-पिता का अनादर करना, जिससे उन्हें शारीरिक या भावनात्मक कष्ट हो।"
        }
      },
      {
        id: "t_d_6",
        points: -5,
        category: { ja: "言葉の過ち", en: "Speech Errors", zh: "言語過失", fr: "Parole", it: "Parola", es: "Habla", de: "Rede", ru: "Речь", ar: "أخطاء اللسان", hi: "वाणी दोष" },
        name: {
          ja: "悪口を言って他人を傷つける", en: "Hurt someone with bad words", zh: "惡口傷人", fr: "Blesser quelqu'un par des paroles", it: "Ferire qualcuno a parole", es: "Herir a alguien con palabras", de: "Jemanden mit Worten verletzen", ru: "Ранить словами", ar: "إيذاء شخص بالكلمات السيئة", hi: "कटु वचनों से किसी को ठेस पहुँचाना"
        },
        desc: {
          ja: "暴言や冷酷な言葉で他人の心を痛めつける。",
          en: "Use harsh or cruel language to inflict emotional distress.",
          zh: "使用粗暴或冷酷的言語傷害他人心靈。",
          fr: "Utiliser un langage dur ou cruel pour blesser le cœur.",
          it: "Usare un linguaggio duro o crudele per ferire il cuore.",
          es: "Usar un lenguaje áspero o cruel para causar dolor emocional.",
          de: "Harte oder grausame Sprache verwenden, um Kummer zu bereiten.",
          ru: "Использовать грубые или жестокие слова, причиняя душевную боль.",
          ar: "استخدام لغة قاسية أو قاسية لإلحاق الأذى النفسي.",
          hi: "भावनात्मक कष्ट पहुँचाने के लिए कठोर या क्रूर भाषा का प्रयोग करना।"
        }
      },
      {
        id: "t_d_7",
        points: -1,
        category: { ja: "慈悲・放生", en: "Compassion to Animals", zh: "慈悲放生", fr: "Compassion", it: "Compassione", es: "Compasión", de: "Mitgefühl", ru: "Сострадание к животным", ar: "الرحمة بالحيوان", hi: "जीवों पर दया" },
        name: {
          ja: "むやみに生き物を殺生する", en: "Kill a living creature needlessly", zh: "隨意殺生", fr: "Tuer inutilement une créature", it: "Uccidere inutilmente una creatura", es: "Matar inútilmente a una criatura", de: "Ein Lebewesen unnötig töten", ru: "Бессмысленно убивать живое", ar: "قتل مخلوق حي بلا داعٍ", hi: "व्यर्थ में किसी जीव की हत्या करना"
        },
        desc: {
          ja: "遊び半分や必要以上に虫や動物を殺す。",
          en: "Kill insects or animals for fun or without genuine necessity.",
          zh: "出於好玩或無必要地殺害昆蟲或動物。",
          fr: "Tuer des insectes ou des animaux pour s'amuser ou sans nécessité.",
          it: "Uccidere insetti o animali per divertimento o senza necessità.",
          es: "Matar insectos o animales por diversión o sin necesidad.",
          de: "Insekten oder Tiere zum Spaß oder ohne echte Notwendigkeit töten.",
          ru: "Убивать насекомых или животных ради забавы или без необходимости.",
          ar: "قتل الحشرات أو الحيوانات للتسلية أو دون ضرورة حقيقية.",
          hi: "मनोरंजन के लिए या बिना किसी आवश्यकता के कीड़ों या जानवरों को मारना।"
        }
      }
    ]
  },
  modern: {
    name: {
      ja: "現代版（セルフケア項目）",
      en: "Modern Version (Self-Care)",
      zh: "現代版（自我關懷項目）",
      fr: "Version Moderne (Soin de Soi)",
      it: "Versione Moderna (Cura di Sé)",
      es: "Versión Moderna (Autocuidado)",
      de: "Moderne Version (Selbstfürsorge)",
      ru: "Современная версия (Самопомощь)",
      ar: "النسخة الحديثة (الرعاية الذاتية)",
      hi: "आधुनिक संस्करण (स्व-देखभाल)"
    },
    description: {
      ja: "日常生活の習慣改善、メンタルケア、自己研鑽を重視した項目です。",
      en: "Focuses on daily habits, mental well-being, and self-improvement.",
      zh: "注重改善日常生活習慣、心理健康及自我提升。",
      fr: "Axé sur les habitudes quotidiennes, le bien-être mental et l'amélioration de soi.",
      it: "Incentrato su abitudini quotidiane, benessere mentale e miglioramento personale.",
      es: "Centrado en los hábitos diarios, el bienestar mental y la superación personal.",
      de: "Konzentriert sich auf tägliche Gewohnheiten, mentales Wohlbefinden und Selbstverbesserung.",
      ru: "Сосредоточено на повседневных привычках, психическом здоровье и саморазвитии.",
      ar: "يركز على العادات اليومية، والصحة النفسية، وتحسين الذات.",
      hi: "दैनिक आदतों, मानसिक स्वास्थ्य और आत्म-सुधार पर ध्यान केंद्रित करता है।"
    },
    merits: [
      {
        id: "m_m_1",
        points: 1,
        category: { ja: "健康・生活", en: "Health & Life", zh: "健康生活", fr: "Santé & Vie", it: "Salute & Vita", es: "Salud & Vida", de: "Gesundheit & Leben", ru: "Здоровье и жизнь", ar: "الصحة والحياة", hi: "स्वास्थ्य और जीवन" },
        name: {
          ja: "朝早起きをして生活リズムを整えた", en: "Woke up early & set daily rhythm", zh: "早起並調整作息", fr: "Levé tôt & rythme régulier", it: "Alzato presto & ritmo regolare", es: "Levantarse temprano y tener ritmo", de: "Früh aufgestanden & Rhythmus gepflegt", ru: "Рано встал и настроил режим", ar: "الاستيقاظ مبكراً وتنظيم اليوم", hi: "सुबह जल्दी उठना और दिनचर्या बनाना"
        },
        desc: {
          ja: "目標の時間に起床し、朝の時間を有意義に開始した。",
          en: "Woke up at the target time and had a productive morning.",
          zh: "在設定的時間起床，充實地開始早晨時光。",
          fr: "Se lever à l'heure prévue et passer une matinée productive.",
          it: "Alzarsi all'ora stabilita e iniziare una giornata produttiva.",
          es: "Despertarse a la hora prevista y tener una mañana productiva.",
          de: "Zur geplanten Zeit aufgestanden und einen produktiven Morgen verbracht.",
          ru: "Проснулся в намеченное время и провел продуктивное утро.",
          ar: "الاستيقاظ في الوقت المحدد وبدء صباح مثمر.",
          hi: "तय समय पर उठना और सुबह का उत्पादक समय बिताना।"
        }
      },
      {
        id: "m_m_2",
        points: 2,
        category: { ja: "健康・生活", en: "Health & Life", zh: "健康生活", fr: "Santé & Vie", it: "Salute & Vita", es: "Salud & Vida", de: "Gesundheit & Leben", ru: "Здоровье и life", ar: "الصحة والحياة", hi: "स्वास्थ्य और जीवन" },
        name: {
          ja: "適度な運動やストレッチを行った", en: "Did moderate exercise or stretching", zh: "進行適度運動或伸展", fr: "Fait de l'exercice ou des étirements", it: "Fatto esercizio o stretching", es: "Hacer ejercicio o estiramientos", de: "Mäßig trainiert oder gedehnt", ru: "Сделал зарядку или потренировался", ar: "ممارسة تمارين معتدلة أو الإطالة", hi: "हल्का व्यायाम या खिंचाव करना"
        },
        desc: {
          ja: "ウォーキング、筋トレ、ヨガなどを20分以上実践した。",
          en: "Practiced walking, workout, or yoga for at least 20 minutes.",
          zh: "進行散步、重訓、瑜珈等運動20分鐘以上。",
          fr: "Marcher, s'entraîner ou faire du yoga pendant au moins 20 minutes.",
          it: "Camminare, allenarsi o fare yoga per almeno 20 minuti.",
          es: "Caminar, entrenar o hacer yoga durante al menos 20 minutos.",
          de: "Mindestens 20 Minuten spazieren gegangen, trainiert oder Yoga gemacht.",
          ru: "Ходил пешком, тренировался или занимался йогой от 20 минут.",
          ar: "المشي أو ممارسة الرياضة أو اليوغا لمدة 20 دقيقة على الأقل.",
          hi: "कम से कम 20 मिनट तक टहलना, कसरत या योग करना।"
        }
      },
      {
        id: "m_m_3",
        points: 1,
        category: { ja: "健康・生活", en: "Health & Life", zh: "健康生活", fr: "Santé & Vie", it: "Salute & Vita", es: "Salud & Vida", de: "Gesundheit & Leben", ru: "Здоровье и жизнь", ar: "الصحة والحياة", hi: "स्वास्थ्य और जीवन" },
        name: {
          ja: "体に良い健康的な食事をとった", en: "Ate healthy, balanced meals", zh: "攝取健康均衡飲食", fr: "Mangé des repas sains", it: "Mangiato cibi sani", es: "Comer comidas saludables", de: "Gesund & ausgewogen gegessen", ru: "Питался здоровой пищей", ar: "تناول وجبات صحية ومتوازنة", hi: "स्वस्थ और संतुलित भोजन करना"
        },
        desc: {
          ja: "栄養バランスを意識し、暴飲暴食を避けた。",
          en: "Paid attention to nutrition and avoided overeating.",
          zh: "注意營養均衡，避免暴飲暴食。",
          fr: "Faire attention à la nutrition et éviter les excès.",
          it: "Prestare attenzione alla nutrizione ed evitare eccessi.",
          es: "Prestar atención a la nutrición y evitar comer en exceso.",
          de: "Auf gesunde Ernährung geachtet und Überessen vermieden.",
          ru: "Следил за питанием и избегал переедания.",
          ar: "الاهتمام بالتغذية وتجنب الإفراط في تناول الطعام.",
          hi: "पोषण पर ध्यान देना और अधिक खाने से बचना।"
        }
      },
      {
        id: "m_m_4",
        points: 2,
        category: { ja: "人間関係", en: "Human Relations", zh: "人際關係", fr: "Relations", it: "Relazioni", es: "Relaciones", de: "Beziehungen", ru: "Отношения", ar: "العلاقات الإنسانية", hi: "मानवीय संबंध" },
        name: {
          ja: "感謝の言葉を口にした", en: "Expressed gratitude to someone", zh: "親口表達感謝", fr: "Exprimer sa gratitude", it: "Espresso gratitudine", es: "Expresar gratitud", de: "Dankbarkeit ausgedrückt", ru: "Выразил благодарность", ar: "التعبير عن الامتنان لشخص ما", hi: "कृतज्ञता व्यक्त करना"
        },
        desc: {
          ja: "家族、同僚、店員などに感謝の気持ちを伝えた。",
          en: "Said 'Thank you' sincerely to family, peers, or staff.",
          zh: "向家人、同事、店員等真誠表達謝意。",
          fr: "Dire merci sincèrement à la famille, aux collègues ou au personnel.",
          it: "Dire grazie sinceramente a famiglia, colleghi o personale.",
          es: "Dar las gracias sinceramente a la familia, compañeros o empleados.",
          de: "Familie, Kollegen oder Servicekräften aufrichtig Danke gesagt.",
          ru: "Искренне поблагодарил близких, коллег или персонал.",
          ar: "قول 'شكراً' بصدق للعائلة أو الزملاء أو العاملين.",
          hi: "परिवार, सहकर्मियों या कर्मचारियों को ईमानदारी से धन्यवाद कहना।"
        }
      },
      {
        id: "m_m_5",
        points: 2,
        category: { ja: "人間関係", en: "Human Relations", zh: "人際關係", fr: "Relations", it: "Relazioni", es: "Relaciones", de: "Beziehungen", ru: "Отношения", ar: "العلاقات الإنسانية", hi: "मानवीय संबंध" },
        name: {
          ja: "他人の良いところを見つけて褒めた", en: "Praised someone's strength", zh: "讚賞他人優點", fr: "Félicité les forces de quelqu'un", it: "Elogiato i punti di forza altrui", es: "Elogiar las virtudes de alguien", de: "Jemandes Stärken gelobt", ru: "Похвалил чьи-то достоинства", ar: "الثناء على نقاط قوة شخص ما", hi: "दूसरों की प्रशंसा करना"
        },
        desc: {
          ja: "人の美点に焦点を当てて直接または心の中で称賛した。",
          en: "Focused on someone's good traits and praised them.",
          zh: "專注於他人的長處，直接或在心中給予讚美。",
          fr: "Se concentrer sur les bons traits de quelqu'un et le féliciter.",
          it: "Concentrarsi sui lati positivi di qualcuno ed elogiarlo.",
          es: "Centrarse en las buenas cualidades de alguien y elogiarle.",
          de: "Sich auf die guten Eigenschaften von jemandem konzentriert und ihn gelobt.",
          ru: "Сконцентрировался на достоинствах человека и похвалил его.",
          ar: "التركيز على الصفات الطيبة لشخص ما والثناء عليه.",
          hi: "किसी के अच्छे गुणों पर ध्यान केंद्रित करना और उसकी प्रशंसा करना।"
        }
      },
      {
        id: "m_m_6",
        points: 2,
        category: { ja: "成長・仕事", en: "Growth & Work", zh: "成長工作", fr: "Croissance & Travail", it: "Crescita & Lavoro", es: "Crecimiento & Trabajo", de: "Wachstum & Arbeit", ru: "Развитие и работа", ar: "النمو والعمل", hi: "विकास और कार्य" },
        name: {
          ja: "読書や勉強などの自己研鑽をした", en: "Spent time studying or reading", zh: "閱讀或學習進行自我提升", fr: "Étudié ou lu pour s'améliorer", it: "Studiato o letto per migliorarsi", es: "Estudiar o leer para mejorar", de: "Gelernt oder gelesen zur Besserung", ru: "Посвятил время учебе или чтению", ar: "قضاء وقت في الدراسة أو القراءة", hi: "अध्ययन या वाचन में समय बिताना"
        },
        desc: {
          ja: "スキルアップや教養のために時間を使った。",
          en: "Invested time in learning new skills or reading books.",
          zh: "為提升技能或充實教養花費時間學習。",
          fr: "Investir du temps pour apprendre ou lire.",
          it: "Investire del tempo per imparare o leggere.",
          es: "Invertir tiempo en aprender o leer.",
          de: "Zeit investiert, um zu lernen oder zu lesen.",
          ru: "Потратил время на приобретение навыков или чтение книг.",
          ar: "استثمار الوقت في التعلم أو القراءة.",
          hi: "कौशल सीखने या किताबें पढ़ने में समय लगाना।"
        }
      },
      {
        id: "m_m_7",
        points: 1,
        category: { ja: "環境・習慣", en: "Environment & Habits", zh: "環境習慣", fr: "Environnement", it: "Ambiente", es: "Entorno", de: "Umgebung & Gewohnheiten", ru: "Окружение и привычки", ar: "البيئة والعادات", hi: "पर्यावरण और आदतें" },
        name: {
          ja: "部屋の掃除や整理整頓をした", en: "Cleaned or organized the room", zh: "打掃或整理房間", fr: "Nettoyé ou rangé la pièce", it: "Pulito o riordinato la stanza", es: "Limpiar u organizar la habitación", de: "Zimmer aufgeräumt oder geputzt", ru: "Убрался или навёл порядок", ar: "تنظيف أو ترتيب الغرفة", hi: "कमरे की सफाई या व्यवस्थित करना"
        },
        desc: {
          ja: "身の回りを清めて、心もすっきりさせる行動をとった。",
          en: "Tidied up surroundings to refresh the mind.",
          zh: "藉由整理周遭環境來使心情保持舒暢。",
          fr: "Ranger son espace pour rafraîchir l'esprit.",
          it: "Riordinare i propri spazi per rinfrescare la mente.",
          es: "Ordenar su espacio para refrescar la mente.",
          de: "Die Umgebung aufgeräumt, um den Geist zu erfrischen.",
          ru: "Прибрал окружающее пространство, чтобы освежить мысли.",
          ar: "ترتيب المكان المحيط لتصفية الذهن.",
          hi: "मन को तरोताजा करने के लिए आसपास की सफाई करना।"
        }
      }
    ],
    demerits: [
      {
        id: "m_d_1",
        points: -1,
        category: { ja: "健康・生活", en: "Health & Life", zh: "健康生活", fr: "Santé & Vie", it: "Salute & Vita", es: "Salud & Vida", de: "Gesundheit & Leben", ru: "Здоровье и жизнь", ar: "الصحة والحياة", hi: "स्वास्थ्य और जीवन" },
        name: {
          ja: "夜更かしをして睡眠不足になった", en: "Stayed up late & lacked sleep", zh: "熬夜導致睡眠不足", fr: "Couché tard & manque de sommeil", it: "Andato a letto tardi & poco sonno", es: "Acostarse tarde y no dormir", de: "Spät ins Bett gegangen & Schlafmangel", ru: "Поздно лег и не выспался", ar: "السهر ونقص النوم", hi: "देर से सोना और नींद की कमी"
        },
        desc: {
          ja: "無意味に遅くまで起きていて、翌日の体調に響かせた。",
          en: "Stayed up late pointlessly, hurting next day's physical state.",
          zh: "無意義地晚睡，影響翌日的精神與體力。",
          fr: "Veiller tard sans raison, nuisant à la journée du lendemain.",
          it: "Fare tardi senza motivo, danneggiando la giornata successiva.",
          es: "Quedarse despierto hasta tarde sin motivo, afectando al día siguiente.",
          de: "Sinnlos lange wach geblieben, was den nächsten Tag beeinträchtigt.",
          ru: "Бессмысленно засиделся допоздна, навредив самочувствию на следующий день.",
          ar: "السهر بلا فائدة مما أثر على نشاط اليوم التالي.",
          hi: "बिना किसी वजह के देर तक जागना, जिससे अगले दिन का स्वास्थ्य प्रभावित हो।"
        }
      },
      {
        id: "m_d_2",
        points: -2,
        category: { ja: "環境・習慣", en: "Environment & Habits", zh: "環境習慣", fr: "Environnement", it: "Ambiente", es: "Entorno", de: "Umgebung & Gewohnheiten", ru: "Окружение и привычки", ar: "البيئة والعادات", hi: "पर्यावरण और आदतें" },
        name: {
          ja: "スマホやSNSをダラダラと見続けた", en: "Wasted time on smartphone/SNS", zh: "沉迷刷手機或社群媒體", fr: "Perdu du temps sur smartphone/Réseaux", it: "Perso tempo su smartphone/Social", es: "Perder tiempo con el móvil/Redes", de: "Zeit am Smartphone/Social Media verschwendet", ru: "Зря тратил время в телефоне/соцсетях", ar: "إضاعة الوقت على الهاتف أو وسائل التواصل", hi: "स्मार्टफोन/सोशल मीडिया पर समय गँवाना"
        },
        desc: {
          ja: "時間を忘れて目的なく画面をスクロールした。",
          en: "Scrolled screens aimlessly and wasted valuable time.",
          zh: "忘記時間，漫無目的地滾動屏幕瀏覽。",
          fr: "Faire défiler les écrans sans but et perdre du temps.",
          it: "Scorrere gli schermi senza meta e perdere tempo prezioso.",
          es: "Deslizar la pantalla sin rumbo y perder tiempo valioso.",
          de: "Ziellos auf Bildschirme geschaut und wertvolle Zeit verschwendet.",
          ru: "Бесцельно листал ленту, тратя драгоценное время.",
          ar: "تصفح الشاشات بلا هدف وإضاعة وقت ثمين.",
          hi: "बिना किसी उद्देश्य के स्क्रीन स्क्रॉल करना और समय गँवाना।"
        }
      },
      {
        id: "m_d_3",
        points: -1,
        category: { ja: "健康・生活", en: "Health & Life", zh: "健康生活", fr: "Santé & Vie", it: "Salute & Vita", es: "Salud & Vida", de: "Gesundheit & Leben", ru: "Здоровье и жизнь", ar: "الصحة والحياة", hi: "स्वास्थ्य और जीवन" },
        name: {
          ja: "暴飲暴食・不健康な食事をした", en: "Overate or ate unhealthy food", zh: "暴飲暴食或飲食不健康", fr: "Suralimentation ou nourriture malsaine", it: "Mangiato troppo o cibo malsano", es: "Comer en exceso o comida poco sana", de: "Überessen oder ungesund gegessen", ru: "Переел или питался вредной пищей", ar: "الإفراط في الأكل أو تناول طعام غير صحي", hi: "अधिक खाना या अस्वस्थ भोजन करना"
        },
        desc: {
          ja: "過度な飲酒、ジャンクフードの食べすぎなど。",
          en: "Consumed excessive alcohol, junk food, or late-night snacks.",
          zh: "過度飲酒、吃太多垃圾食物或宵夜等。",
          fr: "Consommer de l'alcool en excès, de la malbouffe ou des collations tardives.",
          it: "Consumare alcol in eccesso, cibo spazzatura o spuntini notturni.",
          es: "Consumir alcohol en exceso, comida basura o cenar tarde.",
          de: "Übermäßig Alkohol, Junkfood oder späte Snacks konsumiert.",
          ru: "Употреблял алкоголь, джанк-фуд или ел поздно ночью.",
          ar: "تناول الكحول المفرط، الوجبات السريعة، أو وجبات أواخر الليل.",
          hi: "अत्यधिक शराब, जंक फूड, या देर रात भोजन करना।"
        }
      },
      {
        id: "m_d_4",
        points: -1,
        category: { ja: "言葉の過ち", en: "Speech Errors", zh: "言語過失", fr: "Parole", it: "Parola", es: "Habla", de: "Rede", ru: "Речь", ar: "أخطاء اللسان", hi: "वाणी दोष" },
        name: {
          ja: "愚痴や不満、ネガティブ発言をした", en: "Complained or spoke negatively", zh: "抱怨、不滿或說消極的話", fr: "Plaint ou parlé négativement", it: "Lamentato o parlato negativamente", es: "Quejarse o hablar negativamente", de: "Beklagt oder negativ gesprochen", ru: "Жаловался или говорил негативно", ar: "التذمر أو التحدث بسلبية", hi: "शिकायत या नकारात्मक बातें करना"
        },
        desc: {
          ja: "解決策のない愚痴や、場を暗くする不満をこぼした。",
          en: "Uttered pointless complaints that dampened the mood.",
          zh: "發洩毫無建設性的抱怨，使氣氛變得沉悶。",
          fr: "Exprimer des plaintes stériles qui plombent l'ambiance.",
          it: "Esprimere lamentele inutili che rovinano l'atmosfera.",
          es: "Expresar quejas inútiles que estropean el ambiente.",
          de: "Unnötige Beschwerden geäußert, die die Stimmung trüben.",
          ru: "Высказывал бесполезные жалобы, портившие настроение.",
          ar: "التعبير عن شكاوى لا فائدة منها تعكر المزاج.",
          hi: "निरर्थक शिकायतें करना जिससे माहौल खराब हो।"
        }
      },
      {
        id: "m_d_5",
        points: -3,
        category: { ja: "人間関係", en: "Human Relations", zh: "人際關係", fr: "Relations", it: "Relazioni", es: "Relaciones", de: "Beziehungen", ru: "Отношения", ar: "العلاقات الإنسانية", hi: "मानवीय संबंध" },
        name: {
          ja: "他人の陰口や悪口を言った", en: "Spoke ill of someone behind their back", zh: "背後說他人壞話", fr: "Médi ou parlé dans le dos", it: "Parlato alle spalle di qualcuno", es: "Hablar mal de alguien a sus espaldas", de: "Hinter dem Rücken schlecht geredet", ru: "Сплетничал или говорил плохо за спиной", ar: "التحدث بسوء عن شخص من خلف ظهره", hi: "पीठ पीछे किसी की बुराई करना"
        },
        desc: {
          ja: "本人がいない場所で、その人の評判を下げる発言をした。",
          en: "Damaged someone's reputation when they were not present.",
          zh: "在當事人不在場的情況下，說出有損其名譽的話。",
          fr: "Nuire à la réputation de quelqu'un en son absence.",
          it: "Danneggiare la reputazione di qualcuno in sua assenza.",
          es: "Dañar la reputación de alguien en su ausencia.",
          de: "Den Ruf von jemandem in dessen Abwesenheit geschädigt.",
          ru: "Повредил чьей-то репутации в отсутствие человека.",
          ar: "إلحاق الضرر بسمعة شخص ما في غيابه.",
          hi: "अनुपस्थिति में किसी की प्रतिष्ठा को नुकसान पहुँचाना।"
        }
      },
      {
        id: "m_d_6",
        points: -2,
        category: { ja: "成長・仕事", en: "Growth & Work", zh: "成長工作", fr: "Croissance & Travail", it: "Crescita & Lavoro", es: "Crecimiento & Trabajo", de: "Wachstum & Arbeit", ru: "Развитие и работа", ar: "النمو والعمل", hi: "विकास और कार्य" },
        name: {
          ja: "やるべき事を先延ばしにした", en: "Procrastinated on important tasks", zh: "拖延應做的事務", fr: "Procrastiné sur des tâches importantes", it: "Procrastinato su cose importanti", es: "Procrastinar en tareas importantes", de: "Wichtige Aufgaben aufgeschoben", ru: "Откладывал важные дела на потом", ar: "المماطلة في المهام الهامة", hi: "महत्वपूर्ण कार्यों में टालमटोल करना"
        },
        desc: {
          ja: "言い訳をして、やるべきタスクを後回しにした。",
          en: "Put off assignments or chores with excuses.",
          zh: "找藉口拖延應完成的工作或任務。",
          fr: "Reporter les devoirs ou les corvées avec des excuses.",
          it: "Rimandare compiti o faccende con scuse.",
          es: "Posponer tareas o quehaceres con excusas.",
          de: "Aufgaben oder Pflichten mit Ausreden aufgeschoben.",
          ru: "Откладывал поручения или домашние дела под разными предлогами.",
          ar: "تأجيل الواجبات أو الأعمال المنزلية بأعذار.",
          hi: "बहाने बनाकर काम या काम टालना।"
        }
      },
      {
        id: "m_d_7",
        points: -1,
        category: { ja: "環境・習慣", en: "Environment & Habits", zh: "環境習慣", fr: "Environnement", it: "Ambiente", es: "Entorno", de: "Umgebung & Gewohnheiten", ru: "Окружение и привычки", ar: "البيئة والعادات", hi: "पर्यावरण और आदतें" },
        name: {
          ja: "身の回りを散らかしたまま放置した", en: "Left the surroundings messy", zh: "周遭凌亂放任不管", fr: "Laissé l'espace en désordre", it: "Lasciato in disordine lo spazio", es: "Dejar el espacio desordenado", de: "Die Umgebung unordentlich gelassen", ru: "Оставил вещи в беспорядке", ar: "ترك المكان المحيط فوضوياً", hi: "आसपास बिखरा हुआ छोड़ देना"
        },
        desc: {
          ja: "ゴミを捨てない、机の上がごちゃごちゃのままなど。",
          en: "Failed to throw away trash or left desks cluttered.",
          zh: "不丟垃圾、書桌凌亂等放任不管的狀態。",
          fr: "Ne pas jeter les poubelles ou laisser les bureaux encombrés.",
          it: "Non buttare la spazzatura o lasciare le scrivanie ingombre.",
          es: "No tirar la basura o dejar los escritorios desordenados.",
          de: "Müll nicht weggeworfen oder Schreibtische unordentlich gelassen.",
          ru: "Не выбрасывал мусор или оставил стол захламленным.",
          ar: "عدم إلقاء القمامة أو ترك المكاتب غير مرتبة.",
          hi: "कचरा न फेंकना या डेस्क को अस्त-व्यस्त छोड़ना।"
        }
      }
    ]
  }
};
