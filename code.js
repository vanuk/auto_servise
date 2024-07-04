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
function sendEmail()
{
    let params={
        from_name: document.getElementById('fromName').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
    }
    emailjs.send("service_8t3tgp9","template_vz64q9t", params)
    .then(function (res) 
    {
        alert("Message sent successfully" + res.status);
    });

}