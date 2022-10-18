const express = require("express")
const { Router } = express
const productosController = require('../controller/productosController')

const router = Router(Router)

router.post('/productos', (req, res) => {
    console.log("Router Post")
    res.status(200).json(productosController.subirProducto(req))
})

router.get('/', (req, res) => {
    console.log("Router Get")
    res.render('home')
})

router.get('/productos', (req, res) => {
    console.log("Router Get")
    res.status(200).json(productosController.obtenerProductos())
})

router.get('/productos', (req, res) => {
    console.log("Router Get")
    res.status(200).json(productosController.obtenerProductos())
})

router.get('/productos/:id', (req, res) => {
    console.log("Router Get for id:", req.params.id)
    res.status(200).json(productosController.obtenerProductoId(req.params.id))
})

router.put('/productos/:producto', (req, res) => {
    console.log("Router Put")
    res.status(200).json(productosController.modificarProducto(req.params))
})

router.delete('/productos/:id', (req, res) => {
    console.log("Router Delete")
    res.status(200).json(productosController.eliminarId(req.params.id))
})
module.exports = router;
