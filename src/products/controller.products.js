
const {Router} = require("express")

const router = Router()

const ProductManager = require("../class/ProductManager")

const productManager = new ProductManager(process.cwd()+"/src/files/productsBase.json")



router.get("/",async(req,res)=>{
    const {limit} = req.query
    
    const products = await productManager.getProduct()

    const seleccion = limit ? products.slice(0, limit) : products

    res.json(seleccion)
})
router.get("/:id", async(req,res)=>{

    const {id} = req.params
    
    
    const products = await productManager.getProductById(id)

    res.json({products})

})

router.post("/",async(req,res)=>{
    
    const prod  = await productManager.addProduct(req.body);
    res.json(prod);
    vinculoSocket();

})

router.patch("/:id",async(req,res)=>{
    const {id} = req.params;
    const dataUpdate = req.body;
    const prodUpdate = await productManager.updateProductById(id,dataUpdate);
    res.json(prodUpdate)

})

router.delete("/:id",async(req,res)=>{
    const {id} = req.params;
    
    const prodDelete = await productManager.deleteProductById(id);
    res.json(prodDelete)

})

const vinculoSocket =async()=>{
    const products = await productManager.getProduct();
    io.emit("productTiempoReal",{products})
}



module.exports = {router,productManager}