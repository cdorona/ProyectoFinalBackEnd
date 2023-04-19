const btns = document.querySelectorAll('.btns')

const orderItems = e => {
    const { id } = e.target.dataset
    const url = `http://localhost:8080/api/carts/643186730336cb18fa6e6f97/product/${id}`
    const headers = {
        'Content-Type' : 'aplication/json'
    }
    const body = {}
    const method = 'PUT'
    fetch(url,{
        headers,
        method,
        body
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

btns.forEach(btn => btn.addEventListener('click', orderItems))