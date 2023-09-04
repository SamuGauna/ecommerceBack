
const socketClient = io()

const form = document.getElementById('form');
const inputName = document.getElementById('product-name')
const inputDescription = document.getElementById('product-description')
const inputPrice = document.getElementById('product-price')
const inputThumnail = document.getElementById('product-thumbnail')
const inputCode = document.getElementById('product-code')
const inputStock = document.getElementById('product-stock')
const inputStatus = document.getElementById('product-status')
const divVacio = document.getElementById('divVacio')

const deleteProduct = document.getElementById('post-delete')
const inputDelete = document.getElementById('product-delete')
deleteProduct.addEventListener('click', (event)=>{
    event.preventDefault()
    const idDeleteFromSocketClient = inputDelete.value
    socketClient.emit('deleteProduct', {idDeleteFromSocketClient})
})
socketClient.on('updateStateProduct2', async(dataRecibida)=>{
    console.log('Datos recibidos en el cliente desde el evento delete:', dataRecibida);
    let infoProd = '';
    infoProd += `
        <div style="text-align: center; font-weight: bold;">
            Estos son los productos en tiempo real
        </div>
    `;

    for (const element of dataRecibida) {
        infoProd += `
            <div id="divVacio">
                <h2 style="text-align: center;">${element.title}</h2>
                <ul class="contenidoHome">
                    <li>description: ${element.description}</li>
                    <li>price: ${element.price}</li>
                    <li>thumbnail: ${element.thumbnail}</li>
                    <li>code: ${element.code}</li>
                    <li>stock: ${element.stock}</li>
                    <li>status: ${element.status}</li>
                    <li>id: ${element.id}</li>
                </ul>
            </div>
        `;
    }

    divVacio.innerHTML = infoProd;
})


form.addEventListener('submit', (event)=>{
    event.preventDefault()
    const name = inputName.value
    const description = inputDescription.value
    const price = inputPrice.value
    const thumbnail = inputThumnail.value
    const code = inputCode.value
    const stock = inputStock.value
    const status = inputStatus.value
    socketClient.emit('newProduct', {name, description, price, thumbnail, code,stock, status}) 
})

socketClient.on('updateStateProduct', async (dataRecibida) => {
    console.log('Datos recibidos en el cliente:', dataRecibida);
    let infoProd = '';
    infoProd += `
        <div style="text-align: center; font-weight: bold;">
            Estos son los productos en tiempo real
        </div>
    `;

    for (const element of dataRecibida) {
        infoProd += `
            <div id="divVacio">
                <h2 style="text-align: center;">${element.title}</h2>
                <ul class="contenidoHome">
                    <li>description: ${element.description}</li>
                    <li>price: ${element.price}</li>
                    <li>thumbnail: ${element.thumbnail}</li>
                    <li>code: ${element.code}</li>
                    <li>stock: ${element.stock}</li>
                    <li>status: ${element.status}</li>
                    <li>id: ${element.id}</li>
                </ul>
            </div>
        `;
    }

    divVacio.innerHTML = infoProd;
});