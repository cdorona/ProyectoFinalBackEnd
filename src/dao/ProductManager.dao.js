const fs = require("fs")

class ProductManager {

    constructor(path){
        this.products=[];
        this.path = path;
    }

    leeArchivo = async()=>{
        try{
            const file = await fs.promises.readFile(this.path, "utf-8")
            const productoAObj = JSON.parse(file)
            this.products = productoAObj.data
        }
        catch(error){
            console.log(error)
        }
    }

    escribirArchivo =async()=>{
        try{
            const productoAObj = {
                data: this.products,
            }
            const productsJson = JSON.stringify(productoAObj)
            await fs.promises.writeFile(this.path,productsJson)

        }
        catch(error){
            console.log(error)

        }
    }
    addProduct = async(producto) => {

        const {title,description,price,thumbnail,code,stock,status=true,category} = producto;

        if(!title ||!description||!price||!code||!stock||!category ){
            return ("Por favor debe ingresar los datos mandatorios")
        }
        
        await this.leeArchivo();
        
        const productInfo = {
            id:this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category
        }

        this.products.push(productInfo);
        console.log(this.products);
        await this.escribirArchivo();
        
    }
    getProduct =async()=>{
        await this.leeArchivo();
        return  this.products
    }
    getProductById = async (idFind)=>{
        await this.leeArchivo()
        console.log(this.products)
        const resultFind = this.products.find((prod)=>{
            if(parseInt(idFind)===prod.id){
                return true
            } else {
                return false 
            }
        
        })
        if(resultFind){
            return resultFind
        }else {console.log(`El prodcut con ID ${idFind} no fue encontrado, por favor pruebe otro`)
            
        }       
    }
    updateProductById = async (idFind,dataUpdate)=>{
        await this.leeArchivo()
        const resultFind = this.products.findIndex(prod =>`${prod.id}` === idFind);
        
      /*   console.log(Object.keys(this.products[resultFind]))
        console.log(dataUpdate)
        console.log(resultFind) */
        
        if(resultFind >=0 ){
            Object.keys(this.products[resultFind]).forEach( key => {
                console.log(dataUpdate[key])
                
                if (key != 'id' && dataUpdate[key]) this.products[resultFind][key] = dataUpdate[key]
                })

            await this.escribirArchivo();
            return `El producto con ID ${idFind} fue actualizado con exito`;

            }else {return `El producto con ID ${idFind} no fue encontrado, por favor pruebe otro`
            }
              
    }
    

    deleteProductById = async (idFind)=>{
        await this.leeArchivo()
        const resultFind = this.products.findIndex(prod =>`${prod.id}` === idFind);
          
        console.log(resultFind)
        
        if(resultFind>=0){
            this.products[resultFind].status = false

         await this.escribirArchivo();   
         return `El prodcuto con ID ${idFind} fue eliminado con exito`
        }else return `El prodcuto con ID ${idFind} no fue encontrado, por favor pruebe otro`
            
        }       
    }




module.exports = ProductManager