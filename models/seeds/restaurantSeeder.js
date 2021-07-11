const mongoose = require('mongoose');
const Restaurant = require('../restaurant');
const seedData = require('../../restaurants.json');

mongoose.connect('mongodb://localhost/restaurant', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', () => {
    console.log('mongodb error!')
});

db.once('open', () => {
    seedData.results.forEach((restaurant) =>
        Restaurant.create({
            id: restaurant.id,
            name: restaurant.name,
            name_en: restaurant.name_en,
            category: restaurant.category,
            image: restaurant.image,
            location: restaurant.location,
            phone: restaurant.phone,
            google_map: restaurant.google_map,
            rating: restaurant.rating,
            description: restaurant.description
        })
    )
    console.log('Success to set the seeder.')
})