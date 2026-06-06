// ============================================================
// RAJ N. MISHRA — PORTFOLIO 2.0 PROJECT DETAIL DATA & SCRIPTS
// Dynamic DOM populating, theme loading, and interactive scripts.
// ============================================================

// 1. PROJECT CASE STUDIES DATASET
const PROJECT_DATA = {
    hospital: {
        id: "hospital",
        title: "Hospital Appointee",
        category: "Web Development",
        tagline: "A comprehensive full-stack healthcare platform optimizing scheduling, role-based workflows, and patient care management.",
        image: "images/project-4.jpg",
        timeline: "Feb 2024 — Apr 2024",
        role: "Full-Stack Developer",
        techSummary: "React, Node.js, Express, MongoDB, JWT",
        overview: "Hospital Appointee is a medical automation ecosystem designed to eliminate scheduling friction and streamline communication between patients, doctors, and system administrators. The project addresses key workflow challenges in healthcare by establishing absolute role-based authority, automated slot coordination, and patient intake tracking within a secure Web environment.",
        features: [
            "Role-Based User Dashboards: Tailored interfaces for Patients (booking, history), Doctors (schedule management, prescriptions), and Admins (staff registration, analytics).",
            "Real-Time Slot Coordination: Dynamically tracks and blocks appointment timings, completely preventing double-bookings.",
            "JWT-Based Security Protocol: Encrypted payload signatures and session tokens to secure electronic medical records (EMR) and private user profiles.",
            "Dynamic Notifications Desk: In-app real-time alerts and email notifications confirming appointment statuses, rescheduling, and doctor availability."
        ],
        techChoices: [
            { name: "React", icon: "fab fa-react", desc: "Constructs modular state-driven interfaces, providing a snappy experience with zero layout lag." },
            { name: "Node.js", icon: "fab fa-node-js", desc: "Executes lightweight asynchronous events handling highly concurrent API booking traffic." },
            { name: "MongoDB", icon: "fas fa-database", desc: "Utilizes flexible schemas to model patients' clinical history and doctor schedules dynamically." }
        ],
        challenge: "Handling concurrent appointment bookings on identical time slots by different patients during high-traffic peaks, which threatened database integrity and schedule collisions.",
        solution: "Implemented optimistic locking schemas on the MongoDB records and wrapped the transaction query execution in robust backend validation middleware that performs atomic operations to ensure only one user can claim a slot.",
        learnings: "Deepened engineering expertise in role-based systems design, full-stack state synchronization, and building resilient transaction architectures for high-traffic environments.",
        github: "https://github.com/raj-ravan/Team-Appointee",
        demo: "#"
    },
    instagram: {
        id: "instagram",
        title: "Instagram Clone",
        category: "Android Development",
        tagline: "A native, highly performant Android replication focusing on fluid layout strategies, state hoisting, and reactive UI architecture.",
        image: "images/project-5.jpg",
        timeline: "Oct 2023 — Dec 2023",
        role: "Android Developer",
        techSummary: "Kotlin, Jetpack Compose, MVVM, Coil",
        overview: "The Instagram Clone is a pixel-perfect mobile application demonstrating advanced capabilities in native Android development. Using Jetpack Compose, this project transitions away from legacy XML view structures to model modular, declarative, and high-performance screens. It focuses heavily on smooth list scroll operations and responsive rendering pipelines.",
        features: [
            "Pixel-Perfect Declarative UI: Beautiful replication of Instagram's home feed, search tab, profile grid, and stories carousel using Jetpack Compose.",
            "Modern Architecture (MVVM): Rigid architectural separation utilizing ViewModels and LiveData/StateFlow to establish clean data bindings.",
            "Lazy Loading media list: Staggered scrolling and high-performance rendering of media items using LazyColumn structures to avoid visual stutter.",
            "Offline Layout Persistence: Internal database caching that saves text metadata and posts feed so contents remain reviewable without network connections."
        ],
        techChoices: [
            { name: "Kotlin", icon: "fab fa-android", desc: "Native language of choice providing clean, expressive syntax and compiler-level thread safety." },
            { name: "Jetpack Compose", icon: "fas fa-cubes", desc: "Modern declarative toolkit providing smooth animations, components reusability, and lightning-fast layouts." },
            { name: "Coil Library", icon: "fas fa-images", desc: "Optimized image loading library designed specifically for Kotlin to handle high-speed media decoding." }
        ],
        challenge: "Experiencing visible lag and high garbage collection spikes when rendering large, high-resolution image feeds during rapid scrolling operations.",
        solution: "Configured custom image memory caches and disk caches using the Coil library, matching image sizes strictly with active device viewports, and implemented scrolling pre-fetch logic to fetch images in advance.",
        learnings: "Mastered declarative UI layout trees, reactive layout patterns, state hoisting strategies, and state-of-the-art Android asset rendering mechanisms.",
        github: "https://github.com/raj-ravan/Instagram_Clone_jetpackCompose",
        demo: "#"
    },
    gfg: {
        id: "gfg",
        title: "GFG Student Club",
        category: "Web Development",
        tagline: "Official community hub built with pristine semantic layouts, micro-interactions, and high-speed client interactions.",
        image: "images/project-1.jpg",
        timeline: "Aug 2023 — Oct 2023",
        role: "Lead Frontend Engineer",
        techSummary: "HTML5, CSS3, Vanilla JS, Gsap",
        overview: "The GeeksforGeeks Student Chapter portal serves as the primary technical hub for Bharati Vidyapeeth University's computer science student network. Built with visual excellence and speed in mind, this lightweight frontend application handles event sign-ups, coding challenge schedules, and aggregates dynamic leaderboard standings.",
        features: [
            "Pristine Semantic HTML5 Layout: Highly optimized structure focusing on screen-reader compatibility and perfect SEO metrics.",
            "Interactive Leaderboards Engine: Fast clientside ranking sort mechanisms tracking student contest performance indicators.",
            "Events Registration Panel: Frictionless multi-step registration forms with clientside input verification.",
            "Bespoke CSS Visual Animations: Fluid hover triggers, glowing glassmorphic panels, and staggered layout fades using modern animations."
        ],
        techChoices: [
            { name: "HTML5 & CSS3", icon: "fab fa-html5", desc: "Establishes a solid, accessible grid layout foundation without bulky structural frameworks." },
            { name: "Vanilla JavaScript", icon: "fab fa-js", desc: "Provides blisteringly fast DOM manipulation and data sorting without external dependencies." },
            { name: "GSAP / Animations", icon: "fas fa-wand-magic-sparkles", desc: "Powers complex interactive scroll behaviors and premium transitions across all sections." }
        ],
        challenge: "Developing a highly visual, fast-loading portal with rich background elements that remains fully functional on extremely poor mobile connectivity.",
        solution: "Eliminated large libraries, minified core CSS/JS assets, leveraged optimized SVG icons, and implemented lazy-loading on secondary images while deferring complex animations on mobile viewports.",
        learnings: "Gained massive experience in building vanilla sites, maximizing Core Web Vitals performance, and executing responsive layouts on various screen profiles.",
        github: "https://github.com/raj-ravan/GFG_SC_bvdudetnm",
        demo: "#"
    },
    transcribott: {
        id: "transcribott",
        title: "Transcribott — Speech to Text",
        category: "Machine Learning",
        tagline: "An automated transcription assistant powered by OpenAI Whisper, designed for batch audio decoding.",
        image: "images/project-6.jpg",
        timeline: "Jun 2023 — Aug 2023",
        role: "ML & Backend Engineer",
        techSummary: "Python, Whisper AI, Flask, Librosa",
        overview: "Transcribott is an intelligent AI system built to decode audio files into formatted text with supreme punctuation accuracy. Leveraging OpenAI's pre-trained Whisper transformer models, this project demonstrates a highly usable web UI integrated with audio normalization, dynamic translation modules, and automated punctuation formatting.",
        features: [
            "AI Speech Decoding: Highly precise, multilingual voice transcription utilizing OpenAI's localized Whisper model parameters.",
            "Batch Files Pipeline: Scalable queue pipeline allowing users to upload and process multi-gigabyte audio tracks sequentially.",
            "Intelligent Text Structuring: Auto-punctuation neural layer that reconstructs spacing, pauses, and formatting constraints.",
            "Multilingual Translation Desk: Automatically detects spoken languages and executes immediate conversions to English text logs."
        ],
        techChoices: [
            { name: "Python", icon: "fab fa-python", desc: "Pristine standard language that integrates perfectly with scientific libraries and PyTorch frameworks." },
            { name: "Whisper AI", icon: "fas fa-brain", desc: "State-of-the-art transformer speech model providing near-human voice recognition accuracy." },
            { name: "Flask", icon: "fas fa-server", desc: "Lightweight API framework designed to dispatch requests and streams transcribed strings back to users." }
        ],
        challenge: "Handling heavy GPU memory allocations and request timeouts when multiple users uploaded large WAV/MP3 files concurrently.",
        solution: "Integrated a Redis queue backed by Celery to decouple heavy transcription workflows from the main web server thread, sending progress updates to the UI via Server-Sent Events (SSE).",
        learnings: "Mastered deploying large transformer neural models locally, organizing asynchronous workers pipelines, and managing dynamic speech preprocessing metrics.",
        github: "https://github.com/Transcribott",
        demo: "#"
    },
    ml: {
        id: "ml",
        title: "Machine Learning Projects",
        category: "Machine Learning",
        tagline: "A comprehensive laboratory of research models focusing on prediction patterns, neural networks, and classifier optimization.",
        image: "images/project-2.jpg",
        timeline: "Jan 2023 — Present",
        role: "Data Scientist & ML Researcher",
        techSummary: "Python, TensorFlow, Scikit-learn, Pandas",
        overview: "This repository represents a structured compilation of research-driven Machine Learning implementations. From standard linear classifications to custom convolutional neural layers, these projects systematically analyze complex datasets, optimize mathematical gradients, and document rigorous performance evaluations.",
        features: [
            "Data Pipeline Workflows: End-to-end data cleaning pipelines performing automated missing values imputation and feature scaling.",
            "Neural Classifier Architectures: Custom CNN structures optimized to execute rapid computer vision classifications.",
            "Hyperparameter Grids Tuning: Systematic validation routines executing cross-validations to extract perfect model metrics.",
            "Dynamic Exploratory Visualizations: Intricate mapping logs showcasing data distribution patterns and model training curves."
        ],
        techChoices: [
            { name: "TensorFlow", icon: "fas fa-robot", desc: "Robust open-source library supporting accelerated deep neural learning and layers configuration." },
            { name: "Scikit-Learn", icon: "fas fa-chart-line", desc: "Standard toolkit providing high-efficiency clustering, classifier models, and metrics analysis." },
            { name: "Pandas & NumPy", icon: "fas fa-table", desc: "Scientific data processing units enabling matrix manipulations and fast vector operations." }
        ],
        challenge: "Overcoming severe model overfitting and variance issues across highly complex, imbalanced datasets with limited samples.",
        solution: "Implemented synthetic dataset oversampling structures (SMOTE), structured cross-validation layers, L2 kernel regularizations, and inserted highly rigorous dropout layers into the neural nets.",
        learnings: "Deepened core mathematical understanding of ML optimization routines, cost functions, structural data splits, and model validation frameworks.",
        github: "https://github.com/raj-ravan/ml-projects",
        demo: "#"
    },
    blockchain: {
        id: "blockchain",
        title: "Distributed Documents Ledger",
        category: "Blockchain",
        tagline: "A secure, decentralized repository utilizing smart contracts and cryptographic hashes for verification tracking.",
        image: "images/project-7.jpg",
        timeline: "Oct 2022 — Dec 2022",
        role: "Smart Contract Architect",
        techSummary: "Solidity, Web3.js, IPFS, Hardhat",
        overview: "The Distributed Documents Ledger is a decentralized Web3 platform built to establish tamper-proof records of legal and educational assets. By encoding file hashes into digital signatures on the blockchain, this platform provides decentralized public proof of document existence and version history without trusting central servers.",
        features: [
            "Secure Smart Contracts: Gas-optimized Solidity contract tracking cryptographic signatures and issuer authorities.",
            "IPFS Decentralized Storage: Stores original heavy document files securely across the IPFS network, keeping local records lean.",
            "Cryptographic Verification Engine: Performs immediate checks by hashing files locally and cross-referencing on-chain parameters.",
            "Web3 Client Connector: Clean UI portal allowing quick wallet connections and secure transactions validation."
        ],
        techChoices: [
            { name: "Solidity", icon: "fab fa-ethereum", desc: "Rigid contract-oriented language designed strictly for Ethereum Virtual Machine bytecode generation." },
            { name: "IPFS Network", icon: "fas fa-network-wired", desc: "High-performance decentralized file storage network to keep system storage completely peer-to-peer." },
            { name: "Web3.js", icon: "fas fa-plug", desc: "Key javascript library managing connection links between the UI portal and Ethereum nodes." }
        ],
        challenge: "Massive gas fee prices associated with storing large document string arrays and files details directly onto the main Ethereum ledger.",
        solution: "Redesigned architecture to generate localized SHA-256 hashes of files on the client-side, storing the original files on IPFS and writing only the 32-byte hash value on-chain.",
        learnings: "Gained significant expertise in Solidity optimizations, EVM execution economics, smart contract security standards, and building distributed systems.",
        github: "#",
        demo: "#"
    }
};

// 2. DOM POPULATING CONTROLLER
function initializeCaseStudy() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    // Default to 'hospital' if missing, or handle invalid ID by redirecting
    if (!projectId || !PROJECT_DATA[projectId]) {
        console.warn(`Project ID '${projectId}' not found. Redirecting to home...`);
        window.location.href = 'index.html';
        return;
    }

    const project = PROJECT_DATA[projectId];

    // Populate Hero Section Elements
    document.getElementById('dynamicCategory').textContent = `04. ${project.category}`;
    document.getElementById('dynamicTitle').textContent = project.title;
    document.getElementById('dynamicTagline').textContent = project.tagline;
    document.getElementById('dynamicTimeline').textContent = project.timeline;
    document.getElementById('dynamicRole').textContent = project.role;
    document.getElementById('dynamicTechSummary').textContent = project.techSummary;

    // Set Hero Image
    const imgEl = document.getElementById('dynamicImage');
    imgEl.src = project.image;
    imgEl.alt = `${project.title} Case Study Graphic`;

    // Populate Overview
    document.getElementById('dynamicOverview').textContent = project.overview;

    // Populate Features
    const featuresList = document.getElementById('dynamicFeatures');
    featuresList.innerHTML = '';
    project.features.forEach(feat => {
        const li = document.createElement('li');

        // Split title and body for nice design
        const parts = feat.split(': ');
        if (parts.length > 1) {
            li.innerHTML = `<i class="fas fa-circle-check"></i> <span><strong>${parts[0]}:</strong> ${parts[1]}</span>`;
        } else {
            li.innerHTML = `<i class="fas fa-circle-check"></i> <span>${feat}</span>`;
        }
        featuresList.appendChild(li);
    });

    // Populate Tech Choices
    const techGrid = document.getElementById('dynamicTechChoices');
    techGrid.innerHTML = '';
    project.techChoices.forEach(tech => {
        const choiceCard = document.createElement('div');
        choiceCard.className = 'tech-choice-card';
        choiceCard.innerHTML = `
            <div class="tech-choice-header">
                <i class="${tech.icon}"></i>
                <span>${tech.name}</span>
            </div>
            <p class="tech-choice-desc">${tech.desc}</p>
        `;
        techGrid.appendChild(choiceCard);
    });

    // Populate Challenges and Learnings
    document.getElementById('dynamicChallenge').textContent = project.challenge;
    document.getElementById('dynamicSolution').textContent = project.solution;
    document.getElementById('dynamicLearnings').textContent = project.learnings;

    // Configure External Links
    const ghLink = document.getElementById('dynamicGithubLink');
    if (project.github && project.github !== '#') {
        ghLink.href = project.github;
        ghLink.style.display = 'inline-flex';
    } else {
        ghLink.style.display = 'none';
    }

    const demoLink = document.getElementById('dynamicDemoLink');
    if (project.demo && project.demo !== '#') {
        demoLink.href = project.demo;
        demoLink.style.display = 'inline-flex';
    } else {
        demoLink.style.display = 'none';
    }

    // Populate Recommendations Section
    renderRecommendations(projectId);

    // Page Title Update
    document.title = `${project.title} Case Study — Raj N. Mishra`;
}

// 3. OTHER STUDIES RECOMMENDATIONS ENGINE
function renderRecommendations(currentId) {
    const recGrid = document.getElementById('dynamicRecommendations');
    recGrid.innerHTML = '';

    // Filter out the current project to find other choices
    const otherProjects = Object.values(PROJECT_DATA).filter(p => p.id !== currentId);

    // Get up to 3 options
    const selections = otherProjects.slice(0, 3);

    selections.forEach((proj, idx) => {
        const card = document.createElement('div');

        // Give the first one the 'featured' styling if we want variance
        card.className = `project-card reveal-up`;
        card.setAttribute('id', `project-${proj.id}`);
        card.innerHTML = `
            <div class="project-image">
                <img src="${proj.image}" alt="${proj.title}">
                <div class="project-overlay" style="gap: 12px;">
                    <a href="${proj.github}" target="_blank" class="project-link" aria-label="View Github Repository" title="View Github Repository">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="project-detail.html?id=${proj.id}" class="project-link" aria-label="Read Case Study" title="Read Case Study">
                        <i class="fas fa-file-alt"></i>
                    </a>
                </div>
            </div>
            <div class="project-info">
                <span class="project-category">${proj.category}</span>
                <h3 class="project-title"><a href="project-detail.html?id=${proj.id}" style="transition: color 0.3s var(--ease);">${proj.title}</a></h3>
                <p class="project-desc">${proj.tagline.substring(0, 100)}... <a href="project-detail.html?id=${proj.id}" class="project-read-more" style="color: var(--clr-primary); font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">Read <i class="fas fa-arrow-right" style="font-size: 0.65rem; transition: transform 0.3s;"></i></a></p>
                <div class="project-tech">
                    ${proj.techSummary.split(', ').slice(0, 3).map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </div>
        `;
        recGrid.appendChild(card);
    });
}

// 4. CORE INTERACTIVE INTERFACE BINDINGS (PORTED FROM MAIN script.js)

// Preloader Trigger
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            preloader.style.display = 'none';
        }, 800);
    }
});
setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('hidden')) {
        preloader.classList.add('hidden');
        preloader.style.display = 'none';
    }
}, 3000);

// Sync Dark/Light Mode Theme
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
}

const initialTheme = getInitialTheme();
htmlElement.setAttribute('data-theme', initialTheme);

function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Scale animation
    themeToggle.style.transform = 'scale(0.95)';
    setTimeout(() => { themeToggle.style.transform = 'scale(1)'; }, 150);

    // Display Toast Notification
    const themeMessage = newTheme === 'dark' ? '🌙 Dark mode enabled' : '☀️ Light mode enabled';
    showToast(themeMessage);
}
themeToggle.addEventListener('click', toggleTheme);

// Particles Background System
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

// Floating Dot & Trail Custom Cursor
if (window.innerWidth > 968) {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;

    // Staggered trail particles
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

    // Cursor hover animations
    function bindCursorHovers() {
        document.querySelectorAll('a, button, .project-card, .tech-choice-card, .btn').forEach(el => {
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

    // Bind after dynamic rendering completes
    setTimeout(bindCursorHovers, 400);
}

// Scroll Indicator progress
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

// Toast notifications
function showToast(msg) {
    const c = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<i class="fas fa-check-circle"></i><span>${msg}</span>`;
    c.appendChild(t);
    setTimeout(() => { t.classList.add('removing'); setTimeout(() => t.remove(), 500); }, 3000);
}

// Back to Top trigger
window.addEventListener('scroll', () => {
    document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 500);
});
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Staggered Scroll Reveal observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e, index) => {
        if (e.isIntersecting) {
            setTimeout(() => {
                e.target.classList.add('revealed');
            }, index * 100);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

// Magnetic hover effects
if (window.innerWidth > 768) {
    const magneticButtons = document.querySelectorAll('.btn, .back-to-grid-btn');
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

// Ripple clicks effect
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
    setTimeout(() => { ripple.remove(); }, 600);
}

// Year controller
document.getElementById('footerYear').textContent = new Date().getFullYear();

// Initialize all bindings & dynamic datasets
document.addEventListener("DOMContentLoaded", () => {
    initializeCaseStudy();

    // Bind Scroll reveals
    setTimeout(() => {
        document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));

        // Add ripple hooks
        document.querySelectorAll('.btn, .back-to-grid-btn').forEach(btn => {
            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            btn.addEventListener('click', createRipple);
        });
    }, 300);
});
