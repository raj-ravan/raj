// ==================== PRELOADER ====================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            preloader.style.display = 'none';
        }, 800);
    }
});

// Fallback: Hide preloader after 3 seconds if page doesn't load
setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('hidden')) {
        preloader.classList.add('hidden');
        preloader.style.display = 'none';
    }
}, 3000);

// ==================== DARK MODE ====================
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference, system preference, or default to 'light'
function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    
    return 'light';
}

const initialTheme = getInitialTheme();
htmlElement.setAttribute('data-theme', initialTheme);

// Function to toggle theme
function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add a subtle animation effect
    themeToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 150);
    
    // Show toast notification
    const themeMessage = newTheme === 'dark' ? '🌙 Dark mode enabled' : '☀️ Light mode enabled';
    showToast(themeMessage);
}

// Toggle theme on button click
themeToggle.addEventListener('click', toggleTheme);

// Keyboard shortcut: Ctrl/Cmd + Shift + D to toggle dark mode
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        toggleTheme();
    }
});

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
        }
    });
}

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
            const targetPosition = t.offsetTop - 80;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            function easeInOutCubic(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }
            
            requestAnimationFrame(animation);
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
    entries.forEach((e, index) => { 
        if (e.isIntersecting) {
            setTimeout(() => {
                e.target.classList.add('revealed');
            }, index * 100); // Stagger effect
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));

// ==================== MAGNETIC BUTTONS ====================
if (window.innerWidth > 768) {
    const magneticButtons = document.querySelectorAll('.btn, .hero-socials a, .project-link');
    
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ==================== PARALLAX EFFECT ====================
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            
            // Parallax for hero elements
            const heroContent = document.querySelector('.hero-content');
            const heroVisual = document.querySelector('.hero-visual');
            const shapes = document.querySelectorAll('.shape');
            
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / 600);
            }
            
            if (heroVisual && scrolled < window.innerHeight) {
                heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
            
            shapes.forEach((shape, index) => {
                if (scrolled < window.innerHeight) {
                    const speed = 0.1 + (index * 0.05);
                    shape.style.transform = `translateY(${scrolled * speed}px)`;
                }
            });
            
            ticking = false;
        });
        
        ticking = true;
    }
});

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
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
});

// Enhanced back to top button behavior near footer
window.addEventListener('scroll', () => {
    const backToTop = document.getElementById('backToTop');
    const footer = document.querySelector('.footer');
    
    if (footer && backToTop) {
        const footerTop = footer.offsetTop;
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Change button style when near footer
        if (scrollY + windowHeight > footerTop + 100) {
            backToTop.style.background = 'var(--clr-accent)';
        } else {
            backToTop.style.background = 'var(--grad-primary)';
        }
    }
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

// ==================== FOOTER ANIMATIONS ====================
// Animate footer elements on scroll into view
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('footer-visible');
        }
    });
}, { threshold: 0.1 });

const footer = document.querySelector('.footer');
if (footer) {
    footerObserver.observe(footer);
}

// Add sparkle effect to footer on scroll
let lastScrollY = window.pageYOffset;
window.addEventListener('scroll', () => {
    const footer = document.querySelector('.footer');
    if (footer) {
        const footerTop = footer.offsetTop;
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        if (scrollY + windowHeight > footerTop) {
            footer.style.opacity = '1';
        }
    }
});

// Add interactive hover effect to footer links
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
});

// ==================== MOBILE DETECTION & OPTIMIZATION ====================
const isMobile = window.innerWidth <= 768;
const isSmallMobile = window.innerWidth <= 480;

// Disable 3D tilt on mobile
if (!isMobile) {
    const tiltCards = document.querySelectorAll('.project-card, .skill-category, .timeline-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    if ((newWidth <= 768 && !isMobile) || (newWidth > 768 && isMobile)) {
        location.reload();
    }
});

// ==================== ANIMATED COUNTER FOR EXPERIENCE BADGE ====================
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };
            
            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
}, observerOptions);

const expNumber = document.querySelector('.exp-number');
if (expNumber) {
    expNumber.setAttribute('data-target', expNumber.textContent.replace('+', ''));
    counterObserver.observe(expNumber);
}

// ==================== RIPPLE EFFECT ON BUTTONS ====================
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

document.querySelectorAll('.btn, .tab-btn, .nav-link').forEach(btn => {
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.addEventListener('click', createRipple);
});

// ==================== TYPING SOUND EFFECT (OPTIONAL) ====================
const typewriterElement = document.getElementById('typewriterText');
let typingSoundEnabled = false; // Set to true if you want sound

function playTypeSound() {
    if (typingSoundEnabled) {
        // Create a subtle click sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
    }
}

// ==================== ENHANCED PARTICLE INTERACTIONS ====================
canvas.addEventListener('click', (e) => {
    // Create burst effect on click
    for (let i = 0; i < 5; i++) {
        const particle = new Particle();
        particle.x = e.clientX;
        particle.y = e.clientY;
        particle.speedX = (Math.random() - 0.5) * 3;
        particle.speedY = (Math.random() - 0.5) * 3;
        particle.size = Math.random() * 3 + 2;
        particles.push(particle);
    }
    
    // Remove extra particles after animation
    setTimeout(() => {
        particles.splice(particles.length - 5, 5);
    }, 2000);
});

// ==================== SCROLL PROGRESS INDICATOR ====================
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #6C5CE7, #A29BFE, #74B9FF);
    z-index: 9999;
    transition: width 0.1s ease;
    width: 0;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

console.log('✨ Portfolio loaded successfully with enhanced animations!');
