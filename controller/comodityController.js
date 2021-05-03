
const createError = require('http-errors');
const Report = require('../models/report'); // Report schema
const Comodity = require('../models/comodity'); // Comodity Schema
const {HttpCodes, CustomErrors}=require('../response');

// Function to get Average Comodity price from comodity schema
async function getComodity(req,res,next) {
    
    const _id = req.query.reportID;
    
    await Comodity.findOne({_id:_id})
    .then((result)=>{
        return res.status(HttpCodes.OK).send(result);
        })
        .catch((error)=>{
          res.status(HttpCodes.BAD_REQUEST).send({status: 'Failure', Error: error, message: 'save failed'});
        });  
}

module.exports = {
    getComodity
}
