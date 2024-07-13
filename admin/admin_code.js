document.getElementById('cart-count2').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = '/shop/shop.html';
});
//підключення
fetch('http://localhost:3000/admin/data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const carListElement = document.getElementById('carList');
            carListElement.innerHTML = '<h2>Список авто:</h2>';
            const ul = document.createElement('ul');
    
            data.forEach(car => {
                const li = document.createElement('li');
                li.textContent = `${car.name} - ${car.price}`;
                ul.appendChild(li);
            });
    
            carListElement.appendChild(ul);
        })
        .catch(error => {
            console.error('Помилка отримання даних:', error);
        });
        //додання товару
        document.getElementById('addCarForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(this);
            const carData = {
                name: formData.get('name'),
                price: formData.get('price')
            };

            fetch('http://localhost:3000/admin/data', {
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
        // видалення товару
        function deleteCar(name) {
            fetch(`http://localhost:3000/admin/data/${encodeURIComponent(name)}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Авто успішно видалено:', data);
                alert('Авто успішно видалено!');
                fetchCarList(); // Оновити список авто на сторінці
            })
            .catch(error => {
                console.error('Помилка видалення авто:', error);
                alert('Помилка видалення авто!');
            });
        }

        // Функція для отримання та відображення списку товару admin
        function fetchCarList() {
            fetch('http://localhost:3000/admin/data')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const carListElement = document.getElementById('carList');
                carListElement.innerHTML = '<h2>Список авто:</h2>';
                const ul = document.createElement('ul');
    
                data.forEach(car => {
                    const li = document.createElement('li');
                    li.textContent = `${car.name} - ${car.price}`;
                    
                    // Додати кнопку для видалення авто
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Видалити';
                    deleteButton.addEventListener('click', () => {
                        deleteCar(car.name); // Виклик функції видалення з передачею імені авто
                    });
                    li.appendChild(deleteButton);

                    ul.appendChild(li);
                });
    
                carListElement.appendChild(ul);
            })
            .catch(error => {
                console.error('Помилка отримання даних:', error);
            });
        }

        // Виклик функції для отримання та відображення списку авто при завантаженні сторінки
        fetchCarList();