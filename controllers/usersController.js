var modelUsers = require("../data/users.js");
const { check, validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');

// funcion para devolver el formulario de ingreso de usuario ya registrado
let formularioIngreso = (req, res) => {
  let data = {
    Formulario: "UsuarioRegistrado",
    User: 'null'
   
  };
  res.render("usuarios", { data: data });
};
// funcion para la validacion de ususario registrado
let validacionUsuario = (req, res) => {
  let { email, contrasenia } = req.body; // se toman los datos del formulario
  let usuarioExistente = modelUsers.Consulta(email);
  if (usuarioExistente != null && (bcrypt.compareSync(contrasenia, usuarioExistente.Contrasenia))){
    let user = {
      id: usuarioExistente.id,
      Nombre: usuarioExistente.Nombre,
      Apellido: usuarioExistente.Apellido,
      Email: usuarioExistente.Email,
      Categoria: usuarioExistente.Categoria,
      Imagen: usuarioExistente.Imagen,
    };

    user = req.session.user
    
    res.cookie('userCookie', user.id, { maxAge: 70000 * 120 })
    res.redirect("/users/profile");

  } else { 
    
    
    let data = { Formulario:"UsuarioRegistrado"  };
    res.render("usuarios",{data:data,errores:[{msg:'Credenciales inválidas'}]});
  }
 
};
// funcion para devolver el formulario de registro de nuevo usuario
let formularioRegistro = (req, res) => {
  let data = {
    Formulario: "FormularioRegistro",
  };
  res.render("usuarios", { data: data });
};
// funcion para realizar el registro de nuevo ususario
let registrandoUsuario = (req, res) => {

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
       res.render("usuarios",{data:data,errores:[{msg:'Las contraseñas no coinciden'}]});
    }


  } else {

    let data = { Formulario: 'FormularioRegistro' };

    res.render("usuarios", { data: data, errores: errores.errors });
  }
};
  //
  /*let formularioEdicion = (req, res) => {
    res.render("index", { title: "Formulario de Edicion" });
    // momentaneamente sin utilizar.
    */
  
  let detalleUsuario = (req, res) => {
    console.log(req.session.user);
    if (req.session.user) {
      let { Email } = req.session.user;
      let usuarioExiste = modelUsers.Consulta(Email);
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
  };
  let logout = (req, res) => {

    req.session.destroy();
    res.cookie('userCookie', null, { maxAge: 1 });
    
   
    res.redirect('/')
  }

  // funcion borrador hasta que se completa cada controlador.
  function prueba(res, req) {
    res.send("corriendo");
  }
     
  module.exports = {
    FormIngreso: formularioIngreso,
    Ingreso: validacionUsuario,
    FormRegistro: formularioRegistro,
    Registrando: registrandoUsuario,
    FormEdicion: prueba,
    Editando: prueba,
    Detalle: detalleUsuario,
    Salir: logout
  };
