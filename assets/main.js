const langMap = {
  ar: '../ar/index.html',
  he: '../he/index.html',
  en: '../en/index.html'
};

document.querySelectorAll('.lang-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    if (langMap[lang]) window.location.href = langMap[lang];
  });
});

const pagesInput = document.getElementById('pages');
const deadlineInput = document.getElementById('deadline');
const levelInput = document.getElementById('level');

const pagesValue = document.getElementById('pages-value');
const workloadValue = document.getElementById('workload-value');
const timingValue = document.getElementById('timing-value');
const noteValue = document.getElementById('note-value');
const urgencyValue = document.getElementById('urgency-value');

const formPages = document.getElementById('form-pages');
const formDeadline = document.getElementById('form-deadline');
const formLevel = document.getElementById('form-level');
const formWorkload = document.getElementById('form-workload');
const formTiming = document.getElementById('form-timing');
const formNote = document.getElementById('form-note');
const formUrgency = document.getElementById('form-urgency');

function getCopy(lang) {
  const map = {
    ar: {
      low: 'نطاق خفيف',
      medium: 'نطاق متوسط',
      high: 'نطاق كبير',
      standard: 'إطار مريح',
      tight: 'إطار ضيق',
      urgent: 'عاجل',
      noteEasy: 'مناسب للأعمال القصيرة مع تعليمات واضحة.',
      noteMid: 'يفضّل إرسال التعليمات الكاملة مبكرًا.',
      noteHard: 'يُنصح بالتواصل المباشر سريعًا لإدارة الوقت.',
      urgencyStandard: 'يمكن التخطيط بهدوء',
      urgencyTight: 'يحتاج بدءًا سريعًا',
      urgencyUrgent: 'الأولوية للتواصل المباشر',
      pagesSuffix: 'صفحات'
    },
    he: {
      low: 'היקף קל',
      medium: 'היקף בינוני',
      high: 'היקף רחב',
      standard: 'מסגרת נוחה',
      tight: 'מסגרת צפופה',
      urgent: 'דחוף',
      noteEasy: 'מתאים לעבודות קצרות עם הנחיות ברורות.',
      noteMid: 'עדיף לשלוח את כל ההנחיות מוקדם.',
      noteHard: 'מומלץ ליצור קשר ישיר במהירות כדי לנהל זמן.',
      urgencyStandard: 'אפשר לתכנן בנחת',
      urgencyTight: 'דורש התחלה מהירה',
      urgencyUrgent: 'עדיפות לפנייה ישירה',
      pagesSuffix: 'עמודים'
    },
    en: {
      low: 'Light scope',
      medium: 'Medium scope',
      high: 'Extended scope',
      standard: 'Comfortable timeline',
      tight: 'Tight timeline',
      urgent: 'Urgent',
      noteEasy: 'Suitable for shorter work with clear instructions.',
      noteMid: 'It is better to send the full instructions early.',
      noteHard: 'Direct contact is recommended to manage timing.',
      urgencyStandard: 'Can be planned calmly',
      urgencyTight: 'Needs a fast start',
      urgencyUrgent: 'Direct contact is the priority',
      pagesSuffix: 'pages'
    }
  };

  return map[lang] || map.en;
}

function updateEstimate() {
  if (!pagesInput || !deadlineInput || !levelInput) return;

  const copy = getCopy(document.documentElement.lang || 'en');
  const pages = parseInt(pagesInput.value || '5', 10);
  const deadline = deadlineInput.value;
  const level = levelInput.value;

  if (pagesValue) {
    pagesValue.textContent = `${pages} ${copy.pagesSuffix}`;
  }

  let workload = copy.low;
  if (pages >= 8 || level === 'graduate') workload = copy.medium;
  if (pages >= 14 || (level === 'graduate' && pages >= 10)) workload = copy.high;

  let timing = copy.standard;
  if (deadline === '3-7') timing = copy.tight;
  if (deadline === '24-72') timing = copy.urgent;

  let note = copy.noteEasy;
  if (workload === copy.medium || timing === copy.tight) note = copy.noteMid;
  if (workload === copy.high || timing === copy.urgent) note = copy.noteHard;

  let urgency = copy.urgencyStandard;
  if (deadline === '3-7') urgency = copy.urgencyTight;
  if (deadline === '24-72') urgency = copy.urgencyUrgent;

  if (workloadValue) workloadValue.textContent = workload;
  if (timingValue) timingValue.textContent = timing;
  if (noteValue) noteValue.textContent = note;
  if (urgencyValue) urgencyValue.textContent = urgency;

  if (formPages) formPages.value = String(pages);
  if (formDeadline) formDeadline.value = deadline;
  if (formLevel) formLevel.value = level;
  if (formWorkload) formWorkload.value = workload;
  if (formTiming) formTiming.value = timing;
  if (formNote) formNote.value = note;
  if (formUrgency) formUrgency.value = urgency;
}

if (pagesInput) pagesInput.addEventListener('input', updateEstimate);
if (deadlineInput) deadlineInput.addEventListener('change', updateEstimate);
if (levelInput) levelInput.addEventListener('change', updateEstimate);

updateEstimate();

document.querySelectorAll('[data-subject]').forEach((card) => {
  card.addEventListener('click', () => {
    const subject = card.dataset.subject || '';
    const field = document.getElementById('contact-subject');
    const contact = document.getElementById('contact');

    if (field) field.value = subject;
    if (contact) contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
