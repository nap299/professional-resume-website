/**
 * Typewriter Effect Module
 * Cycles through role phrases with typing and deleting animation.
 */
window.ResumeApp = window.ResumeApp || {};

window.ResumeApp.initTypewriter = function () {
    const typewriterEl = document.getElementById('typewriterText');
    const phrases = [
        'IT Professional & Developer',
        'Web Application Specialist',
        'Windows Server Administrator',
        'Problem Solver & Builder'
    ];
    let phraseIdx = 0, charIdx = 0, deleting = false, speed = 80;

    function typeWriter() {
        const current = phrases[phraseIdx];
        if (deleting) {
            typewriterEl.textContent = current.substring(0, --charIdx);
            speed = 40;
        } else {
            typewriterEl.textContent = current.substring(0, ++charIdx);
            speed = 80;
        }
        if (!deleting && charIdx === current.length) {
            deleting = true;
            speed = 2000;
        } else if (deleting && charIdx === 0) {
            deleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            speed = 400;
        }
        setTimeout(typeWriter, speed);
    }

    setTimeout(typeWriter, 2000);
};
