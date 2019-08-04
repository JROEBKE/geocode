// load environment variables
require('dotenv').config();

// grab our dependencies
const express    = require('express');
  app            = express();
  bodyParser     = require('body-parser');
  expressLayouts = require('express-ejs-layouts');
  argv           = require('minimist')(process.argv.slice(2));
  expressValidator = require('express-validator');
  helmet         = require('helmet'); //security validator
  swaggerJSDoc   = require('swagger-jsdoc'); //swagger API doc


// configure our application ===================

// tell express where to look for static assets
app.use(express.static(__dirname + '/public'));

// use body parser to grab info from a form
app.use(bodyParser.urlencoded({ extended: true })); //true changed to false for validation test
app.use(bodyParser.json());

//Validation
app.use(expressValidator());

//helmet security
app.use(helmet())


//Set var port = 8080 as default;
var   port = process.env.PORT || 8080;
if(argv.port !== undefined)
    port = argv.port;
else
    console.log('No --port=xxx specified, taking default port ' + port + '.')

//Set var domain = localhost as default;
var domain =  process.env.DOMAIN || 'localhost';
if(argv.domain !== undefined)
    domain = argv.domain;
else
    console.log('No --domain=xxx specified, taking default hostname "localhost".')

// Set and display the application URL
var applicationUrl = 'http://' + domain + ':' + port;
  console.log('server running on ' + applicationUrl);

// set the routes =============================
app.use(require('./app/routes'));

// start our server ===========================
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
