const {Router} = require("express")

const router = Router()

const CartManager = require("../class/CartManager")

const cartManager = new CartManager(process.cwd()+"/src/files/cartsBase.json",process.cwd()+"/src/files/productsBase.json")

router.post("/",async(req,res)=>{

    
    const cart  = await cartManager.createCart(req.body);
    res.json(cart);

})

router.post("/:cid/product/:pid",async(req,res)=>{
    const {cid,pid}= req.params;
    
    const cart  = await cartManager.addProductToCart(cid,pid);
    res.json(cart);

})

router.get("/:cid", async(req,res)=>{
    const {cid} = req.params;
    const cart = await cartManager.getCartById(cid);
    res.json(cart);
})




module.exports = router