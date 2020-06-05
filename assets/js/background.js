// The debounce function receives our function as a parameter
const debounce = (fn) => {

    // This holds the requestAnimationFrame reference, so we can cancel it if we wish
    let frame;

    // The debounce function returns a new function that can receive a variable number of arguments
    return (...params) => {

        // If the frame variable has been defined, clear it now, and queue for next frame
        if (frame) {
            cancelAnimationFrame(frame);
        }

        // Queue our function call for the next frame
        frame = requestAnimationFrame(() => {

            // Call our function and pass any params we received
            fn(...params);
        });

    }
};

const storeScroll = () => {
    let height = document.scrollingElement.scrollHeight
        - document.scrollingElement.clientHeight;
    let vPos = window.scrollY;
    let blur = 'none';
    let blurStart = 300;
    if (height - vPos < blurStart) {
        let f = (blurStart - height + vPos) / height;
        blur = `blur(${Math.round(f * 20)}px)`;
    }
    let el = document.querySelector('#background');
    if (el && blur != el.style.filter) {
        el.style.filter = blur;
    }
}

// Listen for new scroll events, here we debounce our `storeScroll` function
document.addEventListener('scroll', debounce(storeScroll), { passive: true });
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', (event) => {
        // Update scroll position for first time
        storeScroll();
    });
}
else {
    storeScroll();
}