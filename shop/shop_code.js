document.addEventListener('DOMContentLoaded', function() {
    console.log('Сторінка магазину завантажена і готова до використання');
    loadProducts(); // Завантажуємо товари при завантаженні сторінки
});

function loadProducts() {
    fetch('http://localhost:3000/shop/data')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const productListElement = document.getElementById('product-list');

        data.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            const productImage = document.createElement('img');
            productImage.src = 'product.jpg'; // Замініть на шлях до зображення товару, якщо є

            const productName = document.createElement('h3');
            productName.textContent = product.name;

            const productDescription = document.createElement('p');
            productDescription.textContent = product.description; // Додайте опис товару з вашого JSON

            const productPrice = document.createElement('p');
            productPrice.classList.add('price');
            productPrice.textContent = `Ціна: ${product.price} грн`;

            const buyButton = document.createElement('button');
            buyButton.textContent = 'Купити';
            buyButton.addEventListener('click', function() {
                addToCart(product.name, product.price);
            });

            productDiv.appendChild(productImage);
            productDiv.appendChild(productName);
            productDiv.appendChild(productDescription);
            productDiv.appendChild(productPrice);
            productDiv.appendChild(buyButton);

            productListElement.appendChild(productDiv);
        });
    })
    .catch(error => {
        console.error('Помилка отримання даних:', error);
    });
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.getElementById('cart-count1').addEventListener('click', function(event) {
    event.preventDefault(); // Запобігає стандартній поведінці посилання
    window.location.href = '/cart/cart.html'; // Перехід на іншу сторінку
});
document.getElementById('main1').addEventListener('click', function(event) {
    event.preventDefault(); // Запобігає стандартній поведінці посилання
    window.location.href = '/main.html'; // Перехід на іншу сторінку
});

function addToCart(name, price) {
    const existingProduct = cart.find(item => item.name === name);
    
    if (existingProduct) {
        existingProduct.quantity += 1; // Збільшуємо кількість товару
    } else {
        const product = {
            name: name,
            price: price,
            quantity: 1
        };
        cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart)); // Зберігаємо кошик в локальному сховищі
    updateCartCount();
}

function updateCartCount() {
    const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

updateCartCount(); // Оновлюємо кількість товарів у кошику при завантаженні сторінки
