const socket = io()

const enviar = document.querySelector('#enviar')
const texto = document.querySelector('#texto')
const chatbox = document.querySelector('.chatbox')
const user = prompt("Ingrese su mail")


const chatUI = ({ user, message }) => {
    const p = document.createElement('p')
    p.innerHTML = `${user}: ${message}`
    return p
}

enviar.addEventListener('click', (e) => {
    e.preventDefault()
    const message = {
        user,
        message: texto.value.trim()
    }
    socket.emit('chat', message)
})

socket.on('chat', ({ message }) => {
    chatbox.append(chatUI(message))
    texto.value = ''
})