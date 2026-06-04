// Mentors page
(async function () {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const res = await fetch('/api/mentors');
  const data = await res.json();
  const grid = document.getElementById('mentorsGrid');

  const mentors = (data.mentors || []).map(m => `
    <article class="mentor">
      <div class="mentor-avatar" aria-hidden="true">
        <img src="${m.avatar}" alt="" onerror="this.style.display='none';" />
        <div class="mentor-avatar-fallback">${m.name.split(' ').map(s=>s[0]).slice(0,2).join('')}</div>
      </div>
      <h3>${m.name}</h3>
      <div class="mentor-role">${m.role}</div>
      <p class="muted">${m.bio}</p>
      <div class="meta">
        <span class="pill">${m.experience}</span>
      </div>
      <ul class="list">
        ${(m.skills || []).map(s => `<li>${s}</li>`).join('')}
      </ul>
    </article>
  `);

  grid.innerHTML = mentors.join('');
})();

// Nav toggle
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('nav-open'));
  }
})();

