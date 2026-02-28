/**
 * Interactions Module
 * Handles tilt cards, active nav highlighting, and magnetic button effects.
 */
window.ResumeApp = window.ResumeApp || {};

window.ResumeApp.initInteractions = function () {

    // ===== TILT CARD =====
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -8;
            const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 8;
            card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
        });
    });

    // ===== ACTIVE NAV =====
    const sections = document.querySelectorAll('section[id]');
    function updateNav() {
        const sy = window.scrollY + 200;
        sections.forEach(s => {
            const link = document.querySelector(`.nav-link[data-section="${s.id}"]`);
            if (link) link.classList.toggle('active', sy >= s.offsetTop && sy < s.offsetTop + s.offsetHeight);
        });
    }
    window.addEventListener('scroll', updateNav);

    // ===== MAGNETIC BUTTONS =====
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const r = btn.getBoundingClientRect();
            btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.15}px, ${(e.clientY - r.top - r.height / 2) * 0.15}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0,0)';
        });
    });
};
