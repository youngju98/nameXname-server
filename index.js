const express = require('express');
const app = express();
var cors = require('cors');
const User = require('./models/user.js');
const router = require('./routes/router.js')(app, User);

app.use(cors());
/* DB connection setting */
const mongoose = require('mongoose');
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('DB connection good.');
})
mongoose.connect("mongodb+srv://1025hyj:hank2319@cluster0-5qnkt.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });

// Middleware setting
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));

// app.all('/*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

const server = app.listen(8000, () => {
  console.log('server is running at port 8000');
});