// Registration page
(async function () {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('nav-open'));

  // Load mentors into select
  const mentorSelect = document.getElementById('mentorSelect');
  try {
    const res = await fetch('/api/mentors');
    const data = await res.json();
    const mentors = data.mentors || [];
    mentorSelect.innerHTML = `<option value="">No preference</option>` +
      mentors.map(m => `<option value="${m.id}">${m.name} (${m.role})</option>`).join('');
  } catch {
    // ignore
  }

  const form = document.getElementById('registerForm');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Submitting...';

    const formData = new FormData(form);
    const payload = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      program: formData.get('program'),
      mentorId: formData.get('mentorId') || null
    };

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        status.textContent = data.error || 'Registration failed.';
        status.classList.add('status-error');
        return;
      }

      status.classList.remove('status-error');
      status.innerHTML = `
        <div class="status-success">Registration successful!</div>
        <div class="muted">Your ID: <b>${data.registration.id}</b></div>
      `;
      form.reset();
    } catch {
      status.textContent = 'Network error. Try again.';
      status.classList.add('status-error');
    }
  });
})();

