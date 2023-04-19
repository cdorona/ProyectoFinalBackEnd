
const { Router } = require("express")


const router = Router()

const ProductManager = require("../dao/ProductManager.dao")

const productManager = new ProductManager(process.cwd() + "/src/files/productsBase.json")

const Products = require("../dao/models/products.models")


router.post("/", async (req, res) => {
    try{
    const { title, code, description, price, thumbnail, stock, category } = req.body

    const newProduct = {
        title,
        code,
        description,
        price,
        thumbnail,
        stock,
        category
    }

    const product = await Products.create(newProduct)

    res.json(product);
    vinculoSocket();
    } catch (error) {
        res.status(400).json({error: 'Error in request'})
        console.log({ error })
    }  
})

router.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, query = '', sort = 'asc' } = req.query
        
        const pQuery = {
            category: {
                $regex: query,
                $options: 'i'
            }
        }

        const pOptions = {
            limit,
            page,
            sort: {
                price: sort
            }
        }

        const products = await Products.paginate(pQuery, pOptions)
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
            prevLink: hasPrevPage ? `http://localhost:8080/api/products?limit=${limit}&page=${prevPage}&query=${query}&sort=${sort}` : null,
            nextLink: hasNextPage ? `http://localhost:8080/api/products?limit=${limit}&page=${nextPage}&query=${query}&sort=${sort}` : null
        }
        
        res.json(resObj)

    } catch (error) {
        res.status(400).json({ error: 'Error in request' })
        console.log({ error })
    }
})


router.get("/:id", async (req, res) => {
    try{
    const { id } = req.params

    const products = await Products.findById(id)

    res.json({ products })
    }
    catch (error) {
        res.status(400).json({error: 'Error in request'})
        console.log({ error })
    }

})

router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const dataUpdate = req.body;
        const prodUpdate = await Products.findByIdAndUpdate(id, dataUpdate, { returnDocument: "after" });
        res.json(prodUpdate)
    }
    catch (error) {
        res.status(400).json({error: 'Error in request'})
        console.log({ error })
    }

})

router.delete("/:id", async (req, res) => {
    try{const { id } = req.params;

    const prodDelete = await Products.findByIdAndDelete(id);
    res.json(prodDelete)
    } catch(error){
        res.status(400).json({error: 'Error in request'})
        console.log({ error })
    }

})


const vinculoSocket =async()=>{
    const products = await productManager.getProduct();
    io.emit("productTiempoReal",{products})
}



module.exports = { router, productManager }