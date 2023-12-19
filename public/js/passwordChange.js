window.addEventListener('load', function() {
    document.getElementById('updatePasswordBtn').addEventListener('click', function() {
        const newPassword = document.getElementById('newPassword').value;
        const newPasswordConfirm = document.getElementById('newPasswordConfirm').value;
        const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('tokenPassword='));
        const token = tokenCookie ? tokenCookie.split('=')[1] : null;
        console.log('Token antes de la solicitud:', token);

        // Realiza una solicitud PUT directamente desde JavaScript
        fetch('http://localhost:8080/api/sessions/updatePass', {
            method: 'PUT', // Utiliza el método PUT directamente
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify({
                newPassword: newPassword,
                newPasswordConfirm: newPasswordConfirm,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                window.location.href = '/api/sessions/login';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
