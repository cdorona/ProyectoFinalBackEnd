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

router.put("/:cid/product/:pid",async(req,res)=>{
    
    try {
        const { cid, pid } = req.params
        const cart = await Carts.findById(cid)
        const prd = await Products.findById(pid)
        const pIndex = cart.products.findIndex(p => `${p._id}` === `${prd._id}`)
        pIndex >= 0 ? cart.products[pIndex].qty++ : cart.products.push({_id: pid, qty: 1}) 
        const updateCart = await Carts.findByIdAndUpdate(cid, cart, {returnDocument: 'after'})
        res.json(updateCart)
    } catch (error) {
        console.log(error)        
        res.status(400).json({error: 'Error in request'})
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




module.exports = router