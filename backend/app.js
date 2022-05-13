let express = require('express'),
    database = require('./database'),
    bodyParser = require('body-parser');

const createError = require('http-errors')
// Connect mongoDB
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Database connected")
 },
 error => { 
  console.log("Database could't be connected to:" + error)
 }
)

const stockEndPoint = require('../backend/routes/stock.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
const cors = require('cors')
app.use(cors());

// API
app.use('/api', stockEndPoint)

// Create port
const port = process.env.PORT || 4000;                       
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404
app.use((req, res, next) =>{
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next){
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});