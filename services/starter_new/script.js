// script.js

document.addEventListener('scroll', function() {
    const content = document.querySelector('.content1');
    const background = document.querySelector('.background');
    const scrollPosition = window.scrollY;
    const contentOffsetTop = content.offsetTop;
    const contentHeight = content.offsetHeight;

    if (scrollPosition >= contentOffsetTop && scrollPosition <= contentOffsetTop + contentHeight) {
        const scrollInsideContent = scrollPosition - contentOffsetTop;
        const backgroundPosition = scrollInsideContent / contentHeight * 100; // Calculate percentage
        background.style.backgroundPosition = `center ${backgroundPosition}%`;
    }
});
