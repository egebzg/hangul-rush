// ============ DİL (i18n) ============
const LANG_KEY = 'hangul-quiz-lang';
let currentLang = localStorage.getItem(LANG_KEY) || 'en';

function t(key, vars) {
  let str = (UI_STRINGS[currentLang] && UI_STRINGS[currentLang][key]) || UI_STRINGS.tr[key] || key;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => { str = str.replace('{' + k + '}', v); });
  }
  return str;
}

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('.lang-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.lang === lang)
  );
}

document.getElementById('lang-switch').addEventListener('click', e => {
  const btn = e.target.closest('.lang-btn');
  if (btn) applyLanguage(btn.dataset.lang);
});

// ============ SES (Web Speech API) ============
let koreanVoice = null;

function refreshKoreanVoice() {
  koreanVoice = speechSynthesis.getVoices().find(v => v.lang.startsWith('ko')) || null;
  document.querySelectorAll('.audio-only').forEach(el =>
    el.classList.toggle('hidden', !koreanVoice)
  );
}

if ('speechSynthesis' in window) {
  refreshKoreanVoice();
  speechSynthesis.onvoiceschanged = refreshKoreanVoice;
}

function speakKorean(text) {
  if (!koreanVoice) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.voice = koreanVoice;
  utter.lang = 'ko-KR';
  utter.rate = 0.8;
  speechSynthesis.speak(utter);
}

// ============ İSTATİSTİK (localStorage) ============
const STORAGE_KEY = 'hangul-quiz-stats-v1';

function loadStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { letters: {}, history: [] };
  } catch (e) {
    return { letters: {}, history: [] };
  }
}

function saveStats(stats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) { /* gizli mod vs. */ }
}

function recordAnswer(stats, char, correct) {
  if (!stats.letters[char]) stats.letters[char] = { correct: 0, wrong: 0 };
  if (correct) stats.letters[char].correct++;
  else stats.letters[char].wrong++;
}

function recordQuizResult(stats, score, total) {
  stats.history.push({ date: new Date().toISOString(), score, total });
  if (stats.history.length > 200) stats.history.shift();
}

function computeOverview(stats) {
  let correct = 0, wrong = 0;
  Object.values(stats.letters).forEach(l => { correct += l.correct; wrong += l.wrong; });
  const attempts = correct + wrong;
  const accuracy = attempts ? Math.round((correct / attempts) * 100) : null;
  const weakest = Object.entries(stats.letters)
    .map(([char, v]) => ({
      char,
      attempts: v.correct + v.wrong,
      wrong: v.wrong,
      ratio: v.wrong / (v.correct + v.wrong)
    }))
    .filter(w => w.attempts >= 2 && w.wrong > 0)
    .sort((a, b) => b.ratio - a.ratio || b.wrong - a.wrong)
    .slice(0, 5);
  return { accuracy, quizzesTaken: stats.history.length, weakest };
}

// ============ YARDIMCILAR ============
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ============ DURUM (state) ============
let stats = loadStats();
const state = {
  selectedCats: new Set(),
  length: '20',
  pool: [],
  queue: [],
  idx: 0,
  score: 0,
  answered: false,
  sessionMissed: {}
};

// ============ DOM REFERANSLARI ============
const screens = {
  home: document.getElementById('screen-home'),
  quiz: document.getElementById('screen-quiz'),
  results: document.getElementById('screen-results')
};
const statsOverviewEl = document.getElementById('stats-overview');
const statAccuracyEl = document.getElementById('stat-accuracy');
const statCountEl = document.getElementById('stat-count');
const weakChipsEl = document.getElementById('weak-chips');
const categoryChipsEl = document.getElementById('category-chips');
const difficultyChipsEl = document.getElementById('difficulty-chips');
const lengthChipsEl = document.getElementById('length-chips');
const setupErrorEl = document.getElementById('setup-error');
const startBtn = document.getElementById('start-btn');
const progressLabelEl = document.getElementById('progress-label');
const scoreLabelEl = document.getElementById('score-label');
const progressFillEl = document.getElementById('progress-fill');
const letterCharEl = document.getElementById('letter-char');
const optionsGridEl = document.getElementById('options-grid');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const homeBtn = document.getElementById('home-btn');
const resultsTitleEl = document.getElementById('results-title');
const resultsScoreEl = document.getElementById('results-score');
const resultsDetailEl = document.getElementById('results-detail');
const missedBlockEl = document.getElementById('missed-block');
const missedChipsEl = document.getElementById('missed-chips');
const resultsHomeBtn = document.getElementById('results-home-btn');
const retryBtn = document.getElementById('retry-btn');
const speakBtn = document.getElementById('speak-btn');

// ============ EKRAN GEÇİŞİ ============
function switchScreen(name) {
  Object.values(screens).forEach(s => s.classList.add('hidden'));
  screens[name].classList.remove('hidden');
}

// ============ ANA SAYFA ============
function renderStatsOverview() {
  const ov = computeOverview(stats);
  if (ov.quizzesTaken === 0) {
    statsOverviewEl.classList.add('hidden');
    return;
  }
  statsOverviewEl.classList.remove('hidden');
  statAccuracyEl.textContent = ov.accuracy + '%';
  statCountEl.textContent = ov.quizzesTaken;
  weakChipsEl.innerHTML = '';
  if (ov.weakest.length === 0) {
    const span = document.createElement('span');
    span.className = 'weak-chip';
    span.textContent = t('noWeakYet');
    weakChipsEl.appendChild(span);
  } else {
    ov.weakest.forEach(w => {
      const span = document.createElement('span');
      span.className = 'weak-chip';
      span.textContent = w.char;
      weakChipsEl.appendChild(span);
    });
  }
}

// Kategori seçimi (çoklu seçim)
categoryChipsEl.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    chip.classList.toggle('active');
    const cat = chip.dataset.cat;
    if (chip.classList.contains('active')) state.selectedCats.add(cat);
    else state.selectedCats.delete(cat);
    setupErrorEl.classList.add('hidden');
  });
});

// Zorluk seçimi
difficultyChipsEl.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    difficultyChipsEl.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    const diff = chip.dataset.diff;
    if (diff === 'custom') return;

    const level = DIFFICULTY_LEVELS[diff];
    state.selectedCats.clear();
    categoryChipsEl.querySelectorAll('.chip').forEach(catChip => {
      const isIncluded = level.cats.includes(catChip.dataset.cat);
      catChip.classList.toggle('active', isIncluded);
      if (isIncluded) state.selectedCats.add(catChip.dataset.cat);
    });
    setupErrorEl.classList.add('hidden');
  });
});

// Soru sayısı (tekli seçim)
lengthChipsEl.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    lengthChipsEl.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    state.length = chip.dataset.len;
  });
});
lengthChipsEl.querySelector('[data-len="20"]').classList.add('active');

startBtn.addEventListener('click', () => {
  if (state.selectedCats.size === 0) {
    setupErrorEl.classList.remove('hidden');
    return;
  }
  buildPoolAndStart();
});

// ============ QUIZ MOTORU ============
function buildPoolAndStart() {
  let items = [];
  state.selectedCats.forEach(cat => { items = items.concat(HANGUL_DATA[cat].items); });
  state.pool = items;

  const shuffled = shuffle(items);
  const len = state.length === 'all'
    ? shuffled.length
    : Math.min(shuffled.length, parseInt(state.length, 10));
  state.queue = shuffled.slice(0, len);
  state.idx = 0;
  state.score = 0;
  state.sessionMissed = {};

  switchScreen('quiz');
  renderQuestion();
}

function renderQuestion() {
  state.answered = false;
  progressLabelEl.textContent = t('progress', { i: state.idx + 1, n: state.queue.length });
  scoreLabelEl.textContent = t('score', { s: state.score });
  progressFillEl.style.width = (state.idx / state.queue.length * 100) + '%';

  const [char, correct] = state.queue[state.idx];
  letterCharEl.textContent = char;

  const distractSource = state.pool.filter(p => p[1] !== correct);
  const distractors = shuffle(distractSource).slice(0, 3).map(p => p[1]);
  const options = shuffle([correct, ...distractors]);

  optionsGridEl.innerHTML = '';
  options.forEach(opt => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'option-btn';
    b.textContent = opt;
    b.addEventListener('click', () => checkAnswer(b, opt, correct, char));
    optionsGridEl.appendChild(b);
  });

  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';
  nextBtn.classList.add('hidden');
}

function checkAnswer(btn, chosen, correct, char) {
  if (state.answered) return;
  state.answered = true;

  const buttons = Array.from(optionsGridEl.children);
  buttons.forEach(b => { b.disabled = true; });

  const isCorrect = chosen === correct;
  recordAnswer(stats, char, isCorrect);
  saveStats(stats);

  if (isCorrect) {
    state.score++;
    btn.classList.add('correct');
    feedbackEl.textContent = t('correct');
    feedbackEl.classList.add('correct');
  } else {
    btn.classList.add('wrong');
    const correctBtn = buttons.find(b => b.textContent === correct);
    if (correctBtn) correctBtn.classList.add('correct');
    feedbackEl.textContent = t('wrong', { a: correct });
    feedbackEl.classList.add('wrong');
    state.sessionMissed[char] = correct;
  }

  scoreLabelEl.textContent = t('score', { s: state.score });

  const item = state.queue[state.idx];
  speakKorean(item[2] || item[0]);

  nextBtn.classList.remove('hidden');
  nextBtn.focus();
}

nextBtn.addEventListener('click', () => {
  state.idx++;
  if (state.idx >= state.queue.length) finishQuiz();
  else renderQuestion();
});

function finishQuiz() {
  progressFillEl.style.width = '100%';
  recordQuizResult(stats, state.score, state.queue.length);
  saveStats(stats);

  switchScreen('results');
  const pct = Math.round((state.score / state.queue.length) * 100);
  let title;
  if (pct >= 90) title = t('title90');
  else if (pct >= 70) title = t('title70');
  else if (pct >= 50) title = t('title50');
  else title = t('title0');

  resultsTitleEl.textContent = title;
  resultsScoreEl.textContent = pct + '%';
  resultsDetailEl.textContent = t('resultDetail', { s: state.score, n: state.queue.length });

  const missedEntries = Object.entries(state.sessionMissed);
  if (missedEntries.length) {
    missedBlockEl.classList.remove('hidden');
    missedChipsEl.innerHTML = '';
    missedEntries.forEach(([char, correct]) => {
      const span = document.createElement('span');
      span.className = 'weak-chip';
      span.textContent = char + ' → ' + correct;
      missedChipsEl.appendChild(span);
    });
  } else {
    missedBlockEl.classList.add('hidden');
  }
}

homeBtn.addEventListener('click', () => { switchScreen('home'); renderStatsOverview(); });
resultsHomeBtn.addEventListener('click', () => { switchScreen('home'); renderStatsOverview(); });
retryBtn.addEventListener('click', buildPoolAndStart);

speakBtn.addEventListener('click', e => {
  e.stopPropagation();
  const item = state.queue[state.idx];
  speakKorean(item[2] || item[0]);
});

// ============ KLAVYE KISAYOLLARI ============
document.addEventListener('keydown', e => {
  if (!screens.quiz.classList.contains('hidden')) {
    if (!state.answered && ['1', '2', '3', '4'].includes(e.key)) {
      const btn = optionsGridEl.children[parseInt(e.key, 10) - 1];
      if (btn) btn.click();
    } else if (e.key === 'Enter' && !nextBtn.classList.contains('hidden')) {
      nextBtn.click();
    }
  }
});

// ============ BAŞLANGIÇ ============
applyLanguage(currentLang);
renderStatsOverview();