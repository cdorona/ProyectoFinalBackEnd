const {router:productsController} = require("../products/controller.products") 
const cartsController = require("../carts/controller.carts")
const homeController = require("../home/controller.home")
const chatController = require("../chat/controler.chat")


const router = app => {
    app.use("/api/products",productsController)
    app.use("/api/carts",cartsController)
    app.use("/",homeController)
    app.use("/",chatController)
}

module.exports = router