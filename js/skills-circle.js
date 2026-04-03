/*******************************************************
 * Skills Circle — Icon Arrangement & Hover Effects
 ******************************************************/

const DEFAULT_INNER_RADIUS = 100;
const DEFAULT_MIDDLE_RADIUS = 150;
const DEFAULT_OUTER_RADIUS = 200;
const DEFAULT_OUTERMOST_RADIUS = 250;

const currentRadii = {
    inner: DEFAULT_INNER_RADIUS,
    middle: DEFAULT_MIDDLE_RADIUS,
    outer: DEFAULT_OUTER_RADIUS,
    outermost: DEFAULT_OUTERMOST_RADIUS
};

/**
 * Position icons in a circle around a given radius.
 */
function arrangeIconsInCircle(selector, radius, offsetAngle = 0) {
    const icons = document.querySelectorAll(selector);
    if (!icons.length) return;

    const angleStep = (2 * Math.PI) / icons.length;

    icons.forEach((icon, i) => {
        const angle = offsetAngle + (i * angleStep);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        icon.style.position = 'absolute';
        icon.style.left = `calc(50% + ${x}px)`;
        icon.style.top  = `calc(50% + ${y}px)`;
        icon.style.transform = 'translate(-50%, -50%)';
    });
}

/**
 * Update circle div sizes and reposition icons.
 */
function setCircleRadii({ inner, middle, outer, outermost }) {
    const innerCircle     = document.querySelector('.inner-circle');
    const middleCircle    = document.querySelector('.middle-circle');
    const outerCircle     = document.querySelector('.outer-circle');
    const outermostCircle = document.querySelector('.outermost-circle');

    if (innerCircle)     { innerCircle.style.width = (inner * 2) + 'px';     innerCircle.style.height = (inner * 2) + 'px'; }
    if (middleCircle)    { middleCircle.style.width = (middle * 2) + 'px';   middleCircle.style.height = (middle * 2) + 'px'; }
    if (outerCircle)     { outerCircle.style.width = (outer * 2) + 'px';     outerCircle.style.height = (outer * 2) + 'px'; }
    if (outermostCircle) { outermostCircle.style.width = (outermost * 2) + 'px'; outermostCircle.style.height = (outermost * 2) + 'px'; }

    arrangeIconsInCircle('.skills-circle .inner-icon', inner, -5 * Math.PI / 14);
    arrangeIconsInCircle('.skills-circle .outer-icon', outer, -6.5 * Math.PI / 13);

    currentRadii.inner = inner;
    currentRadii.middle = middle;
    currentRadii.outer = outer;
    currentRadii.outermost = outermost;
}

function restoreDefaultRadii() {
    setCircleRadii({
        inner:     DEFAULT_INNER_RADIUS * 1.3,
        middle:    DEFAULT_MIDDLE_RADIUS * 1.3,
        outer:     DEFAULT_OUTER_RADIUS * 1.3,
        outermost: DEFAULT_OUTERMOST_RADIUS * 1.3
    });
}

/** Resize icon containers and their inner icons. */
function resizeIcons(scaleFactor = 1) {
    document.querySelectorAll('.circular-icon-container').forEach(container => {
        const newSize = 48 * scaleFactor;
        container.style.width = `${newSize}px`;
        container.style.height = `${newSize}px`;

        const icon = container.querySelector('i');
        if (icon) {
            icon.style.fontSize = `${newSize * 0.8}px`;
            icon.style.lineHeight = `${newSize}px`;
            icon.style.display = 'flex';
            icon.style.alignItems = 'center';
            icon.style.justifyContent = 'center';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize with default radii
    restoreDefaultRadii();
    resizeIcons(1);

    // Hover on skills-circle container => shrink
    const skillsCircle = document.querySelector('.skills-circle');
    if (skillsCircle) {
        skillsCircle.addEventListener('mouseenter', () => {
            setCircleRadii({
                inner:     DEFAULT_INNER_RADIUS * 1.0,
                middle:    DEFAULT_MIDDLE_RADIUS * 1.05,
                outer:     DEFAULT_OUTER_RADIUS * 1.1,
                outermost: DEFAULT_OUTERMOST_RADIUS * 1.15
            });
        });
        skillsCircle.addEventListener('mouseleave', restoreDefaultRadii);
    }

    // Hover inner icons => expand inner, contract outer
    document.querySelectorAll('.circular-icon-container.inner-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            setCircleRadii({
                inner:     DEFAULT_INNER_RADIUS * 1.4,
                middle:    DEFAULT_MIDDLE_RADIUS * 1.45,
                outer:     DEFAULT_OUTER_RADIUS * 1.25,
                outermost: DEFAULT_OUTERMOST_RADIUS * 1.15
            });
        });
        icon.addEventListener('mouseleave', restoreDefaultRadii);
    });

    // Hover outer icons => contract inner, keep outer
    document.querySelectorAll('.circular-icon-container.outer-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            setCircleRadii({
                inner:     DEFAULT_INNER_RADIUS * 0.9,
                middle:    DEFAULT_MIDDLE_RADIUS * 1.05,
                outer:     DEFAULT_OUTER_RADIUS * 1.0,
                outermost: DEFAULT_OUTERMOST_RADIUS * 1.0
            });
        });
        icon.addEventListener('mouseleave', restoreDefaultRadii);
    });

    // Adjust on resize
    window.addEventListener('resize', () => {
        restoreDefaultRadii();
        resizeIcons(1);
    });
});
