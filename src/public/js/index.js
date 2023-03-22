const socket = io()
const productsContainer = document.getElementById('products')

socket.on('productTiempoReal', prds => {
    const { products } = prds
    productsContainer.innerHTML = ''
    products.forEach( pdt => productsContainer.append(productContainer(pdt.title)));
})

const productContainer= (title) =>{
    const div = document.createElement("div")
    div.innerHTML = title
    return div

}

