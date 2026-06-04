const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

const DATA_DIR = path.join(__dirname, 'data');
const REG_FILE = path.join(DATA_DIR, 'registrations.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(REG_FILE)) fs.writeFileSync(REG_FILE, JSON.stringify({ registrations: [] }, null, 2));
}

ensureDataFile();

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/api/courses', (req, res) => {
  const courses = [
    {
      id: 'web101',
      title: 'Web Development Fundamentals',
      level: 'Beginner',
      duration: '6 weeks',
      description: 'Learn HTML, CSS, and JavaScript basics through hands-on projects.',
      topics: ['HTML', 'CSS', 'JavaScript', 'Projects']
    },
    {
      id: 'py201',
      title: 'Python for Data & Automation',
      level: 'Intermediate',
      duration: '8 weeks',
      description: 'Build automation scripts and analyze small datasets with Python.',
      topics: ['Python', 'Automation', 'Data Basics', 'APIs']
    },
    {
      id: 'cloud301',
      title: 'Cloud Essentials',
      level: 'Intermediate',
      duration: '5 weeks',
      description: 'Understand cloud concepts and deploy simple apps using modern tooling.',
      topics: ['Cloud Concepts', 'Deployment', 'Security Basics', 'Scaling']
    }
  ];

  res.json({ courses });
});

app.get('/api/mentors', (req, res) => {
  const mentors = [
    {
      id: 'm1',
      name: 'Aisha Khan',
      role: 'Frontend Mentor',
      bio: 'Specializes in accessible UI and performance-focused engineering.',
      experience: '7+ years',
      skills: ['React', 'Accessibility', 'CSS Architecture'],
      avatar: '/images/mentor1.png'
    },
    {
      id: 'm2',
      name: 'Daniel Ortiz',
      role: 'Backend Mentor',
      bio: 'Helps students ship robust APIs and clean backend systems.',
      experience: '9+ years',
      skills: ['Node.js', 'REST', 'Testing'],
      avatar: '/images/mentor2.png'
    },
    {
      id: 'm3',
      name: 'Mina Rahman',
      role: 'Career Mentor',
      bio: 'Coaches learners on resumes, interview prep, and project portfolios.',
      experience: '6+ years',
      skills: ['Career Coaching', 'Interview Prep', 'Portfolio'],
      avatar: '/images/mentor3.png'
    }
  ];

  res.json({ mentors });
});

app.post('/api/register', (req, res) => {
  ensureDataFile();

  const { fullName, email, program, mentorId } = req.body || {};

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    return res.status(400).json({ error: 'fullName is required' });
  }
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'valid email is required' });
  }
  if (!program || typeof program !== 'string') {
    return res.status(400).json({ error: 'program is required' });
  }

  const registration = {
    id: `reg_${Date.now()}`,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    program,
    mentorId: mentorId || null,
    createdAt: new Date().toISOString()
  };

  const raw = fs.readFileSync(REG_FILE, 'utf-8');
  const data = JSON.parse(raw);
  data.registrations.push(registration);
  fs.writeFileSync(REG_FILE, JSON.stringify(data, null, 2));

  res.status(201).json({ ok: true, registration });
});

app.listen(PORT, () => {
  console.log(`EduConnect running at http://localhost:${PORT}`);
});

