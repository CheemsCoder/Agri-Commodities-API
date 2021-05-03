const mongoose = require('mongoose');
const timestamps=require('mongoose-timestamp');

// Comodity schema
const comoditySchema = new mongoose.Schema({
  _id: {type: String},
  cmdtyName: {type: String},
  cmdtyID: {type: String},
  marketID: {type: String},
  marketName: {type: String},
  users: [String],  
  priceUnit: {type: String},
  price: {type: Number},
  timestamp : {type:String}
});

const Comodity = mongoose.model('Comodity', comoditySchema);


module.exports = Comodity;
