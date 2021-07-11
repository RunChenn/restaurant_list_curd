const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Restaurant = require('./models/restaurant')

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true,useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', () => console.log('mongodb error!') );

db.once('open', () => console.log('mongodb connectd!') );

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    Restaurant.find()
            .lean()
            .then(restaurants => {
                const isFindRestaurant = true;
                res.render('index', { restaurants, isFindRestaurant })
            })
            .catch(error => console.log(error))
});

app.get('/restaurants/new', (req, res) => {
    return res.render('new');
});

app.get('/restaurants/:id', (req, res) => {
    const id = req.params.id;
    return Restaurant.findById(id)
        .lean()
        .then(restaurant => res.render('detail', { restaurant }))
        .catch(err => console.log(err));
});

app.get('/restaurants/:id/edit', (req, res) => {
    const id = req.params.id;
    return Restaurant.findById(id)
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(err => console.log(err));
});

app.post('/restaurants', (req, res) => {
    const name = req.body.name
    const name_en = req.body.name_en
    const category = req.body.category
    const image = req.body.image
    const location = req.body.location
    const phone = req.body.phone
    const google_map = req.body.google_map
    const rating = req.body.rating
    const description = req.body.description

    return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
});

app.post('/restaurants/:id/edit', (req, res) => {
    const id = req.params.id
    const name = req.body.name
    const name_en = req.body.name_en
    const category = req.body.category
    const image = req.body.image
    const location = req.body.location
    const phone = req.body.phone
    const google_map = req.body.google_map
    const rating = req.body.rating
    const description = req.body.description
    return Restaurant.findById(id)
        .then(restaurants => {
            restaurants.name = name
            restaurants.name_en = name_en
            restaurants.category = category
            restaurants.image = image
            restaurants.location = location
            restaurants.phone = phone
            restaurants.google_map = google_map
            restaurants.rating = rating
            restaurants.description = description
            return restaurants.save()
        })
        .then(() => res.redirect(`/restaurants/${id}`))
        .catch(error => console.log(error))
});

app.post('/restaurants/:id/delete', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})


app.get('/search', (req, res) => {
    const keyword = req.query.keyword.trim();

    Restaurant.find()
        .lean()
        .then((data) => {
            const restaurants = data.filter(restaurant => (restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())));

            const isFindRestaurant = (restaurants.length !== 0) ? true : false;

            res.render('index', { restaurants, keyword, isFindRestaurant });
        })
        .catch(error => console.log(error))
});

app.listen(port, () => console.log(`Express is listening on localhost: ${port}.`));