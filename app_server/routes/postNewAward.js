var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

/* POST new vendor */
router.post('/', ctrlMain.postNewAward);


module.exports = router;