/*******************************************************
 * Global Variables
 ******************************************************/

// Tracks if text has been fully deleted & user has scrolled to "about"
let hasScrolledToAbout = false;

// Tracks if we have begun the special camera movement in the "Projects" section
let inProjectCameraMode = false;

// Tracks if the camera movement is completed
let cameraMovementDone = false;

// Ranges from 0 (start) to 1 (finished) for the special camera move
let cameraProgress = 0;
const cameraProgressStep = 0.05; // how much to move per wheel event

const aboutSection = document.querySelector('.about');
const projectsSection = document.querySelector('#projects');

/*******************************************************
 * Step 1: Detect Project Section Entry
 ******************************************************/
function checkProjectSectionEntry() {
    // If we already completed camera movement, do nothing
    if (cameraMovementDone) return;

    const projectsTop = projectsSection.offsetTop;
    const scrollY = window.scrollY;

    // If user has scrolled to or beyond the start of #projects
    if (scrollY >= aboutSection.offsetTop && !inProjectCameraMode) {
        inProjectCameraMode = true;
        // Freeze the page at the top of the projects section
        window.scrollTo({
            top: projectsSection.offsetTop,
            behavior: "smooth"
        });

    }
}


/*******************************************************
 * Step 2: Three.js Setup
 ******************************************************/
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x808080);

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Adjusted aspect ratio for fixed box
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('brain-canvas'),
    alpha: true,
    antialias: true
});

// Hard-coded 400×400 render size (to match a fixed box)
renderer.setSize(400, 400);
renderer.shadowMap.enabled = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 10, 10).normalize();
directionalLight.castShadow = true;
scene.add(directionalLight);

// Load brain model
const loader = new THREE.GLTFLoader();
loader.load('models/brain.glb', (gltf) => {
    const brain = gltf.scene;
    scene.add(brain);
    brain.position.set(0, 0, 0);
    brain.scale.set(2, 2, 2);

    // Create the ellipse shape
    const ellipseGeometry = new THREE.CylinderGeometry(1.5, 1, 0.5, 32);
    const ellipseMaterial = new THREE.MeshStandardMaterial({
        color: 0xC54B4F,
        roughness: 0.5,
        metalness: 0.5,
        transparent: true,
        opacity: 0
    });
    const ellipse = new THREE.Mesh(ellipseGeometry, ellipseMaterial);
    ellipse.rotation.x = Math.PI / 2;
    ellipse.position.set(0, 0, -1.76);
    ellipse.scale.set(1, 1, 0.75);
    scene.add(ellipse);

    // Create the text for "Occipital Region"
    const fontLoader = new THREE.FontLoader();
    fontLoader.load(
        'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
        (font) => {
            const textGeometry = new THREE.TextGeometry('Occipital Region', {
                font: font,
                size: 0.3,
                height: 0.1,
                curveSegments: 12
            });
            const textMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                roughness: 1,
                metalness: 0.5,
                transparent: true,
                opacity: 0
            });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set(1.5, 0, -1.5);
            textMesh.scale.set(1, 1, 1);
            ellipse.add(textMesh);

            // Animate the text to always face the camera
            function updateTextRotation() {
                if (!cameraMovementDone) {
                    // While camera is not done, keep text facing the camera
                    textMesh.lookAt(camera.position);
                }
                // Once cameraMovementDone = true, do nothing,
                // so text stays at its final angle.
            }

            // Scroll-based animations (for ellipse/text fade)
            document.addEventListener('scroll', () => {
                if (cameraMovementDone) {
                    // Do NOT update ellipse/text anymore; they're frozen
                    return;
                }
                const scrollY = window.scrollY;
                const scrollHeight = document.body.scrollHeight - window.innerHeight;
                const scrollFraction = scrollY / scrollHeight;

                // Opacity updates
                if (scrollFraction > 0.0) {
                    const opacityValue = Math.min((scrollFraction ) , 0.75);
                    ellipse.material.opacity = opacityValue;
                    textMesh.material.opacity = Math.min( 1);
                } else {
                    ellipse.material.opacity = 0;
                    textMesh.material.opacity = 0;
                }

                // Basic camera movement/zoom (UNRELATED to project lock logic)
                // This example snippet rotates the camera slightly based on overall scroll.
                // You can leave it or remove if you only want the specialized "projects" camera motion.
                if (!inProjectCameraMode && !cameraMovementDone) {
                    const radius = 5 + scrollFraction * 5;
                    const theta = Math.PI * scrollFraction;
                    const phi = Math.PI / 6;
                    camera.position.x = radius * Math.sin(theta) * Math.cos(phi);
                    camera.position.y = radius * Math.sin(phi);
                    camera.position.z = radius * Math.cos(theta) * Math.cos(phi);

                    // Zooming in at the end
                    camera.fov = 75 - scrollFraction * 30;
                    camera.updateProjectionMatrix();
                    camera.lookAt(0, 0, 0);
                }
            });

            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                updateTextRotation();
                renderer.render(scene, camera);
            }
            animate();
        }
    );
});

window.addEventListener('resize', () => {
    // Keep the renderer size fixed to match the container
    renderer.setSize(400, 400);
});

/*******************************************************
 * Step 3: Camera interpolation for special movement
 ******************************************************/
function updateCameraPosition(progress) {
    // 0 => start, 1 => end
    const startRadius = 5, endRadius = 8;
    const radius = startRadius + (endRadius - startRadius) * progress;

    const startAngle = 0, endAngle = Math.PI;
    const angle = startAngle + (endAngle - startAngle) * progress;

    const phi = Math.PI / 6;
    camera.position.x = radius * Math.sin(angle) * Math.cos(phi);
    camera.position.y = radius * Math.sin(phi);
    camera.position.z = radius * Math.cos(angle) * Math.cos(phi);

    // Optional FOV interpolation
    const startFOV = 75, endFOV = 45;
    camera.fov = startFOV + (endFOV - startFOV) * progress;

    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
}

/*******************************************************
 * Step 4: Wheel Event (Lock scrolling logic)
 ******************************************************/
window.addEventListener('wheel', handleWheel, { passive: false });

function handleWheel(event) {
    // 1) If hero text not fully deleted yet, lock scrolling for text animation
    if (!hasScrolledToAbout) {
        event.preventDefault();
        // existing logic for deleting/rewriting text
        return;
    }

    // 2) We can scroll normally until we detect user has entered the project section
    checkProjectSectionEntry();

    // 3) If we're in project camera mode and the camera isn't done, lock page scroll
    if (inProjectCameraMode && !cameraMovementDone) {
        event.preventDefault(); // Lock the page

        // Wheel direction => move camera
        if (event.deltaY > 0) {
            cameraProgress += cameraProgressStep; // forward
        } else {
            cameraProgress -= cameraProgressStep; // backward
        }
        // Clamp 0..1
        cameraProgress = Math.max(0, Math.min(1, cameraProgress));

        // Update camera
        updateCameraPosition(cameraProgress);

        // If we reached 0 or 1 => camera movement done
        if (cameraProgress === 0 || cameraProgress === 1) {
            cameraMovementDone = true;
            inProjectCameraMode = false; // Unlock scrolling
            // The camera remains at the final position because
            // no other code overrides it if you removed or guarded
            // the "scroll-based camera" above.
        }
    }
    // Otherwise => normal scrolling
}



/*******************************************************
 * Step 5: Title & Subtitle Deletion/Rewriting
 ******************************************************/
document.addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById("title");
    const subtitle = document.getElementById("subtitle");
    const aboutSection = document.querySelector(".about");

    // NOTE: Removed the second "let hasScrolledToAbout" to avoid conflict!
    let currentElement = subtitle; // start with subtitle
    let totalCharacters = title.textContent.length + subtitle.textContent.length;
    let originalText = {
        title: title.textContent,
        subtitle: subtitle.textContent,
    };
    let subtitleFullyDeleted = false;
    let titleFullyRewritten = false;

    // Create cursors for title and subtitle
    let titleCursor = document.createElement("span");
    let subtitleCursor = document.createElement("span");
    titleCursor.classList.add("cursor", "title-cursor");
    subtitleCursor.classList.add("cursor", "subtitle-cursor");

    // Default to hidden
    titleCursor.style.display = "none";
    subtitleCursor.style.display = "none";

    // Add cursors to the DOM
    document.body.appendChild(titleCursor);
    document.body.appendChild(subtitleCursor);


    function updateCursorPosition() {
        // Handle title cursor
        if (currentElement === title && !hasScrolledToAbout) {
            titleCursor.style.display = "block";
            const range = document.createRange();
            const textNode = title.firstChild;

            if (textNode) {
                range.setStart(textNode, title.textContent.length);
                range.setEnd(textNode, title.textContent.length);
            } else {
                range.selectNode(title);
            }

            const rangeRect = range.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(title);
            const fontSize = parseFloat(computedStyle.fontSize);
            const lineHeight = parseFloat(computedStyle.lineHeight) || fontSize;

            titleCursor.style.left = `${rangeRect.left}px`;
            titleCursor.style.top = `${rangeRect.top}px`;
            titleCursor.style.height = `${lineHeight * 0.9}px`;
            titleCursor.style.width = `3px`;
            titleCursor.style.position = "absolute";
            titleCursor.style.backgroundColor = "black";

            subtitleCursor.style.display = "none"; // Hide subtitle cursor
        }

        // Handle subtitle cursor
        if (currentElement === subtitle && !hasScrolledToAbout) {
            subtitleCursor.style.display = "block";
            const range = document.createRange();
            const textNode = subtitle.firstChild;

            if (textNode) {
                range.setStart(textNode, subtitle.textContent.length);
                range.setEnd(textNode, subtitle.textContent.length);
            } else {
                range.selectNode(subtitle);
            }

            const rangeRect = range.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(subtitle);
            const fontSize = parseFloat(computedStyle.fontSize);
            const lineHeight = parseFloat(computedStyle.lineHeight) || fontSize;

            subtitleCursor.style.left = `${rangeRect.left}px`;
            subtitleCursor.style.top = `${rangeRect.top}px`;
            subtitleCursor.style.height = `${lineHeight * 0.9}px`;
            subtitleCursor.style.width = `3px`;
            subtitleCursor.style.position = "absolute";
            subtitleCursor.style.backgroundColor = "black";

            titleCursor.style.display = "none"; // Hide title cursor
        }
    }

    function deleteCharacter() {
        if (totalCharacters > 0) {
            if (
                currentElement === subtitle &&
                currentElement.textContent.length > 0
            ) {
                currentElement.textContent = currentElement.textContent.slice(0, -1);
                totalCharacters--;
                if (currentElement.textContent.length === 0) {
                    subtitleFullyDeleted = true;
                    currentElement = title; // Switch to title
                }
            } else if (
                currentElement === title &&
                currentElement.textContent.length > 0 &&
                subtitleFullyDeleted
            ) {
                currentElement.textContent = currentElement.textContent.slice(0, -1);
                totalCharacters--;
            }
        }

        // Unlock scrolling and move to about section when all characters are deleted
        if (totalCharacters === 0 && !hasScrolledToAbout) {
            hasScrolledToAbout = true;
            titleCursor.style.display = "none";
            window.scrollTo({
                top: aboutSection.offsetTop,
                behavior: "smooth",
            });
        }

        updateCursorPosition(); // Ensure cursors remain visible and updated
    }

    function rewriteCharacter() {
        if (
            currentElement === title &&
            currentElement.textContent.length < originalText.title.length
        ) {
            currentElement.textContent = originalText.title.slice(
                0,
                currentElement.textContent.length + 1
            );
            totalCharacters++;
            if (currentElement.textContent.length === originalText.title.length) {
                titleFullyRewritten = true;
                currentElement = subtitle; // Switch back to subtitle
            }
        } else if (
            currentElement === subtitle &&
            currentElement.textContent.length < originalText.subtitle.length &&
            titleFullyRewritten
        ) {
            currentElement.textContent = originalText.subtitle.slice(
                0,
                currentElement.textContent.length + 1
            );
            totalCharacters++;
        }
        updateCursorPosition(); // Ensure cursors remain visible and updated
    }

    function handleScroll(event) {
        if (!hasScrolledToAbout) {
            event.preventDefault(); // Prevent scrolling before "about" section is reached

            if (event.deltaY > 0) {
                deleteCharacter(); // Delete characters on scroll down
            } else if (event.deltaY < 0) {
                rewriteCharacter(); // Rewrite characters on scroll up
            }
        } else if (event.deltaY > 0) {
            deleteCharacter(); // Continue deleting if scrolled further down
        } else if (event.deltaY < 0) {
            rewriteCharacter(); // Rewrite if scrolled back up
        }
    }

    window.addEventListener("wheel", handleScroll, { passive: false });
    updateCursorPosition();
});

// ----------- Circular Icon Arrangement -----------
function arrangeIcons(circleSelector, radius) {
    const icons = document.querySelectorAll(
        `${circleSelector} .circular-icon-container`
    );
    const angleStep = (2 * Math.PI) / icons.length;

    icons.forEach((icon, index) => {
        const angle = index * angleStep;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        icon.style.position = 'absolute';
        // Adjust icon coordinates so they're centered.
        icon.style.left = `calc(50% + ${x}px - 24px)`;
        icon.style.top = `calc(50% - ${y}px - 24px)`;
    });
}

// Function to resize all icons dynamically
function resizeIcons(scaleFactor = 1) {
    document.querySelectorAll('.circular-icon-container').forEach(container => {
        const newSize = 48 * scaleFactor;
        container.style.width = `${newSize}px`;
        container.style.height = `${newSize}px`;

        const icon = container.querySelector('i');
        if (icon) {
            icon.style.fontSize = `${newSize * 0.8}px`;
            icon.style.lineHeight = `${newSize}px`; // Ensures vertical centering
            icon.style.display = 'flex';
            icon.style.alignItems = 'center';
            icon.style.justifyContent = 'center';
        }
    });
}

// Consolidated initialization function
function initializeIconLayouts() {
    const scaleFactor = 1; // Adjust scale factor if needed

    arrangeIcons('.skills-circle', 150); // Example circle
    resizeIcons(scaleFactor); // Resize all icons globally

    // Add resize event listener to adjust on window size change
    window.addEventListener('resize', () => {
        arrangeIcons('.skills-circle', 150);
        resizeIcons(scaleFactor);
    });
}

// Initialize layouts on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeIconLayouts);

/**
 * Positions all .circular-icon-container elements
 * in a circular layout around a specified radius.
 *
 * @param {string} parentSelector   - A CSS selector for the parent element (e.g. ".skills-circle")
 * @param {number} radius          - The radius (in px) at which icons should be placed
 */
/**
 * Positions a set of .circular-icon-container elements
 * around a circular path of the given radius.
 *
 * @param {string} selector - a CSS selector (e.g. ".skills-circle .inner-icon")
 * @param {number} radius   - the radius (in px)
 */
/****************************************************
 * 1) Define four default radii (example values)
 ****************************************************/
const DEFAULT_INNER_RADIUS = 100;
const DEFAULT_MIDDLE_RADIUS = 150;
const DEFAULT_OUTER_RADIUS = 200;
const DEFAULT_OUTERMOST_RADIUS = 250;

// Store current radii (if needed for dynamic changes)
const currentRadii = {
    inner: DEFAULT_INNER_RADIUS,
    middle: DEFAULT_MIDDLE_RADIUS,
    outer: DEFAULT_OUTER_RADIUS,
    outermost: DEFAULT_OUTERMOST_RADIUS
};

/****************************************************
 * 2) setCircleRadii()
 *    - Update circle <div> sizes
 *    - Reposition icons (inner & outer)
 ****************************************************/
function setCircleRadii({ inner, middle, outer, outermost }) {
    // Grab circle elements
    const innerCircle      = document.querySelector('.inner-circle');
    const middleCircle     = document.querySelector('.middle-circle');
    const outerCircle      = document.querySelector('.outer-circle');
    const outermostCircle  = document.querySelector('.outermost-circle');

    // 2 * radius => diameter
    if (innerCircle) {
        innerCircle.style.width  = (inner * 2) + 'px';
        innerCircle.style.height = (inner * 2) + 'px';
    }
    if (middleCircle) {
        middleCircle.style.width  = (middle * 2) + 'px';
        middleCircle.style.height = (middle * 2) + 'px';
    }
    if (outerCircle) {
        outerCircle.style.width  = (outer * 2) + 'px';
        outerCircle.style.height = (outer * 2) + 'px';
    }
    if (outermostCircle) {
        outermostCircle.style.width  = (outermost * 2) + 'px';
        outermostCircle.style.height = (outermost * 2) + 'px';
    }

    // Reposition icons
    // .inner-icon => inner radius
    arrangeIconsInCircle('.skills-circle .inner-icon', inner, -3.5*Math.PI/11);
    // .outer-icon => outer radius
    arrangeIconsInCircle('.skills-circle .outer-icon', outer, -3*Math.PI/10);

    // Update the currentRadii if needed
    currentRadii.inner     = inner;
    currentRadii.middle    = middle;
    currentRadii.outer     = outer;
    currentRadii.outermost = outermost;
}

/****************************************************
 * 3) arrangeIconsInCircle(selector, radius)
 ****************************************************/
function arrangeIconsInCircle(selector, radius, offsetAngle = 0) {
    const icons = document.querySelectorAll(selector);
    const count = icons.length;
    if (!count) return;

    // Each icon is separated by angleStep
    const angleStep = (2 * Math.PI) / count;

    icons.forEach((icon, i) => {
        // Add offsetAngle in radians to each position
        const angle = offsetAngle + (i * angleStep);

        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        icon.style.position = 'absolute';
        icon.style.left = `calc(50% + ${x}px)`;
        icon.style.top  = `calc(50% + ${y}px)`;
        icon.style.transform = 'translate(-50%, -50%)';
    });
}


/****************************************************
 * 4) restoreDefaultRadii()
 ****************************************************/
function restoreDefaultRadii() {
    setCircleRadii({
        inner: DEFAULT_INNER_RADIUS,
        middle: DEFAULT_MIDDLE_RADIUS,
        outer: DEFAULT_OUTER_RADIUS,
        outermost: DEFAULT_OUTERMOST_RADIUS
    });
}

/****************************************************
 * 5) Setup your event listeners
 ****************************************************/
document.addEventListener('DOMContentLoaded', () => {
    // a) Initialize everything to default
    setCircleRadii({
        inner: DEFAULT_INNER_RADIUS,
        middle: DEFAULT_MIDDLE_RADIUS,
        outer: DEFAULT_OUTER_RADIUS,
        outermost: DEFAULT_OUTERMOST_RADIUS
    });

    // b) When the mouse enters .skills-circle => shrink everything
    const skillsCircle = document.querySelector('.skills-circle');
    if (skillsCircle) {
        skillsCircle.addEventListener('mouseenter', () => {
            // reduce each circle’s radius by ~10%
            setCircleRadii({
                inner: DEFAULT_INNER_RADIUS * 0.95,
                middle: DEFAULT_MIDDLE_RADIUS * 0.95,
                outer: DEFAULT_OUTER_RADIUS * 0.95,
                outermost: DEFAULT_OUTERMOST_RADIUS * 0.95
            });
        });
        // c) On mouseleave => restore default
        skillsCircle.addEventListener('mouseleave', () => {
            restoreDefaultRadii();
        });
    }

    // 1) Hover an icon on the **INNER** circle
    //    => inner circle DOES NOT change
    //       middle circle => increases (slightly more)
    //       outer circle => increases (slightly less)
    //       outermost circle => decreases
    document.querySelectorAll('.circular-icon-container.inner-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            setCircleRadii({
                inner: DEFAULT_INNER_RADIUS * 0.9,    // no change
                middle: DEFAULT_MIDDLE_RADIUS * 1.05, // bigger
                outer: DEFAULT_OUTER_RADIUS * 0.9,    // slightly bigger
                outermost: DEFAULT_OUTERMOST_RADIUS * 0.81 // smaller
            });
        });
        icon.addEventListener('mouseleave', () => {
            restoreDefaultRadii();
        });
    });

    // 2) Hover an icon on the **OUTER** circle
    //    => outer circle => no change
    //       outermost circle => increases
    //       middle circle => decreases
    //       inner circle => decreases
    document.querySelectorAll('.circular-icon-container.outer-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            setCircleRadii({
                inner: DEFAULT_INNER_RADIUS * 0.9,      // smaller
                middle: DEFAULT_MIDDLE_RADIUS * 0.95,    // smaller
                outer: DEFAULT_OUTER_RADIUS * 1.02,      // no change
                outermost: DEFAULT_OUTERMOST_RADIUS * 1.1 // bigger
            });
        });
        icon.addEventListener('mouseleave', () => {
            restoreDefaultRadii();
        });
    });
});


