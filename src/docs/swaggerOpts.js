export const swaggerOpts = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'ecommerceAPI',
            version: '1.0.0',
            description: `Este es el backend de mi proyecto, construido con Node.js y Express. Utiliza las siguientes tecnologías:\n
            - bcrypt: ^5.1.1\n
            - connect-mongo: ^5.0.0\n
            - cookie-parser: ^1.4.6\n
            - dotenv: ^16.3.1\n
            - express: ^4.18.2\n
            - express-handlebars: ^7.1.2\n
            - express-session: ^1.17.3\n
            - helmet: ^7.1.0\n
            - jsonwebtoken: ^9.0.2\n
            - mongoose: ^7.5.1\n
            - mongoose-paginate-v2: ^1.7.4\n
            - nodemailer: ^6.9.7\n
            - passport: ^0.6.0\n
            - passport-github2: ^0.1.12\n
            - passport-jwt: ^4.0.1\n
            - passport-local: ^1.0.0\n
            - socket.io: ^4.7.2\n
            - swagger-jsdoc: ^6.2.8\n
            - swagger-ui-express: ^5.0.0\n
            - winston: ^3.11.0`
        },
        servers: [
            { url: 'http://localhost:8080'}
        ]
    },
    apis: ['./src/docs/**/*.yml']
}