const express = require("express");
const { Router } = express
const productsController = require('../controller/productsController')
const router = Router(Router)

const auth = function (req, res, next) {
	console.log("entraste a la autenticacion", req.session.admin)
	if (req.session.admin)
		return next();
	else
		return res.status(401).json("No tiene permitido este acceso");
}
//POST
router.post('/productos', async (req, res) => {//funciona fs y mongo
	console.log("Router Post")
	res.status(200).json(await productsController.upProduct(req.body))
})
//GET
router.get('/productos', async (req, res) => {//funciona fs y mongo
	console.log("Router Get")
	res.status(200).json(await productsController.getAll())
})

router.get('/productos/:id', async (req, res) => {//funciona fs y mongo
	console.log("Router Get for id:", req.params.id)
	res.status(200).json(await productsController.getId(req.params.id))
})
//PUT
router.put('/productos', async (req, res) => {//funciona fs y mongo
	console.log("Router Put", req.body)
	res.status(200).json(await productsController.edit(req.body))
})
//DELETE
router.delete('/productos/:id', async (req, res) => {//funciona fs y mongo
	console.log("Router Delete")
	res.status(200).json(await productsController.deleteId(req.params.id))
})
module.exports = router;
