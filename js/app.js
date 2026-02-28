/**
 * Main Application Entry Point
 * Orchestrates initialization of all modules in the correct order.
 *
 * Module load order (via <script> tags in index.html):
 *   1. CDN libraries (Tailwind, Alpine, Lucide, GSAP, Lenis, Three.js)
 *   2. lenis.js
 *   3. three-bg.js
 *   4. gsap-animations.js
 *   5. loading.js
 *   6. typewriter.js
 *   7. interactions.js
 *   8. portfolio.js
 *   9. app.js (this file)
 */
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize modules
    window.ResumeApp.initLenis();
    window.ResumeApp.initLoading();
    window.ResumeApp.initGSAPAnimations();
    window.ResumeApp.initTypewriter();
    window.ResumeApp.initInteractions();
});
