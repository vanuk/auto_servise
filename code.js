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

var counter = 0;
    var srcArray = ["/photos/car_mechanic..jpg",
        "/photos/car_mechanic2..jpg",
        "/photos/car_mechanic3..jpg"];
        
    function updateImages() {
        var prevIndex = (counter - 1 + srcArray.length) % srcArray.length;
        var nextIndex = (counter + 1) % srcArray.length;
        document.getElementById("prevImage").src = srcArray[prevIndex];
        document.getElementById("currentImage").src = srcArray[counter];
        document.getElementById("nextImage").src = srcArray[nextIndex];
    }  

    document.getElementById("prev").onclick = function() {
        counter = (counter - 1 + srcArray.length) % srcArray.length;
        updateImages();
    }

    document.getElementById("next").onclick = function() {
        counter = (counter + 1) % srcArray.length;
        updateImages();
    }

    updateImages();
