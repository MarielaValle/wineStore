var multer = require('multer');
var path = require('path');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/images/productos'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})


var upload = multer({ storage: storage })

module.exports = cargaProducto;


