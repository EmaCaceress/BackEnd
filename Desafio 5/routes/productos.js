const express = require("express")
const { Router } = express
const productosController = require('../controller/productosController')

const router = Router(Router)

router.get('/', (req, res) => {
    res.render('inicio')
})

router.get('/formulario', (req, res, next) => {
    res.render('subir')
})

router.post('/formulario', (req, res) => {
    console.log("DATOS ENVIADOS CORRECTAMENTE: ", req.body)
    res.status(200).redirect('/formulario')
})

router.get('/tabla', async (req, res, next) => {
    try {
        const usuarios = productosController.obtenerProductos();

        const data = {
            usuarios: usuarios,
            isEmpty: !usuarios.length,
            detailUrlBase: `${process.env.BASE_HOST}/usuarios`
        }
        res.render('usuarios', data);
    } catch (error) {
        next(error)
    }

})


module.exports = router;
