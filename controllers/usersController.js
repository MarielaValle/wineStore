var modelUsers = require("../data/users.js");


const { check, validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');


let usersController = {
  

  loginForm: (req, res) => {
    let data = {
      Formulario: "UsuarioRegistrado",
      User: 'null'

    };
    res.render("usuarios", { data: data });

  },


  login: (req, res) => {
     
     let { email, contrasenia } = req.body; // se toman los datos del formulario
     let usuarioExistente = modelUsers.Consulta(email);
     if (usuarioExistente != null && (bcrypt.compareSync(contrasenia, usuarioExistente.Contrasenia))) {
       user = {
        id: usuarioExistente.id,
        Nombre: usuarioExistente.Nombre,
        Apellido: usuarioExistente.Apellido,
        Email: usuarioExistente.Email,
        Categoria: usuarioExistente.Categoria,
        Imagen: usuarioExistente.Imagen,
      };
 
       req.session.user = user;
      
       res.cookie('userCookie', user.id, { maxAge: 70000 * 120 })
       res.redirect("/users/profile");
 
     }  else{


      let data = { Formulario: "UsuarioRegistrado" };

      res.render("usuarios", { data: data, errores: [{ msg: 'Credenciales inválidas' }] });


    }
  
},


  registroForm: (req, res) => {
    let data = {
  Formulario: "FormularioRegistro",
};

res.render("usuarios", { data: data });


  },

// funcion para realizar el registro de nuevo ususario
registrarse: (req, res) => {

  let errores = validationResult(req);
  if (errores.isEmpty()) {


    let {
      nombre,
      apellido,
      email,
      contrasenia,
      contrasenia2,
      categoria,
    } = req.body;


    let imagen = req.file.filename; // se toma el nombre del archivo
    if (contrasenia == contrasenia2) {

      contrasenia = bcrypt.hashSync(contrasenia, 10);

      modelUsers.Alta(nombre, apellido, email, contrasenia, categoria, imagen);
      res.redirect("/users/login");
    } else {

      let data = { Formulario: 'FormularioRegistro' };
      res.render("usuarios", { data: data, errores: [{ msg: 'Las contraseñas no coinciden' }] });
    }


  } else {

    let data = { Formulario: 'FormularioRegistro' };

    res.render("usuarios", { data: data, errores: errores.errors });
  }
},
  //
  /*let formularioEdicion = (req, res) => {
    res.render("index", { title: "Formulario de Edicion" });
    // momentaneamente sin utilizar.
    */

  profile: (req, res) => {

    if (req.session.user) {
      let { Email } = req.session.user;
      let usuarioExiste = modelUsers.Consulta(Email);
      // console.log(usuarioExiste);
      if (usuarioExiste != null) {
        let data = {
          Formulario: "MisDatos",
          User: usuarioExiste,
        };
        res.render("usuarios", { data: data });
      } else {
        res.redirect("/users/login");
      }
    } else {
      res.redirect("/users/login");
    }
  },


    logout: (req, res) => {
        
        req.session.user = undefined;
        

        let data = { 
          Formulario: "UsuarioRegistrado" ,
          mensaje:'Se cerró la sesión exitosamente'
        }
        res.render("usuarios", { data:data });
    
     
    },

  // funcion borrador hasta que se completa cada controlador.
  /*function prueba(res, req) {
    res.send("corriendo");
  }*/

};

module.exports = usersController;    