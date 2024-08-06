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

const scriptURL = 'https://script.google.com/macros/s/AKfycbxfXG3J9dompQjGyjNsHE9dw6hZMgUxMUTE-1O0DH1Daz6sRAdejmnGpaLFUaQxLdflzA/exec';
let busyDates = [];
const availableTimes = ["09:00", "12:00", "15:00"];
let currentDate = new Date();

async function updateBusyDates() {
    try {
        const datesResponse = await fetch(`${scriptURL}?action=getDates`);
        const dates = await datesResponse.json();
        busyDates = dates.map(date => {
            return {
                date: new Date(date[0]).toLocaleDateString('uk-UA', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }),
                time: date[1]
            };
        });
        console.log('Зайняті дати:', busyDates);
    } catch (error) {
        console.error('Error!', error.message);
    }
}

function updateCalendar() {
    const calendar = document.getElementById('calendar');
    const monthTitle = document.getElementById('monthTitle');
    calendar.innerHTML = ''; // Очистити попередні дні
    
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    monthTitle.textContent = currentDate.toLocaleString('uk-UA', { month: 'long', year: 'numeric' }); // Назва місяця

    for (let i = 1; i <= daysInMonth; i++) {
        const dayDate = new Date(year, month, i);
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = i;

        // Обробка натискання на дату
        dayElement.addEventListener('click', () => {
            const selectedDate = dayDate.toLocaleDateString('uk-UA', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            displayAvailableSlots(selectedDate);
        });

        // Перевірка на зайняті дати
        const formattedDate = dayDate.toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const busyTimes = busyDates.filter(busy => busy.date === formattedDate).map(busy => busy.time.split(':')[0]);
        
        // Перевірка на зайняті дати
        if (busyDates.some(busy => busy.date === formattedDate && busy.time)) {
            if (busyTimes.length === availableTimes.length) {
                dayElement.classList.add('busy'); // Увесь день зайнятий
            } else {
                dayElement.classList.add('partial'); // Частково зайнятий день
            }
        }

        calendar.appendChild(dayElement);
    }
}


window.addEventListener('load', async () => {
    await updateBusyDates();
    updateCalendar();
});

function isSlotBusy(selectedDate, selectedHour) {
    return busyDates.some(busy => busy.date === selectedDate && busy.time.split(':')[0] === selectedHour);
}

const form = document.forms['contact-form'];
form.addEventListener('submit', async e => {
    e.preventDefault();

    const formData = new FormData(form);
    const selectedDate = new Date(formData.get('date')).toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const selectedTime = formData.get('time');
    const selectedHour = selectedTime.split(':')[0];

    if (isSlotBusy(selectedDate, selectedHour)) {
        const nextAvailable = findNextAvailableSlot(selectedDate, selectedTime);
        alert(`Вибрана дата і час зайняті. Найближча доступна дата: ${nextAvailable.date}, доступний час: ${nextAvailable.time}`);
    } else {
        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            document.getElementById('submissionMessage').textContent = result.message || 'Успішно відправлено!';
            form.reset();
            await updateBusyDates(); // Оновити зайняті дати
            updateCalendar(); // Оновити календар
        } catch (error) {
            console.error('Error!', error.message);
        }
    }
});

function displayAvailableSlots(selectedDate) {
    const availableSlots = document.getElementById('available-slots');
    const busyTimes = busyDates
        .filter(busy => busy.date === selectedDate)
        .map(busy => busy.time.split(':')[0]);

    const slotsHtml = availableTimes.map(time => {
        const hour = time.split(':')[0];
        return `<div style="color: ${busyTimes.includes(hour)                 ? 'red' : 'black'};">${time} - ${busyTimes.includes(hour) ? 'Зайнято' : 'Вільно'}</div>`;
    }).join('');

    availableSlots.innerHTML = `<h3>Години на ${selectedDate}:</h3>${slotsHtml}`;
}

function findNextAvailableSlot(selectedDate, selectedTime) {
    let nextDate = new Date(selectedDate.split('.').reverse().join('-'));
    let nextAvailableTimeIndex = availableTimes.indexOf(selectedTime);

    while (true) {
        while (nextAvailableTimeIndex < availableTimes.length) {
            const nextAvailableTime = availableTimes[nextAvailableTimeIndex];
            if (!isSlotBusy(selectedDate, nextAvailableTime.split(':')[0])) {
                return { date: selectedDate, time: nextAvailableTime };
            }
            nextAvailableTimeIndex++;
        }

        nextDate.setDate(nextDate.getDate() + 1);
        const nextAvailableDate = nextDate.toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        selectedDate = nextAvailableDate;
        nextAvailableTimeIndex = 0;
    }
}

document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

