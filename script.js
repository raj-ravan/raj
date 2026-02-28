// ==================== PRELOADER ====================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 800);
});

// ==================== PARTICLE SYSTEM ====================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.4 + 0.1;
        const colors = ['108,92,231', '162,155,254', '116,185,255', '0,206,201', '253,121,168'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (mouse.x != null) {
            const dx = mouse.x - this.x, dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                this.x -= dx * 0.008;
                this.y -= dy * 0.008;
            }
        }
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
        ctx.fill();
    }
}

const particleCount = Math.min(80, Math.floor(window.innerWidth / 18));
for (let i = 0; i < particleCount; i++) particles.push(new Particle());

function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 130) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(108,92,231,${0.06 * (1 - dist / 130)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ==================== NAVIGATION ====================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Scroll effect
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
    document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 500);
});

// Mobile toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.addEventListener('click', e => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) {
            t.scrollIntoView({ behavior: 'smooth' });
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
function setActive() {
    const sy = window.scrollY + 120;
    sections.forEach(s => {
        if (sy >= s.offsetTop && sy < s.offsetTop + s.offsetHeight) {
            navLinks.forEach(l => {
                l.classList.toggle('active', l.getAttribute('href') === `#${s.id}`);
            });
        }
    });
}
window.addEventListener('scroll', setActive);

// ==================== TYPEWRITER ====================
const words = ['intelligent ML models.', 'beautiful web apps.', 'mobile experiences.', 'integration solutions.', 'the future with code.'];
let wordIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriterText');

function typewrite() {
    const word = words[wordIdx];
    typeEl.textContent = deleting ? word.substring(0, charIdx--) : word.substring(0, charIdx++);
    let delay = deleting ? 40 : 80;
    if (!deleting && charIdx > word.length) { delay = 2000; deleting = true; }
    if (deleting && charIdx < 0) { deleting = false; wordIdx = (wordIdx + 1) % words.length; delay = 400; }
    setTimeout(typewrite, delay);
}
typewrite();

// ==================== TABS ====================
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// ==================== SCROLL REVEAL ====================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));

// ==================== CONTACT FORM ====================
document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    window.location.href = `mailto:rajnarayan8584@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    showToast('Message sent! Check your email client.');
    e.target.reset();
});

// ==================== TOAST ====================
function showToast(msg) {
    const c = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<i class="fas fa-check-circle"></i><span>${msg}</span>`;
    c.appendChild(t);
    setTimeout(() => { t.classList.add('removing'); setTimeout(() => t.remove(), 500); }, 3000);
}

// ==================== BACK TO TOP ====================
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== CREATIVE CURSOR WITH TRAIL ====================
if (window.innerWidth > 968) {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;

    // Create trail particles
    const TRAIL_COUNT = 8;
    const trails = [];
    for (let i = 0; i < TRAIL_COUNT; i++) {
        const t = document.createElement('div');
        t.className = 'cursor-trail';
        document.body.appendChild(t);
        trails.push({ el: t, x: 0, y: 0 });
    }

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });

    (function animCursor() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';

        // Animate trail with staggered delay
        let prevX = mx, prevY = my;
        trails.forEach((t, i) => {
            const speed = 0.25 - (i * 0.02);
            t.x += (prevX - t.x) * speed;
            t.y += (prevY - t.y) * speed;
            t.el.style.left = t.x + 'px';
            t.el.style.top = t.y + 'px';
            t.el.style.opacity = (0.4 - (i * 0.045)).toString();
            t.el.style.width = (5 - i * 0.4) + 'px';
            t.el.style.height = (5 - i * 0.4) + 'px';
            prevX = t.x;
            prevY = t.y;
        });

        requestAnimationFrame(animCursor);
    })();

    // Hover effect on interactive elements
    document.querySelectorAll('a, button, .project-card, .skill-item, .contact-card, .tab-btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            dot.classList.add('hovering');
            ring.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            dot.classList.remove('hovering');
            ring.classList.remove('hovering');
        });
    });
}

// ==================== FOOTER YEAR ====================
document.getElementById('footerYear').textContent = new Date().getFullYear();

console.log('✨ Portfolio loaded successfully!');
