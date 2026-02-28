/**
 * GSAP Animations Module
 * All scroll-triggered animations and the hero entrance animation.
 */
window.ResumeApp = window.ResumeApp || {};

/**
 * Hero section entrance animation.
 * Exposed on the namespace so loading.js can call it after dismiss.
 */
window.ResumeApp.animateHero = function () {
    const heroEls = document.querySelectorAll('[data-animate="hero"]');
    gsap.fromTo(heroEls, {
        y: 60, opacity: 0, visibility: 'hidden',
    }, {
        y: 0, opacity: 1, visibility: 'visible',
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
    });

    // Social icons — animate without visibility:hidden so they stay clickable
    const socialEls = document.querySelectorAll('[data-animate="hero-social"]');
    gsap.fromTo(socialEls, {
        y: 30, opacity: 0,
    }, {
        y: 0, opacity: 1,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out',
    });
};

/**
 * Initialize all GSAP scroll-triggered animations.
 */
window.ResumeApp.initGSAPAnimations = function () {

    // ===== SCROLL PROGRESS BAR =====
    gsap.to('.scroll-progress', {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
        }
    });

    // ===== ABOUT SECTION =====
    gsap.from('[data-animate="about-left"]', {
        x: -100, opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#about',
            start: 'top 75%',
            toggleActions: 'play none none none',
        },
        onStart: function () {
            document.querySelector('[data-animate="about-left"]').style.visibility = 'visible';
        }
    });

    gsap.from('[data-animate="about-right"]', {
        x: 100, opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#about',
            start: 'top 75%',
            toggleActions: 'play none none none',
        },
        onStart: function () {
            document.querySelector('[data-animate="about-right"]').style.visibility = 'visible';
        }
    });

    // Language bars animation
    document.querySelectorAll('.lang-bar').forEach(bar => {
        const width = bar.dataset.width;
        bar.style.width = '0%';
        gsap.to(bar, {
            width: width + '%',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: bar,
                start: 'top 85%',
                toggleActions: 'play none none none',
            }
        });
    });

    // ===== EXPERIENCE SECTION =====
    gsap.utils.toArray('[data-animate="experience"]').forEach(el => {
        gsap.from(el, {
            y: 40, opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
            onStart: () => { el.style.visibility = 'visible'; }
        });
    });

    gsap.utils.toArray('[data-animate="timeline"]').forEach((el, i) => {
        gsap.from(el, {
            y: 80, opacity: 0, rotateX: 10,
            duration: 1,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
            onStart: () => { el.style.visibility = 'visible'; }
        });
    });

    // ===== SKILLS SECTION =====
    gsap.utils.toArray('[data-animate="skills"]').forEach(el => {
        gsap.from(el, {
            y: 40, opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
            onStart: () => { el.style.visibility = 'visible'; }
        });
    });

    // Skill cards - need to wait for Alpine to render
    setTimeout(() => {
        gsap.utils.toArray('[data-animate="skill-card"]').forEach((el, i) => {
            gsap.from(el, {
                scale: 0.8, opacity: 0,
                duration: 0.6,
                delay: i * 0.06,
                ease: 'back.out(1.5)',
                scrollTrigger: { trigger: '#skills', start: 'top 70%', toggleActions: 'play none none none' },
                onStart: () => { el.style.visibility = 'visible'; }
            });
        });
    }, 300);

    // ===== PORTFOLIO SECTION =====
    gsap.utils.toArray('[data-animate="portfolio-header"]').forEach((el, i) => {
        gsap.from(el, {
            y: 40, opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: '#portfolio', start: 'top 80%', toggleActions: 'play none none none' },
            onStart: () => { el.style.visibility = 'visible'; }
        });
    });

    // Portfolio cards — wait for Alpine rendering
    setTimeout(() => {
        gsap.utils.toArray('[data-animate="portfolio-card"]').forEach((el, i) => {
            gsap.from(el, {
                y: 80, opacity: 0, scale: 0.92,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'power3.out',
                scrollTrigger: { trigger: '#portfolio', start: 'top 65%', toggleActions: 'play none none none' },
            });
        });
    }, 400);

    // ===== CTA SECTION =====
    gsap.utils.toArray('[data-animate="cta"]').forEach((el, i) => {
        gsap.from(el, {
            y: 60, opacity: 0,
            duration: 1,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
            onStart: () => { el.style.visibility = 'visible'; }
        });
    });
};
