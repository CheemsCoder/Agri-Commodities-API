const router = require('express').Router();
const {getComodity} = require('../controller/comodityController');

// GET '/reports' route to get average comodity price
router.get('/reports', getComodity);

module.exports = router