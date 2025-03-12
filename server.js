const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let restaurants = [];
app.post('/restaurants', (req, res) => {
    const { name, menu } = req.body;
    if (!name || !menu) return res.status(400).send('Invalid data');
    const restaurant = { id: Date.now(), name, menu };
    restaurants.push(restaurant);
    res.status(201).send(restaurant);
});

app.get('/restaurants/:id', (req, res) => {
    const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
    if (!restaurant) return res.status(404).send('Restaurant not found');
    res.send(restaurant);
});

app.get('/restaurants', (req, res) => {
    res.send(restaurants);
});

app.listen(4000, () => console.log('Restaurant service running on port 4000'));
