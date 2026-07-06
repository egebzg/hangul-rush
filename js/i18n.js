// Arayüz metinleri — 3 dil
const UI_STRINGS = {
  tr: {
    subtitle: 'Hangul karakterlerini tanımayı öğren',
    statAccuracy: 'Doğruluk',
    statCount: 'Tamamlanan quiz',
    statWeakest: 'En çok zorlandıkların',
    noWeakYet: 'Henüz belirgin bir zorluk yok',
    sectionCategory: 'Kategori seç',
    sectionLength: 'Soru sayısı',
    sectionDifficulty: 'Zorluk',
    cat_consonants: 'Ünsüzler',
    cat_vowels: 'Sesli harfler',
    cat_doubles: 'Çift ünsüzler',
    cat_diphthongs: 'İkili sesliler',
    diff_basic: 'Temel',
    diff_intermediate: 'Orta',
    diff_advanced: 'İleri',
    diff_custom: 'Kendim seçeyim',
    lenAll: 'Tümü',
    errNoCategory: 'En az bir kategori seç.',
    startBtn: 'Quize başla →',
    homeBtn: '← Ana sayfa',
    progress: 'Soru {i} / {n}',
    score: 'Skor: {s}',
    correct: 'Doğru!',
    wrong: 'Yanlış, doğrusu: {a}',
    nextBtn: 'Sonraki →',
    missedTitle: 'Bu quizde yanlış yaptıkların',
    title90: 'Harika iş!',
    title70: 'İyi gidiyorsun',
    title50: 'Fena değil',
    title0: 'Biraz daha pratik lazım',
    resultDetail: '{s} / {n} doğru',
    retryBtn: 'Tekrar dene ↻'
  },
  en: {
    subtitle: 'Learn to recognize Hangul characters',
    statAccuracy: 'Accuracy',
    statCount: 'Quizzes completed',
    statWeakest: 'Your weakest characters',
    noWeakYet: 'No clear weak spots yet',
    sectionCategory: 'Choose categories',
    sectionLength: 'Number of questions',
    sectionDifficulty: 'Difficulty',
    cat_consonants: 'Consonants',
    cat_vowels: 'Vowels',
    cat_doubles: 'Double consonants',
    cat_diphthongs: 'Diphthongs',
    diff_basic: 'Basic',
    diff_intermediate: 'Intermediate',
    diff_advanced: 'Advanced',
    diff_custom: 'Custom',
    lenAll: 'All',
    errNoCategory: 'Select at least one category.',
    startBtn: 'Start quiz →',
    homeBtn: '← Home',
    progress: 'Question {i} / {n}',
    score: 'Score: {s}',
    correct: 'Correct!',
    wrong: 'Wrong — the answer is: {a}',
    nextBtn: 'Next →',
    missedTitle: 'Missed in this quiz',
    title90: 'Excellent work!',
    title70: 'Nice progress',
    title50: 'Not bad',
    title0: 'Keep practicing',
    resultDetail: '{s} / {n} correct',
    retryBtn: 'Try again ↻'
  },
  ja: {
    subtitle: 'ハングルの文字を覚えよう',            // hanguru no moji wo oboeyou
    statAccuracy: '正解率',                          // seikairitsu
    statCount: 'クイズ回数',                         // kuizu kaisuu
    statWeakest: '苦手な文字',                       // nigate na moji
    noWeakYet: 'まだ苦手な文字はありません',          // mada nigate na moji wa arimasen
    sectionCategory: 'カテゴリーを選ぶ',              // kategorii wo erabu
    sectionLength: '問題数',                         // mondaisuu
    sectionDifficulty: '難易度',                     // nan'ido
    cat_consonants: '子音',                          // shiin
    cat_vowels: '母音',                              // boin
    cat_doubles: '濃音',                             // nouon
    cat_diphthongs: '二重母音',                      // nijuu boin
    diff_basic: '初級',                              // shokyuu
    diff_intermediate: '中級',                       // chuukyuu
    diff_advanced: '上級',                           // joukyuu
    diff_custom: '自分で選ぶ',                       // jibun de erabu
    lenAll: 'すべて',                                // subete
    errNoCategory: 'カテゴリーを1つ以上選んでください', // 1tsu ijou erande kudasai
    startBtn: 'クイズを始める →',                    // kuizu wo hajimeru
    homeBtn: '← ホーム',                             // hoomu
    progress: '問題 {i} / {n}',                      // mondai
    score: 'スコア: {s}',                            // sukoa
    correct: '正解！',                               // seikai!
    wrong: '不正解、正しくは: {a}',                   // fuseikai, tadashiku wa
    nextBtn: '次へ →',                               // tsugi e
    missedTitle: 'このクイズで間違えた文字',          // kono kuizu de machigaeta moji
    title90: 'すごい！',                             // sugoi!
    title70: 'いい調子！',                           // ii choushi!
    title50: 'まずまず',                             // mazumazu
    title0: 'もう少し練習しよう',                     // mou sukoshi renshuu shiyou
    resultDetail: '{s} / {n} 問正解',                // mon seikai
    retryBtn: 'もう一度 ↻'                           // mou ichido
  },
 fr: {
    subtitle: 'Apprends à reconnaître les caractères hangul',
    statAccuracy: 'Précision',
    statCount: 'Quiz terminés',
    statWeakest: 'Tes caractères les plus difficiles',
    noWeakYet: 'Pas encore de point faible notable',
    sectionCategory: 'Choisis les catégories',
    sectionLength: 'Nombre de questions',
    sectionDifficulty: 'Difficulté',
    cat_consonants: 'Consonnes',
    cat_vowels: 'Voyelles',
    cat_doubles: 'Consonnes doubles',
    cat_diphthongs: 'Diphtongues',
    diff_basic: 'Débutant',
    diff_intermediate: 'Intermédiaire',
    diff_advanced: 'Avancé',
    diff_custom: 'Personnalisé',
    lenAll: 'Tout',
    errNoCategory: 'Choisis au moins une catégorie.',
    startBtn: 'Commencer le quiz →',
    homeBtn: '← Accueil',
    progress: 'Question {i} / {n}',
    score: 'Score : {s}',
    correct: 'Correct !',
    wrong: 'Faux — la bonne réponse : {a}',
    nextBtn: 'Suivant →',
    missedTitle: 'Erreurs de ce quiz',
    title90: 'Excellent travail !',
    title70: 'Bien joué !',
    title50: 'Pas mal',
    title0: 'Encore un peu d\'entraînement',
    resultDetail: '{s} / {n} correctes',
    retryBtn: 'Réessayer ↻'
  }
 };