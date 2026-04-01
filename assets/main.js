const pageName = window.location.pathname.split('/').pop() || 'index.html';
const isServicesPage = pageName.includes('services');
const currentLang = document.documentElement.lang || 'en';

const langTargets = {
  index: { ar: '../ar/index.html', he: '../he/index.html', en: '../en/index.html' },
  services: { ar: '../ar/services.html', he: '../he/services.html', en: '../en/services.html' }
};

const uiCopy = {
  ar: {
    home: 'الرئيسية',
    services: 'الخدمات',
    contact: 'تواصل',
    previewTitle: 'الخدمات أصبحت في صفحة مستقلة',
    previewText: 'نقلنا قائمة الخدمات إلى صفحة منفصلة حتى تصبح الصفحة الرئيسية أخف وأسهل في التصفح، مع إبقاء التواصل والتقدير السعري أوضح وأكثر بروزًا.',
    previewButton: 'اذهب إلى صفحة الخدمات',
    tags: ['بحث', 'مقالة', 'مشروع', 'تلخيص'],
    sending: '...جاري الإرسال',
    success: 'تم استلام طلبك! سنتواصل معك قريبًا.',
    error: 'حدث خطأ، حاول مجددًا أو تواصل معنا مباشرة.'
  },
  he: {
    home: 'ראשי',
    services: 'שירותים',
    contact: 'צור קשר',
    previewTitle: 'השירותים עברו לעמוד נפרד',
    previewText: 'העברנו את רשימת השירותים לעמוד ייעודי כדי שדף הבית יהיה נקי וברור יותר, וכדי שיצירת הקשר והפנייה בטלגרם יהיו בולטים יותר.',
    previewButton: 'פתח את עמוד השירותים',
    tags: ['מחקר', 'סמינריון', 'פרויקט', 'סיכום'],
    sending: '...שולח',
    success: 'הבקשה התקבלה! נחזור אליך בקרוב.',
    error: 'אירעה שגיאה. נסה שוב או צור קשר ישירות.'
  },
  en: {
    home: 'Home',
    services: 'Services',
    contact: 'Contact',
    previewTitle: 'Services now have a dedicated page',
    previewText: 'The services list was moved to a separate page so the homepage feels lighter, while the contact form and Telegram action stay more visible.',
    previewButton: 'Open Services Page',
    tags: ['Research', 'Essay', 'Project', 'Summary'],
    sending: 'Sending...',
    success: 'Your request was received. We will contact you soon.',
    error: 'Something went wrong. Please try again or contact us directly.'
  }
};

const copy = uiCopy[currentLang] || uiCopy.en;

// Language switcher
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    const map = isServicesPage ? langTargets.services : langTargets.index;
    if (map[lang]) window.location.href = map[lang];
  });
});

// Logo enhancement
(function upgradeLogo() {
  const sidebarLogo = document.querySelector('.sidebar-logo');
  const logoText = sidebarLogo?.querySelector('.logo-text');
  if (!sidebarLogo || !logoText || sidebarLogo.querySelector('.logo-lockup')) return;

  const logoSub = sidebarLogo.querySelector('.logo-sub');
  const lockup = document.createElement('div');
  lockup.className = 'logo-lockup';

  const mark = document.createElement('div');
  mark.className = 'logo-mark';
  mark.textContent = 'A';

  logoText.parentNode.insertBefore(lockup, logoText);
  lockup.appendChild(mark);
  lockup.appendChild(logoText);
  if (logoSub) sidebarLogo.appendChild(logoSub);
})();

// Inject visible nav tabs
(function injectNav() {
  const topbar = document.querySelector('.topbar');
  if (!topbar || topbar.querySelector('.nav-tabs')) return;

  const langSwitcher = topbar.querySelector('.lang-switcher');
  const actions = topbar.querySelector('.topbar-actions');

  const left = document.createElement('div');
  left.className = 'topbar-left';
  const nav = document.createElement('nav');
  nav.className = 'nav-tabs';
  nav.innerHTML = `
    <a href="index.html" class="nav-tab ${!isServicesPage ? 'active' : ''}">${copy.home}</a>
    <a href="services.html" class="nav-tab ${isServicesPage ? 'active' : ''}">${copy.services}</a>
    <a href="index.html#contact" class="nav-tab">${copy.contact}</a>
  `;
  left.appendChild(nav);

  const right = document.createElement('div');
  right.className = 'topbar-right';
  if (langSwitcher) right.appendChild(langSwitcher);
  if (actions) right.appendChild(actions);

  topbar.innerHTML = '';
  topbar.appendChild(left);
  topbar.appendChild(right);
})();

// Homepage: move subjects to a separate page
(function replaceHomepageServicesSection() {
  if (isServicesPage) return;
  const subjectSection = document.getElementById('subjects');
  const heroBrowseBtn = document.querySelector('.hero-ctas a[href="#subjects"]');
  if (heroBrowseBtn) heroBrowseBtn.setAttribute('href', 'services.html');
  if (!subjectSection || subjectSection.dataset.replaced === '1') return;

  subjectSection.dataset.replaced = '1';
  subjectSection.innerHTML = `
    <div class="services-preview">
      <h3>${copy.previewTitle}</h3>
      <p>${copy.previewText}</p>
      <div class="preview-tags">${copy.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
      <a href="services.html" class="btn btn-primary">${copy.previewButton}</a>
    </div>
  `;
})();

// Homepage: place form and Telegram card next to each other
(function mergeContactAndTelegram() {
  if (isServicesPage) return;
  const contactSection = document.getElementById('contact');
  const formCard = contactSection?.querySelector('.estimator');
  const chatSection = Array.from(document.querySelectorAll('.section')).find(section => section.querySelector('.chat-cta'));
  const chatCta = chatSection?.querySelector('.chat-cta');

  if (!contactSection || !formCard || !chatCta || contactSection.querySelector('.contact-grid')) return;

  const grid = document.createElement('div');
  grid.className = 'contact-grid';

  const side = document.createElement('div');
  side.className = 'contact-side';
  side.appendChild(chatCta);

  grid.appendChild(formCard);
  grid.appendChild(side);
  contactSection.appendChild(grid);

  if (chatSection) chatSection.remove();
})();

// Price estimator
const typeSelect  = document.getElementById('work-type');
const levelSelect = document.getElementById('level');
const pagesRange  = document.getElementById('pages');
const pagesVal    = document.getElementById('pages-val');
const priceOutput = document.getElementById('price-output');

const priceMatrix = {
  essay:       { college: [80,150],   university: [120,220],  graduate: [200,380]  },
  research:    { college: [150,280],  university: [250,450],  graduate: [400,700]  },
  summary:     { college: [50,100],   university: [80,150],   graduate: [120,220]  },
  project:     { college: [200,400],  university: [350,650],  graduate: [600,1100] },
  review:      { college: [100,180],  university: [160,300],  graduate: [250,480]  },
  analysis:    { college: [120,220],  university: [200,380],  graduate: [350,650]  },
  assignment:  { college: [60,120],   university: [100,200],  graduate: [160,320]  },
  presentation:{ college: [80,140],   university: [130,240],  graduate: [200,380]  },
};

function updatePrice() {
  if (!pagesRange || !priceOutput) return;
  const pages = parseInt(pagesRange.value || '5', 10);
  if (pagesVal) pagesVal.textContent = pages;
  const type = typeSelect ? typeSelect.value : 'research';
  const level = levelSelect ? levelSelect.value : 'university';
  const base = (priceMatrix[type] || priceMatrix.research)[level] || [150,300];
  const scale = 1 + (pages - 1) * 0.65;
  const low = Math.round(base[0] * scale / 10) * 10;
  const high = Math.round(base[1] * scale / 10) * 10;
  priceOutput.textContent = `${low}–${high} ₪`;
}

if (typeSelect) typeSelect.addEventListener('change', updatePrice);
if (levelSelect) levelSelect.addEventListener('change', updatePrice);
if (pagesRange) pagesRange.addEventListener('input', updatePrice);
updatePrice();

// Service cards
document.querySelectorAll('.subject-card').forEach(card => {
  card.addEventListener('click', () => {
    const subject = card.dataset.subject;
    if (isServicesPage && subject) {
      window.location.href = `index.html?subject=${encodeURIComponent(subject)}#contact`;
      return;
    }
    const estimatorSection = document.getElementById('estimator');
    if (estimatorSection) estimatorSection.scrollIntoView({ behavior: 'smooth' });
    if (typeSelect && subject && typeSelect.querySelector(`option[value="${subject}"]`)) {
      typeSelect.value = subject;
      updatePrice();
    }
  });
});

(function presetSubjectFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const subject = params.get('subject');
  if (subject && typeSelect && typeSelect.querySelector(`option[value="${subject}"]`)) {
    typeSelect.value = subject;
    updatePrice();
  }
})();

// Localized form submission
const intakeForm = document.getElementById('intake-form');
if (intakeForm) {
  intakeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = intakeForm.querySelector('button[type="submit"]');
    const originalText = btn ? btn.textContent : '';
    if (btn) {
      btn.textContent = copy.sending;
      btn.disabled = true;
    }

    const data = {
      name: document.getElementById('intake-name')?.value || '',
      contact: document.getElementById('intake-contact')?.value || '',
      subject: document.getElementById('intake-subject')?.value || '',
      level: document.getElementById('intake-level')?.value || '',
      details: document.getElementById('intake-details')?.value || '',
      date: new Date().toLocaleString(),
      page: window.location.pathname
    };

    const SHEET_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';

    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      intakeForm.innerHTML = `<div class="success-msg">${copy.success}</div>`;
    } catch {
      if (btn) {
        btn.textContent = originalText;
        btn.disabled = false;
      }
      alert(copy.error);
    }
  });
}
