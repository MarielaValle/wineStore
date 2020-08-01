var express = require('express');
var router = express.Router();



const dashboardController = require('../controllers/dashboardController');
/* GET home page. */

router.get('/', dashboardController.raiz);

router.get('/cantidadProductos',dashboardController.cantidadProductos);

router.get('/cantidadUsuarios',dashboardController.cantidadUsuarios);

router.get('/variedad',dashboardController.variedad);


router.get('/sumatoriaPrecios',dashboardController.sumatoriaPrecios);




router.get('/colorTinto',dashboardController.colorTinto);

router.get('/colorBlanco',dashboardController.colorBlanco);

router.get('/categoriaPremium',dashboardController.categoriaPremium);

router.get('/categoriaClasico',dashboardController.categoriaClasico);

router.get('/precioMaximo',dashboardController.precioMax);

router.get('/precioMinimo',dashboardController.precioMin);

module.exports = router;