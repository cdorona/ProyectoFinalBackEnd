const express = require ("express")
const handlebars = require("express-handlebars")
const {Server} = require("socket.io")
const { productManager } = require("./products/controller.products.js")
const router = require("./routes/index.js")
const {port}= require("../config/server.config")
const mongoose = require("mongoose")
const dbConnect = require("../db")


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"))


app.engine("handlebars",handlebars.engine())
app.set("views",__dirname + "/views")
app.set ("view engine","handlebars")



router(app)

dbConnect()


const httpServer = app.listen(port, ()=>{
    console.log(`Running on port ${port}`)
})

const io = new Server(httpServer)

io.on("connection", async socket=>{
    const products = await productManager.getProduct()
    socket.emit("productTiempoReal",{products})
})