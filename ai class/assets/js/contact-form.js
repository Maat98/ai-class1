/**
 * MATHEWSO — Contact Form Validation & Submission
 * Client-side validation with friendly error messages.
 * Form submission is simulated (no backend); swap the submit
 * handler body for a fetch() call when a backend is available.
 */

(function () {
  'use strict';

  const form       = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn  = document.getElementById('submit-btn');
  const btnText    = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  const successMsg = document.getElementById('form-success');

  /* ---- Helpers ---- */
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + '-error');
    if (field)  field.classList.add('error');
    if (error)  error.textContent = message;
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + '-error');
    if (field)  field.classList.remove('error');
    if (error)  error.textContent = '';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ---- Validate single field on blur ---- */
  ['name', 'email', 'service', 'message'].forEach(id => {
    const field = document.getElementById(id);
    if (!field) return;

    field.addEventListener('blur', () => validateField(id));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) validateField(id);
    });
  });

  function validateField(id) {
    const field = document.getElementById(id);
    if (!field) return true;
    const value = field.value.trim();

    clearError(id);

    if (!value) {
      const labels = {
        name:    'Name is required.',
        email:   'Email address is required.',
        service: 'Please select a service.',
        message: 'Message is required.',
      };
      showError(id, labels[id] || 'This field is required.');
      return false;
    }

    if (id === 'email' && !isValidEmail(value)) {
      showError('email', 'Please enter a valid email address.');
      return false;
    }

    if (id === 'message' && value.length < 20) {
      showError('message', 'Message must be at least 20 characters.');
      return false;
    }

    return true;
  }

  /* ---- Full form validation ---- */
  function validateForm() {
    const fields = ['name', 'email', 'service', 'message'];
    return fields.map(id => validateField(id)).every(Boolean);
  }

  /* ---- Submit handler ---- */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Loading state
    submitBtn.disabled = true;
    btnText.hidden     = true;
    btnLoading.hidden  = false;

    // Simulate network request (replace with real fetch in production)
    await new Promise(resolve => setTimeout(resolve, 1600));

    // Success
    submitBtn.hidden   = true;
    successMsg.hidden  = false;
    form.reset();

    // Scroll success message into view
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

})();
