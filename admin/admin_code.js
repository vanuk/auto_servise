document.getElementById('addCarForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const carData = {
        name: formData.get('name'),
        price: formData.get('price')
    };

    fetch('/admin/admin.html', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Додано нове авто:', data);
        alert('Додано нове авто!');
    })
    .catch(error => {
        console.error('Помилка додавання авто:', error);
        alert('Помилка додавання авто!');
    });
});
