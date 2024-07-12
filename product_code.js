document.addEventListener('DOMContentLoaded', function () {
    const productId = getProductIdFromURL(); // Отримати ID товару з URL

    fetch(`/product/${productId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Помилка отримання даних товару');
        }
        return response.json();
    })
    .then(product => {
        // Заповнення деталей товару на сторінці
        const productNameElement = document.getElementById('product-name');
        const productPriceElement = document.getElementById('product-price');

        productNameElement.textContent = product.name;
        productPriceElement.textContent = `Ціна: ${product.price}`;

        // Якщо є додаткові властивості товару, їх можна також відобразити
        // Наприклад, опис, зображення тощо.
    })
    .catch(error => console.error('Помилка:', error));
});

// Функція для отримання ID товару з URL
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}
