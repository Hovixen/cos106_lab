// ===========================================================
// Contact form validation
// Demonstrates: event handling, form validation, DOM manipulation
// ===========================================================

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

const fields = {
  name: { el: document.getElementById('cf-name'), error: document.getElementById('cf-name-error') },
  email: { el: document.getElementById('cf-email'), error: document.getElementById('cf-email-error') },
  phone: { el: document.getElementById('cf-phone'), error: document.getElementById('cf-phone-error') },
  message: { el: document.getElementById('cf-message'), error: document.getElementById('cf-message-error') }
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DIGITS_ONLY = /^\d+$/;

function setError(fieldKey, message) {
  const { el, error } = fields[fieldKey];
  const wrapper = el.closest('.field');
  if (message) {
    wrapper.classList.add('has-error');
    error.textContent = message;
  } else {
    wrapper.classList.remove('has-error');
    error.textContent = '';
  }
}

function validateName() {
  const value = fields.name.el.value.trim();
  if (!value) { setError('name', 'Please enter your name.'); return false; }
  setError('name', '');
  return true;
}

function validateEmail() {
  const value = fields.email.el.value.trim();
  if (!value) { setError('email', 'Please enter your email address.'); return false; }
  if (!EMAIL_PATTERN.test(value)) { setError('email', 'Enter a valid email, like name@example.com.'); return false; }
  setError('email', '');
  return true;
}

function validatePhone() {
  const value = fields.phone.el.value.trim();
  if (!value) { setError('phone', 'Please enter your phone number.'); return false; }
  if (!DIGITS_ONLY.test(value)) { setError('phone', 'Digits only, no spaces or symbols.'); return false; }
  setError('phone', '');
  return true;
}

function validateMessage() {
  const value = fields.message.el.value.trim();
  if (!value) { setError('message', 'Please add a short message.'); return false; }
  setError('message', '');
  return true;
}

// live validation as the person types/leaves a field
fields.name.el.addEventListener('blur', validateName);
fields.email.el.addEventListener('blur', validateEmail);
fields.phone.el.addEventListener('blur', validatePhone);
fields.message.el.addEventListener('blur', validateMessage);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.className = 'form-status';

  const validations = [validateName(), validateEmail(), validatePhone(), validateMessage()];
  const allValid = validations.every(Boolean);

  if (!allValid) {
    status.textContent = 'Please fix the highlighted fields before sending.';
    status.classList.add('error');
    return;
  }

  // Simulated send — no backend is wired up for this static site.
  status.textContent = `Thanks, ${fields.name.el.value.trim()}. Your message has been noted (demo form — no email was actually sent).`;
  status.classList.add('success');
  form.reset();
});
