const fs = require("fs")

class CartManager {

    constructor(cartsPath,productsPath){
        this.carts=[];
        this.cartsPath = cartsPath;
        this.products=[];
        this.productsPath = productsPath
    }

    leeArchivo = async(path,tipo)=>{
        try{
            const file = await fs.promises.readFile(path, "utf-8")
            const cartAObj = JSON.parse(file)
            this[tipo] = cartAObj[tipo]
        }
        catch(error){
            console.log(error)
        }
    }

    escribirArchivo =async()=>{
        try{
            const cartsAObj = {
                carts: this.carts,
            }
            const cartsJson = JSON.stringify(cartsAObj)
            await fs.promises.writeFile(this.cartsPath,cartsJson)

        }
        catch(error){
            console.log(error)

        }
    }


    createCart = async ()=>{

        
        await this.leeArchivo(this.cartsPath,"carts");
        
        const cartInfo = {
            id:this.carts.length + 1,
            products:[],
        }
        this.carts.push(cartInfo)
        await this.escribirArchivo()
        return cartInfo
    }


    addProductToCart = async(cid,pid) => {
        
        await this.leeArchivo(this.productsPath,"data");
        
        const findProd = this.data.findIndex(prod=>`${prod.id}`===pid && prod.status)
        if(findProd<0) return `El producto ${pid}no existe`

        await this.leeArchivo(this.cartsPath,"carts");
        
        const findCart = this.carts.findIndex(cart=>`${cart.id}`===cid)
        if(findCart<0) return `El carrito ${cid} no existe`

        const newProduct = {
            id: parseInt(pid),
            cantidad:1
        }
        console.log(findCart)
        console.log(this.carts)
        if(this.carts[findCart].products.length>0){
            const prodInCart = this.carts[findCart].products.findIndex(prod=>`${prod.id}`===pid)
            if (prodInCart>0){
                
                this.carts[findCart].products[prodInCart].cantidad++
            } else {
                this.carts[findCart].products.push(newProduct)
            }
        } else{
            this.carts[findCart].products.push(newProduct)

        }

        await this.escribirArchivo()
        return "Su Producto se ha agregado con exito"
    }

    getCartById = async (cid) => {
        await this.leeArchivo(this.cartsPath, 'carts');
        const cart = this.carts.find( c => `${c.id}` === cid)
        
        return cart || `El carrito con ID:${cid} no existe`
    }
    
}


    



module.exports = CartManager