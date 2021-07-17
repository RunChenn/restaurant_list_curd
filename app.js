const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const routes = require('./routes');

// DB
require('./config/mongoose');

const app = express();
const port = 3000;

app.engine('hbs', exphbs(
    { defaultLayout: 'main',
      extname: '.hbs',
      helpers: require('./public/javascripts/handlebarHelpers')
}));
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(routes);

app.listen(port, () => console.log(`Express is listening on localhost: ${port}.`));