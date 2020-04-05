var express = require('express')
var app = express()
var path = require('path')

// install and import "handlebars" view engine
var exphbs = require('express-handlebars');
// Handlebars Middlewares
app.engine('handlebars', exphbs());
// app.engine('handlebars', exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

var PORT = process.env.PORT || 4000;


// app.get('/', (req, res) => res.send('Hello World!'))
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

// Set static folder: This enables "public"folder files to be viewed
// app.use(express.static(path.join(__dirname, 'public')))

// #########################################################

/* ##### Simple REST API route #### */
// const members = require('./members')
// const logger = require("./middlewares/logger")
// Body parser middleware
app.use(express.json())
// to handle forms
app.use(express.urlencoded(
    { extended: false }
))



// homepage Route (using template engine "handlebars")
const members = require("./members")
app.get('/', (req, res) => {
    res.render('index', {
        title: "Member App",
        members
    });
    // console.log(members)
});



app.use('/api/members', require('./routes/api/members'))






// Init middleware
// app.use(logger);


app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})