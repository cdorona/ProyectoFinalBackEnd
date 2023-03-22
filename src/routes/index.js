const {router:productsController} = require("../products/controller.products") 
const cartsController = require("../carts/controller.carts")
const homeController = require("../home/controller.home")


const router = app => {
    app.use("/api/products",productsController)
    app.use("/api/carts",cartsController)
    app.use("/",homeController)
}

module.exports = router