document.addEventListener('DOMContentLoaded', function() {
    console.log('Сторінка завантажена і готова до використання');
});

function showOrderForm() {
    document.getElementById('order-form').classList.remove('hidden');
}

function submitOrder(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    if (name && address && phone) {
        alert('Дякуємо за замовлення, ' + name + '!\nВаше замовлення буде доставлено за адресою: ' + address);
        document.getElementById('order-form').reset();
        document.getElementById('order-form').classList.add('hidden');
    } else {
        alert('Будь ласка, заповніть всі поля форми.');
    }
}
