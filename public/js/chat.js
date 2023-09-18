const socketClientChat = io()
let newUser = ''
Swal.fire({
    title: 'Ingresa un nombre',
    input: 'text',
    confirmButtonText: 'Ingresar al chat'
}).then((text)=>{
    newUser = text.value
})
const textToSendChat = document.getElementById('chat-send')
const chatContent = document.getElementById('chat-content')

textToSendChat.addEventListener('change', (mss)=>{
    socketClientChat.emit('message', {
        user: newUser,
        message: mss.target.value
    })
})
socketClientChat.on('newMessage', (data)=>{
    const messagesInSocket = data.map(({user, message})=>{
        return `<p>${user} dijo: ${message}</p>`;
    })
    chatContent.innerHTML = messagesInSocket.join('')
})