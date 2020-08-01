var db = require('../database/models/index.js');
const { Sequelize } = require('../database/models/index.js');


let dashboardController = {

    raiz: (req, res) => {

    
            res.render("dashboard");
        },
        

colorTinto: (req, res) => {

    db.Producto.findAll({

        where: {
            color: 'tinto'
        }

    })

        .then(productos => {
            
        console.log(productos.length)
            cantidadTinto = productos.length
            res.render("dashboard", { cantidadTinto });
        })
        
        .catch(error => console.log(error));


},


colorBlanco: (req, res) => {

    db.Producto.findAll({

        where: {
            color: 'blanco'
        }

    })

        .then(productos => {
            
        console.log(productos.length)
            cantidadBlanco = productos.length
            res.render("dashboard", { cantidadBlanco });
        })
        
        .catch(error => console.log(error));


},


colorBlanco: (req, res) => {

    db.Producto.findAll({

        where: {
            color: 'blanco'
        }

    })

        .then(productos => {
            
        console.log(productos.length)
            cantidadBlanco = productos.length
            res.render("dashboard", { cantidadBlanco });
        })
        
        .catch(error => console.log(error));


},


categoriaPremium: (req, res) => {

    db.Producto.findAll({

        where: {
          categoria  : 'premium'
        }

    })

        .then(productos => {
            
        console.log(productos.length)
            cantidadPremium = productos.length
            res.render("dashboard", { cantidadPremium });
        })
        
        .catch(error => console.log(error));


},


categoriaClasico: (req, res) => {

    db.Producto.findAll({

        where: {
            categoria: 'clasico'
        }

    })

        .then(productos => {
            
        console.log(productos.length)
            cantidadClasico = productos.length
            res.render("dashboard", { cantidadClasico });
        })
        
        .catch(error => console.log(error));


},


variedad: (req, res) => {

    /*db.Producto.findAll()

        .then(productos => {
 

            console.log(productos)
            res.render("dashboard", { productos});
        })
        
        .catch(error => console.log(error));


},*/
    db.sequelize.query('SELECT DISTINCT variedad FROM productos')

			.then(function (resultados) {

                variedad = resultados[0];
                console.log(variedad)
               
                res.send(variedad)
				//res.render('dashboard',{variedad} )

			})

			.catch(error => console.log(error));


        },


        sumatoriaPrecios: (req, res) => {

        db.Producto.sum('precio')
        .then(function(resultado){

           res.send(resultado)
            
           
        })
        .catch(error => console.log(error));
           
        },

        cantidadProductos: (req, res) => {

            db.Producto.count('id')

            .then(function(resultado){

                totalProductos=resultado

               console.log(resultado)

               res.render('dashboard',{totalProductos})
                
               
            })
            .catch(error => console.log(error));
               
            },
    
    
        

        cantidadUsuarios: (req, res) => {

            db.Usuario.count('id')

            .then(function(resultado){
                totalUsuarios=resultado
               console.log(resultado)

               res.render('dashboard',{totalUsuarios})
                
               
            })
            .catch(error => console.log(error));
               
            },
            precioMax: (req, res) => {

                db.Producto.max('precio')
    
                .then(function(resultado){
                    
                   console.log(resultado)
    
                   //res.render('dashboard',{resultado})
                    
                   
                })
                .catch(error => console.log(error));
                   
                },

                precioMin: (req, res) => {

                    db.Producto.min('precio')
        
                    .then(function(resultado){
                        
                       console.log(resultado)
        
                       //res.render('dashboard',{resultado})
                        
                       
                    })
                    .catch(error => console.log(error));
                       
                    }
        

    
    
            
    



    
}

module.exports = dashboardController;    
