export function clearView() {
    const visibleArea = document.getElementById('visible');
    Array.from(visibleArea.children).forEach(el => document.getElementById('invisible').appendChild(el));
}