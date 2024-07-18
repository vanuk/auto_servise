emailjs.init("PhLjHaJX7JeLNSXPd");

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

//  function validatePhone(phone) {
//      const re = /^\+?\d{10,15}$/;
//      return re.test(String(phone).toLowerCase());
//  }

function sendEmail() {
    let fromName = document.getElementById('fromName').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let message = document.getElementById('message').value;

    if (!fromName || !email || !phone || !message) {
        alert("Всі поля повинні бути заповнені.");
        return false;
    }

    if (!validateEmail(email)) {
        alert("Введіть дійсну електронну пошту.");
        return false;
    }

    // if (!validatePhone(phone)) {
    //     alert("Введіть дійсний номер телефону.");
    //     return false;
    // }

    let params = {
        from_name: fromName,
        email: email,
        phone: phone,
        message: message,
    };

    emailjs.send("service_8t3tgp9", "template_vz64q9t", params)
    .then(function (res) {
        alert("Повідомлення успішно відправлено! Статус: " + res.status);
    }, function(error) {
        alert("Виникла помилка при відправці повідомлення: " + JSON.stringify(error));
    });

    return false; // Запобігає відправці форми стандартним способом
}
