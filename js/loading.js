/**
 * Loading Screen Module
 * Handles the loading counter animation and screen dismissal.
 */
window.ResumeApp = window.ResumeApp || {};

window.ResumeApp.initLoading = function () {
    const loadingScreen = document.getElementById('loadingScreen');
    const counterEl = document.getElementById('loadingCounter');
    let count = 0;

    function dismissLoading() {
        if (loadingScreen.classList.contains('done')) return;
        loadingScreen.classList.add('done');
        setTimeout(() => { loadingScreen.style.display = 'none'; }, 700);
        // Trigger hero animations after loading dismisses
        if (window.ResumeApp.animateHero) {
            window.ResumeApp.animateHero();
        }
    }

    const counterInterval = setInterval(() => {
        count += Math.floor(Math.random() * 15) + 8;
        if (count >= 100) {
            count = 100;
            clearInterval(counterInterval);
            setTimeout(dismissLoading, 200);
        }
        counterEl.textContent = count;
    }, 50);
};
