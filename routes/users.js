var express = require("express");
var router = express.Router();
var usersController = require("../controllers/usersController");
var middles = require("../middleware/middles");
const { check, validationResult, body } = require('express-validator');


router.get("/login", usersController.FormIngreso);
router.post("/login", usersController.Ingreso);
router.get("/register", usersController.FormRegistro);
router.post("/register", middles.CargarAvatar, [
    check('email').isEmail().withMessage('Debe poner un email válido'),
    check('contrasenia').isLength({ min: 8 }).withMessage('Debe poner una contraseña de 8 caracteres')
],
     usersController.Registrando);
router.get("/:id/edit", usersController.FormEdicion);
router.put("/:id", usersController.Editando);
router.get("/profile", usersController.Detalle);
router.get("/logout", usersController.Salir )



module.exports = router;
