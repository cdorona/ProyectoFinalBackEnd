
const {Router} = require("express")

const router = Router()


const {productManager} = require("../products/controller.products")

router.get('/', async (req, res) => {
    const products = await productManager.getProduct()
    
    res.render('home.handlebars', {
        products,
        title: 'Productos',
        style: 'style.css'
    })
})

router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProduct()
    
    res.render('realTimeProducts.handlebars', {
        products,
        title: 'Productos en Tiempo Real',
        style: 'style.css'
    })
})

module.exports = router