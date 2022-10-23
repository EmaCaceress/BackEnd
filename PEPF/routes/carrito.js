const express = require("express")
const { Router } = express
const carritoController = require('../controller/carritoController')

const router = Router(Router)

//GET POR ID Y OBTENER TODOS
router.get('/carrito/:id/productos', (req, res) => {
    console.log("Router Get for id:", req.params.id)
    res.status(200).json(carritoController.obtenerProductosCarrito(req.params.id))
})

//POST
router.post('/carrito/', (req, res) => {
    console.log("Router Get")
    res.status(200).json(carritoController.crearCarrito())
})
router.post('/carrito/:id/productos/:id_prod', (req, res) => {
    console.log("Router Post")
    res.status(200).json(carritoController.subirProductoCarrito(req.params.id, req.params.id_prod))
})

//ELIMINAR PRODUCTO POR ID O TODOS
router.delete('/carrito/:id', (req, res) => {
    console.log("Router Delete Carrito")
    res.status(200).json(carritoController.eliminarCarrito(req.params.id))
})
router.delete('/carrito/:id/productos/:id_prod', (req, res) => {
    console.log("Router Delete Producto")
    res.status(200).json(carritoController.eliminarId(req.params.id, req.params.id_prod))
})
module.exports = router;
