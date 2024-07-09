document.addEventListener('DOMContentLoaded', function() {
    console.log('Сторінка завантажена і готова до використання');
    loadProducts(); // Завантажуємо товари при завантаженні сторінки
});

function loadProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Очистимо список перед завантаженням

    let products = JSON.parse(localStorage.getItem('products')) || [];

    products.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${product.name} - ${product.price} грн</span>
            <button onclick="deleteProduct(${index})">Видалити</button>
        `;
        productList.appendChild(listItem);
    });
}

function addProduct(event) {
    event.preventDefault();

    const productName = document.getElementById('product-name').value;
    const productPrice = parseFloat(document.getElementById('product-price').value);

    if (productName && !isNaN(productPrice)) {
        const product = { name: productName, price: productPrice };

        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));

        loadProducts(); // Оновлюємо список товарів
        document.getElementById('add-product-form').reset(); // Очищуємо форму
    } else {
        alert('Будь ласка, введіть коректні дані для товару.');
    }
}

function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts(); // Оновлюємо список товарів після видалення
}

// Додаємо обробник події для форми додавання товару
document.getElementById('add-product-form').addEventListener('submit', addProduct);
