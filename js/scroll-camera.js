/*******************************************************
 * Scroll Lock Logic
 *
 * Manages the hero text deletion scroll-lock phase.
 * The 3D camera lock has been disabled (brain model
 * replaced with placeholder image).
 ******************************************************/

let hasScrolledToAbout = false;

/** Main wheel handler — locks scrolling during hero text animation */
window.addEventListener('wheel', function handleWheel(event) {
    if (!hasScrolledToAbout) {
        event.preventDefault();
        return;
    }
}, { passive: false });
