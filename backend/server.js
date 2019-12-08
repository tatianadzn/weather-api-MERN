const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});

const favouritesRouter = require('./routes/favourites');
const weatherRouter = require('./routes/weather');

app.use('/favourites', favouritesRouter);
app.use('/weather', weatherRouter);

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});