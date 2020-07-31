var express = require('express');
var router = express.Router();



const dashboardController = require('../controllers/dashboardController');
/* GET home page. */

router.get('/', dashboardController.raiz);

router.get('/variedad',dashboardController.variedad);


router.get('/colorTinto',dashboardController.colorTinto);

router.get('/colorBlanco',dashboardController.colorBlanco);

router.get('/categoriaPremium',dashboardController.categoriaPremium);

router.get('/categoriaClasico',dashboardController.categoriaClasico);



module.exports = router;