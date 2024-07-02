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