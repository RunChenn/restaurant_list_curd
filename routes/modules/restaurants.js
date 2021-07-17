const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/restaurant');

router.get('/new', (req, res) => {
    return res.render('new');
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    return Restaurant.findById(id)
        .lean()
        .then(restaurant => res.render('detail', { restaurant }))
        .catch(err => console.log(err));
});

router.get('/:id/edit', (req, res) => {
    const id = req.params.id;
    return Restaurant.findById(id)
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(err => console.log(err));
});

router.post('/', (req, res) => {
    const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body;

    return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
});

router.post('/:id/edit', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    return Restaurant.findById(id)
        .then(restaurants => {
            restaurants.name = data.name
            restaurants.name_en = data.name_en
            restaurants.category = data.category
            restaurants.image = data.image
            restaurants.location = data.location
            restaurants.phone = data.phone
            restaurants.google_map = data.google_map
            restaurants.rating = data.rating
            restaurants.description = data.description
            return restaurants.save()
        })
        .then(() => res.redirect(`/restaurants/${id}`))
        .catch(error => console.log(error))
});

router.post('/:id/delete', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
});

module.exports = router;