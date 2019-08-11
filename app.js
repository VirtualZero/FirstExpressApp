const express = require('express');
const path = require('path')
const members = require('./Members')
const exphbs = require('express-handlebars')
const logger = require('./middleware/logger')
const app = express();

// To use middleware (init middleware):
//app.use(logger)

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Render handlebars view
app.get('/', (req, res) => res.render('index', {
    title: 'Member App/API',
    members
}))

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Members API Routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5001;

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server running on port ${PORT}.`)
});
