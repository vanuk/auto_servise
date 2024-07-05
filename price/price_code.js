// You can add JavaScript code here to interact with the page
// For example, you could add a function to calculate the total price of all services
function calculateTotalPrice() {
	let totalPrice = 0;
	document.querySelectorAll('.price').forEach(price => {
		totalPrice += parseFloat(price.textContent.replace('$', ''));
	});
	alert(`Total price: $${totalPrice}`);
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', calculateTotalPrice);