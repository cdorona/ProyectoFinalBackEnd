const { Router } = require('express')
const router = Router()

const Products = require("../dao/models/products.models")
const Carts = require("../dao/models/carts.models")

router.get('/products', async (req, res) => {
    const { limit = 2, page = 1, query = '', sort = 'asc' } = req.query
        
    
    const pOptions = {
        limit,
        page,
        
    }
    
    const products = await Products.paginate({}, {limit,page,lean:true})
    const { docs: payload, totalPages, prevPage, nextPage, page : npage, hasPrevPage, hasNextPage } = products
    const resObj = {
        status: 'success',
        payload,
        totalPages, 
        prevPage, 
        nextPage, 
        npage, 
        hasPrevPage, 
        hasNextPage,
        prevLink: hasPrevPage ? `http://localhost:8080/products?limit=${limit}&page=${prevPage}` : null,
        nextLink: hasNextPage ? `http://localhost:8080/products?limit=${limit}&page=${nextPage}` : null
    }

    
    res.render('home.handlebars', {
        products: resObj,
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

router.get('/cart/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await Carts.findById(cid).lean()
        console.log(cart)
        res.render('carts.handlebars', {
            cart,
            title: 'Carrito',
            style: 'style.css'
        })
    } catch (error) {
        res.status(400).json({ error: 'Bad request' })
        console.log(error)
    }
})


module.exports = router