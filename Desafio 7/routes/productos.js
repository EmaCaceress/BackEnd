const express = require("express")
const { Router } = express

const router = Router(Router)

router.get('/', (req, res) => {
    console.log("Router Get")
    res.render('home')
})

module.exports = router;
