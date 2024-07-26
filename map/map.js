const scriptURL = 'https://script.google.com/macros/s/AKfycbwG4t5-hGCLEsI9sDY2cSswiEjHgSkaMB5QG1F7Mk-EJXEaLtRp4TeTGLsbxB-1MD_l_g/exec';

const form = document.forms['contact-form'];

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => alert("Thank you! your form is submitted successfully." ))
        .then(() => { window.location.reload(); })
        .catch(error => console.error('Error!', error.message));
});
