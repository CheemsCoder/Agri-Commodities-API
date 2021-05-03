const router = require('express').Router();
const {addReport} = require('../controller/reportController');

// POST '/reports' route to insert new report in Report schema
router.post('/reports', addReport);

module.exports = router