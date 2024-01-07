import userRepository from '../../../persistence/repository/userRepository.js';
import assertNode from 'assert'
import { expect, assert, should } from "chai";
import mongoose from "mongoose";
import dotenvConfig from "../../../config/dotenvConfig.js";
import { logger } from "../../../utils/loggers.js";
import { info } from 'console';

describe('Tests unitarios de cart repository', ()=>{
    let userTest;
    let userCreated;
    before(async function(){
        this.timeout(10000); 
        try {
            await mongoose.connect(dotenvConfig.DB_MONGO_URL);
            logger.info('Conexión a la base de datos exitosa.')
            userTest = new userRepository()
            userCreated = await userTest.userCreate(
                "nameTest", 
                "lastnameTest",
                "emailtest@gmailMessage.com",
                "10",
                "123"
                )
            logger.info(`user creado con id ${userCreated._id}`)
        } catch (error) {
            logger.error('Error en la conexión a la base de datos:', error)
            throw error
        }
    })
    beforeEach(async function () {
        this.timeout(5000);
    });
    after(async function () {
        this.timeout(5000);
        if (userCreated) {
            const idUser = userCreated._id;
            const userDelete = await userTest.deleteUser(idUser);
            logger.info(`user eliminado con id ${userDelete._id}`);
        }
        await mongoose.connection.close();
        logger.info("db disconnected - closed")
    });
    it('Deberia retornar un array de productos', async function() {
        const listUsers = await userTest.getAllUsers();
        expect(Array.isArray(listUsers)).to.be.equal(true)
    })
    it('Deberia cambiar el rol del usuario a premium', async function() {
        const user = await userTest.addPremiumUser(userCreated._id)
        assert.equal(user.role, 'premium')
    })
    it('Deberia obtener un user por ID', async function() {
        const idUser = userCreated._id
        const userById = await userTest.findUser(idUser)
        expect(userById._id.toString()).to.equal(userCreated._id.toString());
    })
})