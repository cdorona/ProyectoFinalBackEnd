const { Router } = require('express')
const router = Router()

const Products = require("../dao/models/products.models")

router.get('/', async (req, res) => {
    const products = await Products.find().lean()
    console.log(products)
    res.render('home.handlebars', {
        products,
        title: 'Productos',
        style: 'style.css'
    })
})

router.get('/realtimeproducts', async (req, res) => {
    const products = await Products.find().lean()
    console.log(products)
    res.render('realtimeproducts.handlebars', {
        products,
        title: 'realtimeproducts',
        style: 'style.css'
    })
})

module.exports = router