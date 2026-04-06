(function () {
  const form = document.getElementById('shared-contact-form');
  if (!form) return;

  const lang = document.documentElement.lang || 'en';

  const messages = {
    ar: {
      sending: 'جاري الإرسال...',
      success: 'شكرًا لك، تم إرسال طلبك بنجاح. سنتواصل معك قريبًا.',
      error: 'حدث خطأ أثناء الإرسال. حاول مرة أخرى أو تواصل عبر تيليجرام.'
    },
    he: {
      sending: 'שולח...',
      success: 'תודה, הבקשה שלך נשלחה בהצלחה. נחזור אליך בקרוב.',
      error: 'אירעה שגיאה בשליחה. נסה שוב או פנה דרך טלגרם.'
    },
    en: {
      sending: 'Sending...',
      success: 'Thank you, your request was sent successfully. We will contact you soon.',
      error: 'There was an error sending your request. Please try again or use Telegram.'
    }
  };

  const text = messages[lang] || messages.en;
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = text.sending;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Form submit failed');

      form.innerHTML = `<div class="success-msg">${text.success}</div>`;
    } catch (error) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;

      const oldError = form.querySelector('.form-error-msg');
      if (oldError) oldError.remove();

      const errorBox = document.createElement('div');
      errorBox.className = 'file-note form-error-msg';
      errorBox.textContent = text.error;
      form.appendChild(errorBox);
    }
  });
})();

