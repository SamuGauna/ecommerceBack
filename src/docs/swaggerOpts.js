export const swaggerOpts = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'ecommerceAPI',
            version: '1.0.0',
            description: 'descripcion de la api o tecnologias utilizadas'
        },
        servers: [
            { url: 'http://localhost:8080'}
        ]
    },
    apis: ['./src/docs/**/*.yml']
}