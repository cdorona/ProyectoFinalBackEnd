const {Router} = require("express")

const router = Router()

const CartManager = require("../dao/CartManager.dao")

const cartManager = new CartManager(process.cwd()+"/src/files/cartsBase.json",process.cwd()+"/src/files/productsBase.json")

const Carts = require("../dao/models/carts.models")
const Products = require("../dao/models/products.models")

router.post("/",async(req,res)=>{
    try {
        const cartCreate = await Carts.create({})
        res.json(cartCreate)
    } catch (error) {
        res.status(400).json({error: 'Error in request'})
        console.log(error)        
    }

})

router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const { qty } = req.body
        console.log(cid,pid)
        const cart = await Carts.findById(cid)
        const prd = await Products.findById(pid)
        console.log("HOLA HOLA")
        const pIndex = cart.products.findIndex(p => `${p._id}` === `${prd._id}`)

        if (!qty) {
            pIndex >= 0 ? cart.products[pIndex].qty++ : cart.products.push({ _id: pid, qty: 1 })
        } else {
            pIndex >= 0 ? cart.products[pIndex].qty = qty : cart.products.push({ _id: pid, qty })
        }

        const updateCart = await Carts.findByIdAndUpdate(cid, cart, { returnDocument: 'after' })
        res.json(updateCart)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Bad request' })
    }
})

router.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const { products } = req.body
        const cart = await Carts.findById(cid)      
        products.forEach(async pid => await Products.findById(pid));
        cart.products = products
        const updateCart = await Carts.findByIdAndUpdate(cid, cart, { returnDocument: 'after' })
        res.json(updateCart)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Error in request' })
    }
})



router.get("/:cid", async(req,res)=>{
    try {
        const { cid } = req.params
        const cart = await Carts.findById(cid)
        res.json(cart)
    } catch (error) {
        res.status(400).json({error: 'Error in request'})
        console.log(error)        
    }
})

router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const cart = await Carts.findById(cid)
        const prd = await Products.findById(pid)
        const pIndex = cart.products.findIndex(p => `${p._id}` === `${prd._id}`)
        cart.products.splice(pIndex, 1)
        const updateCart = await Carts.findByIdAndUpdate(cid, cart, { returnDocument: 'after' })
        res.json(updateCart)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Error in request' })
    }
})

router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await Carts.findById(cid)      
        cart.products = []
        const updateCart = await Carts.findByIdAndUpdate(cid, cart, { returnDocument: 'after' })
        res.json(updateCart)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Error in request' })
    }
})


module.exports = router