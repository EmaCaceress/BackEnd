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
router.post('/productos', auth, (req, res) => {
    console.log("Router Post", req.body)
    res.status(200).json(productsController.upProduct(req.body))
})
//GET
router.get('/productos', (req, res) => {
    console.log("Router Get")
    res.status(200).json(productsController.getAll())
})

router.get('/productos/:id', (req, res) => {
    console.log("Router Get for id:", req.params.id)
    res.status(200).json(productsController.getId(req.params.id))
})
//PUT
router.put('/productos/:producto', auth, (req, res) => {
    console.log("Router Put")
    res.status(200).json(productsController.edit(req.params))
})
//DELETE
router.delete('/productos/:id', auth, (req, res) => {
    console.log("Router Delete")
    res.status(200).json(productsController.deleteId(req.params.id))
})
module.exports = router;
