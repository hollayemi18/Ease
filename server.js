const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieparser = require('cookie-parser');

//middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieparser());
app.use('/user', require('./routes/userRoute'));

//connect mongodb
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_DB;

mongoose.connect(URI, (err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Database connected');
});
app.listen(PORT, () => {
  console.log(`sever running on ${PORT}......`);
});
