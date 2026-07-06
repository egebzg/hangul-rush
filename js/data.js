// Her öğe: [karakter, romanizasyon]
const HANGUL_DATA = {
  consonants: {
  label: 'Ünsüzler',
  items: [
    ['ㄱ', 'g',  '기역'], ['ㄴ', 'n',  '니은'], ['ㄷ', 'd',  '디귿'],
    ['ㄹ', 'r',  '리을'], ['ㅁ', 'm',  '미음'], ['ㅂ', 'b',  '비읍'],
    ['ㅅ', 's',  '시옷'], ['ㅇ', 'ng', '이응'], ['ㅈ', 'j',  '지읒'],
    ['ㅊ', 'ch', '치읓'], ['ㅋ', 'k',  '키읔'], ['ㅌ', 't',  '티읕'],
    ['ㅍ', 'p',  '피읖'], ['ㅎ', 'h',  '히읗']
  ]
},
doubles: {
  label: 'Çift ünsüzler',
  items: [
    ['ㄲ', 'kk', '쌍기역'], ['ㄸ', 'tt', '쌍디귿'], ['ㅃ', 'pp', '쌍비읍'],
    ['ㅆ', 'ss', '쌍시옷'], ['ㅉ', 'jj', '쌍지읒']
  ]
},
  vowels: {
    label: 'Sesli harfler',
    items: [
      ['ㅏ','a'], ['ㅑ','ya'], ['ㅓ','eo'], ['ㅕ','yeo'],
      ['ㅗ','o'], ['ㅛ','yo'], ['ㅜ','u'], ['ㅠ','yu'],
      ['ㅡ','eu'], ['ㅣ','i']
    ]
  },
  diphthongs: {
    label: 'İkili sesliler',
    items: [
      ['ㅐ','ae'], ['ㅒ','yae'], ['ㅔ','e'], ['ㅖ','ye'],
      ['ㅘ','wa'], ['ㅙ','wae'], ['ㅚ','oe'], ['ㅝ','wo'],
      ['ㅞ','we'], ['ㅟ','wi'], ['ㅢ','ui']
    ]
  }
};
// Zorluk seviyeleri: hangi kategorilerin dahil olduğunu tanımlar
const DIFFICULTY_LEVELS = {
  basic: {
    label: 'Temel',
    cats: ['consonants', 'vowels'],       // 24 temel harf
    maxItems: 15                           // en sık kullanılan ilk 15'i
  },
  intermediate: {
    label: 'Orta',
    cats: ['consonants', 'vowels', 'doubles'],  // + çift ünsüzler
    maxItems: null                          // hepsi
  },
  advanced: {
    label: 'İleri',
    cats: ['consonants', 'vowels', 'doubles', 'diphthongs'],  // her şey
    maxItems: null
  }
};