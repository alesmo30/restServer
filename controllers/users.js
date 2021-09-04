const {response} = require('express') // esto es para poder tener los metodos del res, sin esto no aparecen 

const usuariosGET = (req, res = response) => { 
    res.json(
        {
            msg: 'get API - controller'
        }
    )
}

const usuariosPOST = (req, res = response) => { 
    const {nombre,id} = req.body 

    res.json(
        {
            msg: 'post API - controller',
            nombre,
            id
        }
    )
}

const usuariosPUT = (req, res = response) => { 

    const idURL = req.params.id
    res.json(
        {
            msg: 'put API - controller',
            idURL
        }
    )
}

const usuariosDELETE = (req, res = response) => { 
    res.json(
        {
            msg: 'delete API - controller'
        }
    )
}
const usuariosPATCH = (req, res = response) => { 
    res.json(
        {
            msg: 'patch API - controller'
        }
    )
}

module.exports= {
    usuariosGET,
    usuariosPATCH,
    usuariosDELETE,
    usuariosPOST,
    usuariosPUT
}