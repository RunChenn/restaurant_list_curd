const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/restaurant');
const sortData = require('../../public/javascripts/sortData');

router.get('/', (req, res) => {
    const selected = req.query.sortSelect;
    const sortDb = {
        nameAsc:  { name_en: 'asc' },
        nameDesc: { name_en: 'desc' },
        category:   { category: 'asc' },
        location:   { location: 'asc' }
    };

    Restaurant.find()
        .lean()
        .sort(sortDb[selected])
        .then(restaurants => {
            const isFindRestaurant = true;
            res.render('index', { restaurants, sortData, selected, isFindRestaurant })
        })
        .catch(error => console.log(error))
});

module.exports = router;