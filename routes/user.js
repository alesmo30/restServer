

const {Router} = require('express')
const {check} = require('express-validator')
const { usuariosGET, usuariosPUT, usuariosPOST, usuariosDELETE, usuariosPATCH } = require('../controllers/users')
const { esRoleValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')


const router = Router()

//aqui solo  deberia la ruta, por buenas practicas el controlador deberia estar en otro archivo
router.get('/', usuariosGET ) // no se pone () en usuariosGET porque no lo estoy ejecutando la estoy la estoy referenciando
router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom((id) => existeUsuarioPorID(id)),
    check('role').custom(esRoleValido),
    validarCampos
],usuariosPUT)
//los checks son middlewares de verificacion,(recordar que tiene el next que hace pasar de middleware)
//el validorCampos, si no paso no llega si quiera a ejecutar el callback del post
router.post('/',[
    check('correo', 'el correo no es valido').isEmail(),
    check('correo').custom((correo) => emailExiste(correo)),
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'la contraseña es obligatoria y debe contener mas de 6 caracteres ').isLength({min : 6}),
    //check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']), -> se debe validar sobre una lista dinamica en una db
    check('role').custom((rol) => esRoleValido(rol)),
    validarCampos

] 
, usuariosPOST)
router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom((id) => existeUsuarioPorID(id)),
    validarCampos
],usuariosDELETE)
router.patch('/', usuariosPATCH)

module.exports = router