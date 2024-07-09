



document.addEventListener('DOMContentLoaded', function() {
    console.log('Сторінка магазину завантажена і готова до використання');
    loadProducts(); // Завантажуємо товари при завантаженні сторінки
});

function loadProducts() {
    const productListContainer = document.getElementById('product-list');
    productListContainer.innerHTML = ''; // Очистимо контейнер перед завантаженням

    let products = JSON.parse(localStorage.getItem('products')) || [];

    products.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="product.jpg" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Ціна: ${product.price} грн</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Купити</button>
        `;
        productListContainer.appendChild(productElement);
    });
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, productPrice) {
    const product = { name: productName, price: productPrice };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

