/**
 * Lenis Smooth Scroll Module
 * Initializes Lenis smooth scrolling and integrates with GSAP ticker.
 */
window.ResumeApp = window.ResumeApp || {};

window.ResumeApp.initLenis = function () {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return lenis;
};
