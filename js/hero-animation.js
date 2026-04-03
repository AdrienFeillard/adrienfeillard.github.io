/*******************************************************
 * Hero Title & Subtitle Deletion / Rewriting Animation
 *
 * Depends on global: hasScrolledToAbout (from scroll-camera.js)
 ******************************************************/

document.addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById("title");
    const subtitle = document.getElementById("subtitle");
    const aboutSection = document.querySelector(".about");

    let currentElement = subtitle;
    let totalCharacters = title.textContent.length + subtitle.textContent.length;
    const originalText = {
        title: title.textContent,
        subtitle: subtitle.textContent,
    };
    let subtitleFullyDeleted = false;
    let titleFullyRewritten = false;

    // Create cursors
    const titleCursor = document.createElement("span");
    const subtitleCursor = document.createElement("span");
    titleCursor.classList.add("cursor", "title-cursor");
    subtitleCursor.classList.add("cursor", "subtitle-cursor");
    titleCursor.style.display = "none";
    subtitleCursor.style.display = "none";
    document.body.appendChild(titleCursor);
    document.body.appendChild(subtitleCursor);

    function updateCursorPosition() {
        const isTitle = currentElement === title && !hasScrolledToAbout;
        const isSubtitle = currentElement === subtitle && !hasScrolledToAbout;

        titleCursor.style.display = isTitle ? "block" : "none";
        subtitleCursor.style.display = isSubtitle ? "block" : "none";

        const activeCursor = isTitle ? titleCursor : isSubtitle ? subtitleCursor : null;
        if (!activeCursor) return;

        const range = document.createRange();
        const textNode = currentElement.firstChild;
        if (textNode) {
            range.setStart(textNode, currentElement.textContent.length);
            range.setEnd(textNode, currentElement.textContent.length);
        } else {
            range.selectNode(currentElement);
        }

        const rangeRect = range.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(currentElement);
        const fontSize = parseFloat(computedStyle.fontSize);
        const lineHeight = parseFloat(computedStyle.lineHeight) || fontSize;

        activeCursor.style.left = `${rangeRect.left}px`;
        activeCursor.style.top = `${rangeRect.top}px`;
        activeCursor.style.height = `${lineHeight * 0.9}px`;
        activeCursor.style.width = `3px`;
        activeCursor.style.position = "absolute";
        activeCursor.style.backgroundColor = "black";
    }

    function deleteCharacter() {
        if (totalCharacters <= 0) return;

        if (currentElement === subtitle && currentElement.textContent.length > 0) {
            currentElement.textContent = currentElement.textContent.slice(0, -1);
            totalCharacters--;
            if (currentElement.textContent.length === 0) {
                subtitleFullyDeleted = true;
                currentElement = title;
            }
        } else if (currentElement === title && currentElement.textContent.length > 0 && subtitleFullyDeleted) {
            currentElement.textContent = currentElement.textContent.slice(0, -1);
            totalCharacters--;
        }

        if (totalCharacters === 0 && !hasScrolledToAbout) {
            hasScrolledToAbout = true;
            titleCursor.style.display = "none";
            window.scrollTo({
                top: aboutSection.offsetTop,
                behavior: "smooth",
            });
        }

        updateCursorPosition();
    }

    function rewriteCharacter() {
        if (currentElement === title && currentElement.textContent.length < originalText.title.length) {
            currentElement.textContent = originalText.title.slice(0, currentElement.textContent.length + 1);
            totalCharacters++;
            if (currentElement.textContent.length === originalText.title.length) {
                titleFullyRewritten = true;
                currentElement = subtitle;
            }
        } else if (currentElement === subtitle && currentElement.textContent.length < originalText.subtitle.length && titleFullyRewritten) {
            currentElement.textContent = originalText.subtitle.slice(0, currentElement.textContent.length + 1);
            totalCharacters++;
        }
        updateCursorPosition();
    }

    window.addEventListener("wheel", function handleHeroScroll(event) {
        if (!hasScrolledToAbout) {
            event.preventDefault();
            if (event.deltaY > 0) {
                deleteCharacter();
            } else if (event.deltaY < 0) {
                rewriteCharacter();
            }
        }
    }, { passive: false });

    updateCursorPosition();
});
