// --- Custom Cursor Logic ---
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const hoverTargets = document.querySelectorAll('.hover-target');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

// Update mouse coordinates on move
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update main cursor instantly
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Smoothly animate the follower cursor
function animate() {
    // Lerp (Linear Interpolation) for smooth following effect
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    
    requestAnimationFrame(animate);
}
// Start animation loop only if not on a touch device
if (window.matchMedia("(pointer: fine)").matches) {
    animate();
}

// Add interactive classes on hover targets
hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
        follower.classList.add('active');
        cursor.style.transform = 'translate(-50%, -50%) scale(0.3)';
    });
    
    target.addEventListener('mouseleave', () => {
        follower.classList.remove('active');
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});


// --- GSAP Animations ---
gsap.registerPlugin(ScrollTrigger);

// 1. Initial Page Load Animation
const tl = gsap.timeline();

tl.from('.nav-links li, .logo', {
    y: -20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
    delay: 0.2
})
.from('.hero-title .text-reveal', {
    y: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power4.out"
}, "-=0.5")
.from('.hero-subtitle', {
    y: 20,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
}, "-=0.8");


// 2. Project List Scroll Animations
const projects = document.querySelectorAll('.project-item');
projects.forEach((project) => {
    gsap.from(project, {
        scrollTrigger: {
            trigger: project,
            start: "top 90%", // Trigger when top of element hits 90% of viewport
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});


// 3. About Section Text Split & Scroll Animation
// A simple text split logic to make words span to highlight on hover
const aboutText = document.querySelector('.about-text');
if (aboutText) {
    const words = aboutText.innerText.split(' ');
    aboutText.innerHTML = '';
    words.forEach(word => {
        const span = document.createElement('span');
        span.innerText = word + ' ';
        aboutText.appendChild(span);
    });

    gsap.from('.about-text span', {
        scrollTrigger: {
            trigger: '.about',
            start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out"
    });
}


// 4. Contact Section Reveal
gsap.from('.contact-title', {
    scrollTrigger: {
        trigger: '.contact',
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
});

gsap.from('.contact-email', {
    scrollTrigger: {
        trigger: '.contact',
        start: "top 80%",
    },
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power3.out"
});
