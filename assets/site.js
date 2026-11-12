// alinnitu.com — small progressive enhancements. The site works without this file.
(function () {
  // Header gets a hairline once the page scrolls.
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Close the mobile menu after choosing a link.
  document.querySelectorAll('.menu').forEach(function (menu) {
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) menu.removeAttribute('open');
    });
  });

  // Contact form → Web3Forms (https://web3forms.com). The access key is public by design.
  var form = document.getElementById('contact-form');
  if (!form) return;
  var ACCESS_KEY = '6dd8d9cc-0bea-4bed-8abc-8c44d34db79d';
  var status = form.querySelector('.form-status');
  var button = form.querySelector('button[type="submit"]');
  var done = document.getElementById('form-done');
  var label = button.textContent;

  function fail(field, message) {
    status.textContent = message;
    if (field) { field.setAttribute('aria-invalid', 'true'); field.focus(); }
  }

  form.addEventListener('input', function (e) {
    if (e.target.hasAttribute('aria-invalid')) e.target.removeAttribute('aria-invalid');
    status.textContent = '';
  });

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (button.disabled) return;
    var data = new FormData(form);
    if (data.get('botcheck')) return; // honeypot
    var name = String(data.get('name') || '').trim();
    var email = String(data.get('email') || '').trim();
    var message = String(data.get('message') || '').trim();
    var topic = String(data.get('topic') || 'Something else');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail(form.elements.email, 'Add a valid email so I can reply.');
    if (!message) return fail(form.elements.message, 'Add a short message first.');

    button.disabled = true;
    button.textContent = 'Sending…';
    status.textContent = '';
    try {
      var res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: '[alinnitu.com] ' + topic + (name ? ' · ' + name : ''),
          from_name: 'alinnitu.com contact form',
          name: name,
          email: email,
          topic: topic,
          message: message
        })
      });
      var json = {};
      try { json = await res.json(); } catch (_) {}
      if (!res.ok || !json.success) throw new Error(json.message || 'Request failed (' + res.status + ')');
      form.reset();
      form.hidden = true;
      done.hidden = false;
      done.querySelector('h3').focus();
    } catch (err) {
      console.error('Contact form error:', err);
      fail(null, 'Could not send just now. Please try again, or email me directly.');
    } finally {
      button.disabled = false;
      button.textContent = label;
    }
  });

  var again = done && done.querySelector('button');
  if (again) again.addEventListener('click', function () {
    done.hidden = true;
    form.hidden = false;
    form.elements.name.focus();
  });
})();
