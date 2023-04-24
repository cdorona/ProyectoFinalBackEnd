const express = require ("express")
const handlebars = require("express-handlebars")
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')
const {Server} = require("socket.io")
const { productManager } = require("./products/controller.products.js")
const router = require("./routes/index.js")
const {port}= require("../config/server.config")
const mongoose = require("mongoose")
const dbConnect = require("../db")
const Products = require("../src/dao/models/products.models")
const Messages = require("../src/dao/models/messages.models")


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static(__dirname + "/public"))


app.use(
    session({
      store: MongoStore.create({
        mongoUrl:
          'mongodb+srv://admin:admin@cluster0.xocdjbx.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      }),
      secret: 'coderSecret',
      resave: false,
      saveUninitialized: false,
    })
)

app.engine("handlebars",handlebars.engine())
app.set("views",__dirname + "/views")
app.set ("view engine","handlebars")



router(app)

dbConnect()


const httpServer = app.listen(port, ()=>{
    console.log(`Running on port ${port}`)
})

const io = new Server(httpServer)


io.on('connection', async socket => {
    try {
        const products = await Products.find()
        socket.emit('productTiempoReal', { products })
    } catch (error) {
        socket.emit('productTiempoReal', {error: 'Error in Request'})
    }
    
    socket.on('chat', async msg => {
        try {
            const message = await Messages.create(msg)
            io.emit('chat', {message})
        } catch (error) {
            console.log(error)
        }
    })
})