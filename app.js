// Shared UI: nav toggle + footer year
(function () {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('nav-open');
    });
  }
})();

async function fetchCourses() {
  const res = await fetch('/api/courses');
  if (!res.ok) throw new Error('Failed to fetch courses');
  const data = await res.json();
  return data.courses || [];
}

function courseCard(course) {
  return `
    <article class="card">
      <h3>${course.title}</h3>
      <div class="meta">
        <span class="pill">${course.level}</span>
        <span class="pill pill-muted">${course.duration}</span>
      </div>
      <p class="muted">${course.description}</p>
      <ul class="list">
        ${(course.topics || []).map(t => `<li>${t}</li>`).join('')}
      </ul>
      <a class="link" href="/register.html">Register</a>
    </article>
  `;
}

// Home page render
(async function () {
  const grid = document.getElementById('coursesGrid');
  if (!grid) return;
  try {
    const courses = await fetchCourses();
    grid.innerHTML = courses.map(courseCard).join('');
  } catch (e) {
    grid.innerHTML = `<div class="status">Could not load courses.</div>`;
  }
})();

