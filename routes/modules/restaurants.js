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
    return Restaurant.create(req.body)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    return Restaurant.findById(id)
        .then(restaurants => {
            restaurants = Object.assign(restaurants, req.body);
            return restaurants.save()
        })
        .then(() => res.redirect(`/restaurants/${id}`))
        .catch(error => console.log(error))
});

router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
});

module.exports = router;