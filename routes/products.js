const express = require('express');
const router = express.Router();
//var middles = require('../middlewares/middles');


var multer = require('multer');
var path = require('path');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,  path.join(__dirname,'../public/imagenes'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})


var upload = multer({ storage: storage })


const productsController = require('../controllers/productsController');

/* GET home page. */

router.get('/', productsController.raiz);

//router.get('/detail/:id',productsController.detail)
router.get('/detail/:id', productsController.detail);


/*** CREATE ONE PRODUCT ***/
router.get('/create/', productsController.formAlta); /* GET - Form to create */
//router.post('/create/', productsController.store); /* POST - Store in json o DB? */

router.post('/create', upload.any(), productsController.crear);

/*** EDIT ONE PRODUCT ***/
router.get('/edit/:productId', productsController.edit); /* GET - Form to create */
router.put('/edit/:productId', upload.any(), productsController.update); /* PUT - Update in DB */

/*** DELETE ONE PRODUCT***/
router.get('/delete/:productId', productsController.delete);
router.delete('/delete/:productId', productsController.destroy);


module.exports = router;
