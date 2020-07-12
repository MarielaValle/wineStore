const fs = require('fs');
const path = require('path');
const db = path.join(__dirname, "..") + "/database/models/index.js"

//hace caer la aplicación, no logra requerir sequelize
//const db = require('../database/models/index.js');

//ar model = require(path.join(__dirname, ('../database/models/index')))(sequelize, Sequelize.DataTypes);

const productsFilePath = path.join(__dirname, '../data/productos.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

saveProducts = function () {
	
	let productsJson = JSON.stringify(products);
	fs.writeFileSync('productsFilePath', productsJson)// lo pongo entre comillas porque ahora no quiero que lo guarde en data porque me lo desordena

}

//const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//const formatPrice = (price,discount) => toThousand(Math.round(price*(1-(discount/100))));

let productsController = {

	// con json	 
	/*aiz: (req, res) => {

		res.render("products", { products });
	},	*/	
            //con sequelize
	        raiz: (req, res) => {

			db.sequelize.query('SELECT * FROM productos')
		
			  .then(function(resultados){
		 
					 products = resultados[0];
					
			  });
			  res.render('products',{products})
			},
              
		

	
	detail: (req, res) => {

		let id = req.params.id
		products.forEach(function (product) {
			if (product.id == id) {
				producto = product
			}


		});

		res.render('detail', { producto });
	},


	formAlta: (req, res) => {
		let data = {
			Formulario: 'NuevoProducto',
		};
		res.render('formProducto', { data: data });

	},
	crear: (req, res, next) => {      //crear producto nuevo
		let lastId = products.length;
		mensaje={
			mensaje:undefined
		}
		const productToCreate = {
			id: lastId + 1,
			nombre: req.body.nombre,
			color: req.body.color,
			categoría: req.body.categoría,
			variedad: req.body.variedad,
			precio: parseFloat(req.body.precio),
			descuento: parseFloat(req.body.descuento),
			descripcionCorta: req.body.descripcionCorta,
			crianza: req.body.crianza,
			descripcionLarga: req.body.descripcionLarga,
			característica: req.body.característica,
			imagen: req.files[0].filename
		};

		products.push(productToCreate);
		saveProducts(products)

	    res.send('Agregado!')
		res.redirect('products/create')

	},
// Update - Form to edit
edit: (req, res) => {
	// Do the magic
	const productToEdit = products.find(item => item.id == req.params.productId);
    product=productToEdit;
	let data = {
		Formulario: 'ModificarProducto',
		
	};
	res.render('formProducto', {data, product});



},


// Update - Method to update
update: (req, res) => {
	// Do the magic
	let productEdited = null;
	products.forEach(product => {
		if(product.id == req.params.productId) {
            product.id=req.body.id;
			product.nombre=req.body.nombre,
			product.color=req.body.color,
			product.categoría= req.body.categoría,
			product.variedad=req.body.variedad,
			product.precio=parseFloat(req.body.precio),
			product.descuento= parseFloat(req.body.descuento),
			product.descripcionCorta= req.body.descripcionCorta,
			product.crianza = req.body.crianza,
			product.descripcionLarga= req.body.descripcionLarga,
			product.característica= req.body.característica,
			product.imagen=req.files[0].filename

			productEdited = product;
		}
	});
    
	
	saveProducts(products);

	res.send("Editado!");

},

delete: (req, res) => {
	const productToErase = products.find(item => item.id == req.params.productId);
    product=productToErase;
	let data = {
		Formulario: 'DeleteProducto',
		
	};
	res.render('formProducto', {data, product});


	
	
},

// Delete - Delete one product from DB
destroy : (req, res) => {
	// Do the magic
	let productsNew;
	productsNew=products.filter(function (product){

		product.id != req.params.productId
		
	});

	products=productsNew;
	 saveProducts(products);
	
	res.send("Eliminado!");
}



};

module.exports = productsController;    