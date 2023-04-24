const {router:productsController} = require("../products/controller.products") 
const cartsController = require("../carts/controller.carts")
const homeController = require("../home/controller.home")
const chatController = require("../chat/controler.chat")
const usersController = require('../users/controller.users')
const authController = require('../auth/controller.auth')
const viewsTemplateController = require('../viewsTemplate/controller.viewsTemplate')


const router = app => {
    app.use("/api/products",productsController)
    app.use("/api/carts",cartsController)
    app.use("/",homeController)
    app.use("/",chatController)
    app.use("/users",usersController)
    app.use('/', viewsTemplateController)
    app.use('/auth', authController)

}

module.exports = router