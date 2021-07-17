const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/restaurant');
const sortData = require('../../public/javascripts/sortData');

router.get('/', (req, res) => {
    const keyword = (req.query.keyword === undefined) ? '' : req.query.keyword.trim();
    const selected = req.query.sortSelect;
    const sortDb = {
        nameEnAsc:  { name_en: 'asc' },
        nameEnDesc: { name_en: 'desc' },
        category:   { category: 'asc' },
        location:   { location: 'asc' }
    };

    Restaurant.find()
        .lean()
        .sort(sortDb[selected])
        .then(data => {

            const restaurants = (keyword === '') ?
                data :
                data.filter(restaurant => (restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())));

            const isFindRestaurant = (data.length !== 0) ? true : false;

            res.render('index', {  restaurants, keyword, sortData, selected, isFindRestaurant })
        })
        .catch(error => console.log(error))
});

module.exports = router;