

async function updateUser(userId) {
    const formData = new FormData(document.getElementById(`form${userId}`));
    try {
        const response = await fetch(`http://localhost:8080/api/sessions/premium/${userId}`, {
            method: 'PUT',
            body: formData,
        });

        if (response.ok) {
            try {
                const updatedUser = await response.json();

                // Muestra una alerta con SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: `Usuario ${updatedUser.user_name} Actualizado`,
                    text: `New Role: ${updatedUser.user_role}`,
                });

            } catch (jsonError) {
                console.error('Error al analizar la respuesta JSON:', jsonError);
            }
        } else {
            console.error('Error en la solicitud PUT:', response.statusText);
            const text = await response.text();
            console.log('Texto de la respuesta:', text);
        }
    } catch (error) {
        console.error('Error en la solicitud PUT:', error);
    }
}
