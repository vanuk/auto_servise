const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = 'YOUR_GOOGLE_API_KEY';

app.get('/reviews', async (req, res) => {
    try {
        const placeId = '0x472f15f321e331cb:0x92d177335de764d7';
        const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${API_KEY}`;
        const response = await axios.get(url);
        const reviews = response.data.result.reviews;
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).send('Помилка при отриманні відгуків');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
