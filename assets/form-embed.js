(function () {
  const root = document.getElementById('contact-form-root');
  if (!root) return;

  const lang = document.documentElement.lang || 'en';

  const i18n = {
    ar: {
      language: 'Arabic',
      nameLabel: 'الاسم',
      namePlaceholder: 'اسمك الكامل',
      contactLabel: 'تيليجرام أو البريد الإلكتروني',
      contactPlaceholder: '@username أو email@example.com',
      subjectLabel: 'التخصص المختار',
      subjectPlaceholder: 'سيظهر هنا التخصص الذي اخترته',
      detailsLabel: 'تفاصيل الطلب',
      detailsPlaceholder: 'اكتب تفاصيل الطلب، عدد الصفحات، الموعد النهائي، وأي ملاحظات إضافية',
      submit: 'إرسال الطلب'
    },
    he: {
      language: 'Hebrew',
      nameLabel: 'שם',
      namePlaceholder: 'השם המלא שלך',
      contactLabel: 'טלגרם או אימייל',
      contactPlaceholder: '@username או email@example.com',
      subjectLabel: 'התחום שנבחר',
      subjectPlaceholder: 'התחום שבחרת יופיע כאן',
      detailsLabel: 'פרטי הבקשה',
      detailsPlaceholder: 'כתוב את פרטי הבקשה, מספר עמודים, מועד סיום, וכל הערה נוספת',
      submit: 'שלח בקשה'
    },
    en: {
      language: 'English',
      nameLabel: 'Name',
      namePlaceholder: 'Your full name',
      contactLabel: 'Telegram or email',
      contactPlaceholder: '@username or email@example.com',
      subjectLabel: 'Selected field',
      subjectPlaceholder: 'The field you chose will appear here',
      detailsLabel: 'Request details',
      detailsPlaceholder: 'Write your request details, page count, deadline, and any extra notes',
      submit: 'Send request'
    }
  };

  const t = i18n[lang] || i18n.en;

  root.innerHTML = `
    <form id="shared-contact-form" action="https://formspree.io/f/mlgoazpy" method="POST">
      <input type="hidden" name="language" value="${t.language}">

      <input type="hidden" id="form-pages" name="pages" value="5">
      <input type="hidden" id="form-deadline" name="deadline" value="">
      <input type="hidden" id="form-level" name="level" value="">
      <input type="hidden" id="form-workload" name="workload" value="">
      <input type="hidden" id="form-timing" name="timing" value="">
      <input type="hidden" id="form-note" name="estimate_note" value="">
      <input type="hidden" id="form-urgency" name="urgency" value="">

      <label for="contact-name">${t.nameLabel}</label>
      <input type="text" id="contact-name" name="name" placeholder="${t.namePlaceholder}" required>

      <label for="contact-method">${t.contactLabel}</label>
      <input type="text" id="contact-method" name="contact" placeholder="${t.contactPlaceholder}" required>

      <label for="contact-subject">${t.subjectLabel}</label>
      <input type="text" id="contact-subject" name="subject" placeholder="${t.subjectPlaceholder}">

      <label for="contact-details">${t.detailsLabel}</label>
      <textarea id="contact-details" name="details" rows="6" placeholder="${t.detailsPlaceholder}" required></textarea>

      <button type="submit" class="btn btn-primary">${t.submit}</button>
    </form>
  `;
})();
