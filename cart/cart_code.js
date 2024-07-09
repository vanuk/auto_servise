document.addEventListener('DOMContentLoaded', function() {
    console.log('Сторінка кошика завантажена');
    loadCartItems();
});

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Ваш кошик порожній.</p>';
    } else {
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <p>${item.name} - ${item.price} грн</p>
                <button onclick="removeFromCart(${index})">Видалити</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

function showOrderForm() {
    document.getElementById('cart-items').classList.add('hidden');
    document.getElementById('order-form').classList.remove('hidden');
}

function submitOrder(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    if (name && address && phone) {
        alert('Дякуємо за замовлення, ' + name + '!\nВаше замовлення буде доставлено за адресою: ' + address);
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        document.getElementById('order-form').reset();
        document.getElementById('order-form').classList.add('hidden');
        document.getElementById('cart-items').classList.remove('hidden');
        updateCartCount();
    } else {
        alert('Будь ласка, заповніть всі поля форми.');
    }
}
