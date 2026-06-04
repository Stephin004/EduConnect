// Courses page
(async function () {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const res = await fetch('/api/courses');
  const data = await res.json();
  const grid = document.getElementById('coursesGrid');

  const cards = (data.courses || []).map(c => `
    <article class="card">
      <h3>${c.title}</h3>
      <div class="meta">
        <span class="pill">${c.level}</span>
        <span class="pill pill-muted">${c.duration}</span>
      </div>
      <p class="muted">${c.description}</p>
      <ul class="list">
        ${(c.topics || []).map(t => `<li>${t}</li>`).join('')}
      </ul>
      <a class="link" href="/register.html">Register for this</a>
    </article>
  `);

  grid.innerHTML = cards.join('');
})();

// Nav toggle
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('nav-open'));
  }
})();

