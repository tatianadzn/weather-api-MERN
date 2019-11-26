const router = require('express').Router();
const axios = require('axios');

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?appid=41210752a269dfb2e2a8167a0910c3a1&';


router.route('/').get((req, res) => {
    axios(API_URL + 'q=' + req.query.city)
        .then(response => res.json(response.data))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/coordinates/').get((req, res) =>{
    axios(API_URL + 'lat=' + req.query.lat + '&lon=' + req.query.lon)
        .then(response => res.json(response.data))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;