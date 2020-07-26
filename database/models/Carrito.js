module.exports = (sequelize, dataTypes) =>{
    let alias ='Carrito';
  
    let cols={
  
   
          id:{
  
              primaryKey:true,
              autoIncrement:true,
              allowNull:false,
              type:dataTypes.INTEGER
  
              },
           nombre:{
              type:dataTypes.STRING(100)
  
            },          
  
             id_usuario:{
                type:dataTypes.INTEGER,
                

             },
             id_producto:{
                type:dataTypes.INTEGER

             },
             fecha:{
                type:dataTypes.DATE
             },
             cantidad:{
                type:dataTypes.INTEGER

             },
             precio_venta:{

                type:dataTypes.INTEGER
             },
             numero_ticket:{
                type:dataTypes.INTEGER
             }
   
      
    }
      let config= {
          tableName: "carrito",
          timestamps: false
      }
      const Carrito = sequelize.define(alias,cols,config);
          
     Carrito.associate=(models)=>{
          Carrito.belongsTo(models.Producto,{
              as: 'Producto',
              foreingKey:'id_producto',
            
            
            });
            Carrito.belongsTo(models.Usuario,{
                as:'Usuario',
                foreingKey:'id_usuario'

     });
  
      return Carrito;
    }
  }