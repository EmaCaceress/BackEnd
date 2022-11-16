const express = require("express")
const { Router } = express
const cartsController = require('../controller/cartsController')

const router = Router(Router)

//GET POR ID Y OBTENER TODOS
router.get('/carrito/:id/productos', async (req, res) => {//funciona fs y mongo
	console.log("Router Get for id:", req.params.id)
	res.status(200).json(await cartsController.getProductCartId(req.params.id))
})

//POST
router.post('/carrito', async (req, res) => {//funciona fs y mongo
	console.log("Router Get crear carrito")
	res.status(200).json(await cartsController.createCart())
})
router.post('/carrito/:id/productos/:id_prod', async (req, res) => {//funciona fs y mongo
	console.log("Router Post")
	res.status(200).json(await cartsController.upProduct(req.params.id, req.params.id_prod))
})

//ELIMINAR PRODUCTO POR ID O TODOS
router.delete('/carrito/:id', async (req, res) => {//funciona fs y mongo
	console.log("Router Delete Carrito")
	res.status(200).json(await cartsController.deleteCartId(req.params.id))
})
router.delete('/carrito/:id/productos/:id_prod', async (req, res) => {//funciona fs y mongo
	console.log("Router Delete Producto")
	res.status(200).json(await cartsController.deleteProductId(req.params.id, req.params.id_prod))
})
module.exports = router;
