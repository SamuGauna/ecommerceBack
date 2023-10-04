

document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".addToCartBtn");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productId = button.getAttribute("data-product-id");
            Swal.fire({
                icon: 'success',
                title: 'Producto agregado con exito!'
              })
            // Realiza la solicitud POST al servidor
            fetch(`http://localhost:8080/api/carts/6513322471de1bde07ea5d2d/product/${productId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ productId })
            })
            .then(response => {
                if (response.ok) {
                    console.log("Producto agregado al carrito con éxito.");
                } else {
                    console.error("Error al agregar el producto al carrito.");
                }
            })
            .catch(error => {
                console.error("Error de red:", error);
            });
        });
    });
});





