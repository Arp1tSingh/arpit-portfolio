// Mobile navigation
const menuToggle = document.querySelector('#menu-toggle');
const navLinks = document.querySelector('#primary-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navLinks.classList.toggle('open', !isOpen);
});

// Close the mobile menu after choosing a section.
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  });
});

// Reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

// Keep the footer year current.
document.querySelector('#year').textContent = new Date().getFullYear();

// Copy the contact email to the clipboard.
const copyButton = document.querySelector('#copy-email');
const copyFeedback = document.querySelector('#copy-feedback');

copyButton.addEventListener('click', async () => {
  const email = copyButton.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    copyFeedback.textContent = 'Email copied to clipboard.';
  } catch (error) {
    copyFeedback.textContent = `Copy unavailable. Email: ${email}`;
  }
});
