var db = require('../database/models/index.js');
const { Sequelize } = require('../database/models/index.js');



let productsController = {


	raiz: (req, res) => {

		db.sequelize.query('SELECT * FROM productos')

			.then(function (resultados) {

				products = resultados[0];

			});
		res.render('products', { products })
	},

	detail: (req, res) => {

     db.Producto.findByPk(req.params.id)
		    
	.then(function (producto) {

	res.render('detail', { producto });
			})
	}


}

module.exports = productsController;    