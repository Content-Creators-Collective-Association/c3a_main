export function scrollToSection(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}