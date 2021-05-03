const createError = require('http-errors');
const Report = require('../models/report'); // Report schema
const Comodity = require('../models/comodity'); // Comodity Schema
const {HttpCodes, CustomErrors}=require('../response');

// Adding report in Report schema and Average price in Comodity schema
async function addReport(req,res,next) {
    var body = req.body.reportDetails;
    const report = new Report(body);
    
    await report.save() // Saving in report schema
    .then(async (result)=>{
      var comodity =await Comodity.findOne({marketID: result.marketID, cmdtyID: result.cmdtyID})
      
      const reportID = result._id;
      // If new comodity is added
      if(!comodity) {
        
        const com = new Comodity ({
            _id: reportID,
            cmdtyName: report.cmdtyName,
            cmdtyID: report.cmdtyID,
            marketID: report.marketID,
            marketName: report.marketName,
              
            priceUnit: "Kg",
            price: (report.price/report.convFctr),
            timestamp: Date.now()
        })
        
        com.users.push(report.userID)
        
        com.save() // Adding in comodity schema
        .then((result)=>{
          return res.status(HttpCodes.OK).send({reportID: reportID, status: 'success'});
          })
          .catch((error)=>{
            res.status(HttpCodes.BAD_REQUEST).send({status: 'Failure', Error: error, message: 'save failed'});
          });
      }
      // If comodity already added we change the average price
      else {
        var user = comodity.users
        const n= user.length
        user.push(result.userID) // Adding new user to the comodity schema
        const totalPrice = comodity.price*n+(result.price/result.convFctr);
        const avgPrice = totalPrice/(n+1); // Calculating the average price
        await Comodity.findOneAndUpdate({marketID: result.marketID, cmdtyID: result.cmdtyID},
            {$set: {
                price: avgPrice, // Changing the Average price
                users: user,
                timestamp: Date.now()
            }})
            .then((result)=>{
                res.status(HttpCodes.OK).send({reportID: comodity._id, status: 'success'});
              })
              .catch((error)=>{
                res.status(HttpCodes.BAD_REQUEST).send({success: false, Error: error, message: 'save failed'});
              });
      }
        
      })
      .catch((error)=>{
        return res.status(HttpCodes.BAD_REQUEST).send({success: false, Error: error, message: 'save failed'});
      });
}

module.exports = {
    addReport
}