// Mobile nav toggle
const toggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('nav-mobile');

if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// Mark active nav link based on current page
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Contact form: submit to Web3Forms and show confirmation
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.form__submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    const data = new FormData(form);
    data.append('access_key', '9cdde2a7-7681-409f-bb66-047eab74b2fc');
    data.append('subject', 'New Contact Form Submission — Mindgenie Inc');
    data.append('from_name', 'Mindgenie Inc Website');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      const json = await res.json();
      if (json.success) {
        btn.textContent = 'Message sent.';
        btn.style.opacity = '0.5';
        btn.style.cursor = 'default';
        form.reset();
      } else {
        btn.textContent = 'Send message';
        btn.disabled = false;
        alert('Something went wrong. Please try again or email us directly.');
      }
    } catch {
      btn.textContent = 'Send message';
      btn.disabled = false;
      alert('Something went wrong. Please try again or email us directly.');
    }
  });
}
