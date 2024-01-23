import { userModel } from "../daos/mongodb/models/userModel.js"
import bcrypt from "bcrypt"
import { logger } from "../../utils/loggers.js";
import { cartRepository } from "../../services/dependencys/injection.js";


export default class userRepository {
    
    async userExist(email) {
        try {
        const response = await userModel.findOne({email})
        if(!response){
            logger.warn(`This email doesnt exist`)
            return null
        }
        return response
        } catch (error) {
            logger.error(error);
            throw error; 
        }
    }
    async roleValidation(email) {
        try {
            const user = await this.userExist(email)
            if(user.email === "adminCoder@coder.com"){
                user.role = "admin"
                return user
            } else {
                user.role = "user"
                return user
            }
        } catch (error) {
            logger.error(error)
        }
    }

    async userCreate(firstName, lastName, email, age, password) {
        try {
        const newCartUser = await cartRepository.createCart()
        const response = await userModel.findOne({email})
        if(response){
            return console.log(`El usario con email: ${email}, ya esta registrado`);
        }
        const roleFilter = await this.roleValidation(email)
        const newUser = await userModel.create({
            firstName, 
            lastName, 
            email, 
            age, 
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
            cart: newCartUser,
            role:  roleFilter ? roleFilter.toString() : 'usuario',
        })
        return newUser
        } catch (error) {
        console.log(error);
        }
    }
    async findUser(id) {
        try {
        const response = await userModel.findById(id)
        if(!response){
            return console.log(`No se encontro el user con el id: ${id}`);
        }
        return response
        } catch (error) {
        console.log(error);
        }
    }
    async updatePassword(id, newPassword) {
        try {
        const response = await userModel.updateOne({_id: id}, {password: newPassword});
        if(!response){
            return console.log(`No se encontro el user con el id: ${id}`);
        }
        return response
        } catch (error) {
        console.log(error);
        }
    }
    async addPremiumUser(uid){
        try {
            const user = await this.findUser(uid)
            await userModel.updateOne({_id: user._id}, {role: 'premium'})
            const updatedUser = await this.findUser(uid);
            return updatedUser;
        } catch (error) {
            logger.warn('error en el addPremiumUser')
            logger.error(error)
        }
    }
    async getAllUsers(){
        try {
            const users = await userModel.find({})
            return users
        } catch (error) {
            logger.warn('error en el getallusers')
            logger.error(error)
        }
    }
    async deleteUser(id) {
        try {
            const response = await userModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

}