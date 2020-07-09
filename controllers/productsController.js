const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//const formatPrice = (price,discount) => toThousand(Math.round(price*(1-(discount/100))));

let productsController={

    raiz: (req, res) => {
		
		res.render("products",{products});
	},
    detail:(req,res) => {
           
		   let id = req.params.id 
		   products.forEach(function(product){
           if(product.id==id){
			   producto=product
		   }
		    

		   });
			
		   res.render('detail',{producto}); 
	},
	
   
	formAlta:(req, res) => {
		let data = {
		  Formulario: 'NuevoProducto',
		};
		res.render('formProducto',{data:data});
	  
	}
};

module.exports = productsController;    