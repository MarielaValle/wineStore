var express = require('express');
var router = express.Router();

const productsController = require ('../controllers/productsController');
/* GET home page. */
router.get('/', productsController.raiz)

//router.get('/detail/:id',productsController.detail)
router.get('/detail/:id',productsController.detail);


/*** CREATE ONE PRODUCT ***/
router.get('/create/', productsController.formAlta); /* GET - Form to create */
//router.post('/create/', productsController.store); /* POST - Store in json o DB? */




module.exports = router;
