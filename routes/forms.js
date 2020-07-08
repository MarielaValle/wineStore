var express = require('express');
var router = express.Router();

const formsController = require ('../controllers/formsController');

/* GET home page. */
router.get('/', formsController.raiz);


module.exports = router;
