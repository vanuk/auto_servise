document.addEventListener('DOMContentLoaded', function() {
    console.log('Сторінка кошика завантажена і готова до використання');
    displayCartItems();
});

function displayCartItems() {
    const cartItemsElement = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p>Ваш кошик порожній.</p>';
        return;
    }

    cartItemsElement.innerHTML = '';
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');

        const itemName = document.createElement('h3');
        itemName.textContent = item.name;

        const itemQuantity = document.createElement('p');
        itemQuantity.textContent = `Кількість: ${item.quantity}`;

        const itemPrice = document.createElement('p');
        itemPrice.textContent = `Ціна: ${item.price} грн`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Видалити';
        removeButton.addEventListener('click', function() {
            removeFromCart(item.name); // Видалення всіх товарів з таким ім'ям
        });

        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = 'Зменшити кількість';
        decreaseButton.addEventListener('click', function() {
            decrementQuantity(item.name); // Зменшення кількості товару
        });

        itemDiv.appendChild(itemName);
        itemDiv.appendChild(itemQuantity);
        itemDiv.appendChild(itemPrice);
        itemDiv.appendChild(removeButton);
        itemDiv.appendChild(decreaseButton);
        cartItemsElement.appendChild(itemDiv);
    });
}

function removeFromCart(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Зберігаємо тільки ті елементи, які не мають таке ім'я
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart)); // Оновлюємо локальне сховище
    displayCartItems(); // Оновлюємо відображення кошика
}

function decrementQuantity(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.name === name);
    if (item && item.quantity > 0) {
        item.quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart)); // Оновлюємо локальне сховище
        displayCartItems(); // Оновлюємо відображення кошика
    }
    if (item && item.quantity == 0) {
        removeFromCart(name) // Оновлюємо локальне сховище
        displayCartItems(); // Оновлюємо відображення кошика
    }
}

function showOrderForm() {
    document.getElementById('order-form').classList.remove('hidden');
}

function submitOrder(event) {
    event.preventDefault();

    // Отримуємо дані з форми
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    // Додайте тут логіку для обробки замовлення

    alert('Замовлення підтверджене');
    localStorage.removeItem('cart'); // Очищаємо кошик після замовлення
    displayCartItems(); // Оновлюємо відображення кошика
}
