const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const citySchema = new Schema ({
    city: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});
 const City = mongoose.model('City', citySchema);

 module.exports = City;