const mongoose = require('mongoose');
const timestamps=require('mongoose-timestamp');

// Report schema
const reportSchema = new mongoose.Schema({
  userID: {type: String},
  marketID: {type: String},
  marketName: {type: String},
  cmdtyID: {type: String},
  marketType: {type: String},
  cmdtyName: {type: String},  
  priceUnit: {type: String},
  convFctr: {type: Number},
  price: {type: Number}
});
reportSchema.plugin(timestamps);
const Report = mongoose.model('Report', reportSchema);


module.exports = Report;
