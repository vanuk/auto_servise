var modal = document.getElementById("myModal");

// Отримуємо кнопку, яка відкриває модальне вікно
var btn = document.getElementById("openModalBtn");

// Отримуємо елемент <span>, який закриває модальне вікно
var span = document.getElementsByClassName("close")[0];

// Коли користувач натискає на кнопку, відкриваємо модальне вікно
btn.onclick = function() {
  modal.style.display = "block";
  setTimeout(function() {
    modal.classList.add("show");
  }, 10); // Невелика затримка, щоб transition спрацював
}

// Коли користувач натискає на <span> (x), закриваємо модальне вікно
span.onclick = function() {
  modal.classList.remove("show");
  setTimeout(function() {
    modal.style.display = "none";
  }, 300); // Затримка на час анімації
}

// Коли користувач натискає будь-де поза модальним вікном, закриваємо його
window.onclick = function(event) {
  if (event.target == modal) {
    modal.classList.remove("show");
    setTimeout(function() {
      modal.style.display = "none";
    }, 300); // Затримка на час анімації
  }
}