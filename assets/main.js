// ── LANGUAGE SWITCHER ──
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    const map = { ar: '../ar/index.html', he: '../he/index.html', en: '../en/index.html' };
    if (map[lang]) window.location.href = map[lang];
  });
});

// ── PRICE ESTIMATOR ──
const typeSelect  = document.getElementById('work-type');
const levelSelect = document.getElementById('level');
const pagesRange  = document.getElementById('pages');
const pagesVal    = document.getElementById('pages-val');
const priceOutput = document.getElementById('price-output');

const priceMatrix = {
  essay:      { college: [80,150],   university: [120,220],  graduate: [200,380]  },
  research:   { college: [150,280],  university: [250,450],  graduate: [400,700]  },
  summary:    { college: [50,100],   university: [80,150],   graduate: [120,220]  },
  project:    { college: [200,400],  university: [350,650],  graduate: [600,1100] },
  review:     { college: [100,180],  university: [160,300],  graduate: [250,480]  },
  analysis:   { college: [120,220],  university: [200,380],  graduate: [350,650]  },
  assignment: { college: [60,120],   university: [100,200],  graduate: [160,320]  },
  presentation:{ college: [80,140],  university: [130,240],  graduate: [200,380]  },
};

function updatePrice() {
  if (!pagesRange) return;
  const pages = parseInt(pagesRange.value, 10);
  if (pagesVal) pagesVal.textContent = pages;
  const type  = typeSelect  ? typeSelect.value  : 'research';
  const level = levelSelect ? levelSelect.value : 'university';
  const base  = (priceMatrix[type] || priceMatrix.research)[level] || [150,300];
  const scale = 1 + (pages - 1) * 0.65;
  const low   = Math.round(base[0] * scale / 10) * 10;
  const high  = Math.round(base[1] * scale / 10) * 10;
  if (priceOutput) priceOutput.textContent = `${low}–${high} ₪`;
}

if (typeSelect)  typeSelect.addEventListener('change', updatePrice);
if (levelSelect) levelSelect.addEventListener('change', updatePrice);
if (pagesRange)  pagesRange.addEventListener('input',  updatePrice);
updatePrice();

// ── SUBJECT CARD CLICK ──
document.querySelectorAll('.subject-card').forEach(card => {
  card.addEventListener('click', () => {
    const name = card.querySelector('.subject-name')?.textContent?.trim() || '';
    // Scroll to estimator and pre-select if possible
    const estimatorSection = document.getElementById('estimator');
    if (estimatorSection) estimatorSection.scrollIntoView({ behavior: 'smooth' });
    const subject = card.dataset.subject;
    if (typeSelect && subject) {
      typeSelect.value = subject;
      updatePrice();
    }
  });
});

// ── GOOGLE SHEETS INTAKE FORM ──
const intakeForm = document.getElementById('intake-form');
if (intakeForm) {
  intakeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = intakeForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = '...جاري الإرسال';
    btn.disabled = true;

    const data = {
      name:    document.getElementById('intake-name')?.value    || '',
      contact: document.getElementById('intake-contact')?.value || '',
      subject: document.getElementById('intake-subject')?.value || '',
      level:   document.getElementById('intake-level')?.value   || '',
      details: document.getElementById('intake-details')?.value || '',
      date:    new Date().toLocaleString('ar-IL'),
    };

    // REPLACE THIS URL with your Google Apps Script deployment URL
    const SHEET_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';

    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      intakeForm.innerHTML = '<div class="success-msg">تم استلام طلبك! سنتواصل معك قريبًا.</div>';
    } catch {
      btn.textContent = originalText;
      btn.disabled = false;
      alert('حدث خطأ، حاول مجددًا أو تواصل معنا مباشرة.');
    }
  });
}

