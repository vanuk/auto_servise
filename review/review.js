async function fetchData() {
    const sheetId = '1L3OyLKIO-JqfZ4SRCL2Lohx7-9hjPzaJdH3J9zNd5dc';  // Замініть на ID вашої Google Таблиці
    const range = 'sheet1';  // Замініть на ім'я вашого листа
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${range}&tqx=out:json`;

    const response = await fetch(url);
    const text = await response.text();
    const json = JSON.parse(text.substring(47).slice(0, -2)); // Обрізаємо JSON-обгортку
    const data = json.table.rows;
    const headers = json.table.cols;

    // Вибір стовпчиків для відображення
    const columnsToShow = [11, 25, 16, 27]; // Номери стовпчиків, які потрібно показати

    // Очищення контейнера
    const dataContainer = document.querySelector('#data-container');
    dataContainer.innerHTML = '';

    // Додаємо дані
    data.forEach(row => {
        const item = document.createElement('div');
        item.className = 'data-item';

        columnsToShow.forEach((colIndex, index) => {
            const value = row.c[colIndex] ? row.c[colIndex].v : '';
            const paragraph = document.createElement('p');
            
            if (colIndex === 25) {
                // Відображення рейтингу як зірочки
                const ratingValue = parseFloat(value);
                const maxRating = 5; // Максимальний рейтинг
                const filledStars = Math.round(ratingValue); // Заповнені зірки
                const emptyStars = maxRating - filledStars; // Порожні зірки
                
                paragraph.innerHTML = `
                    <span class="rating">
                        ${'⭐'.repeat(filledStars)}
                        ${'☆'.repeat(emptyStars)}
                    </span>
                `;
            } else {
                paragraph.textContent = value;
            }
            
            item.appendChild(paragraph);
        });

        dataContainer.appendChild(item);
    });
}

fetchData();