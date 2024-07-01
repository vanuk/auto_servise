// Add event listener to navigation menu
document.addEventListener("DOMContentLoaded", function() {
    const nav = document.querySelector("nav");
    nav.addEventListener("click", function(event) {
        if (event.target.tagName === "A") {
            event.preventDefault();
            const targetId = event.target.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    });
});