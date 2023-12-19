import { userModel } from "../daos/mongodb/models/userModel.js"
import bcrypt from "bcrypt"
import CartRepository from "./cartRepository.js";
import { logger } from "../../utils/loggers.js";



export default class userRepository {
    
    async userExist(email) {
        try {
        const response = await userModel.findOne({email})
        if(!response){
            return logger.warn(`This email doesnt exist`);
        }
        return response
        } catch (error) {
        console.log(error);
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
        const cart = new CartRepository();
        const newCartUser = await cart.createCart()
        const response = await userModel.findOne({email})
        if(response){
            return console.log(`El usario con email: ${email}, ya esta registrado`);
        }
        const roleFilter = await this.roleValidation(email, password)
        const newUser = await userModel.create({
            firstName, 
            lastName, 
            email, 
            age, 
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
            cart: newCartUser,
            role: roleFilter
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
            const userUpdateRole = await userModel.updateOne({_id: user._id}, {role: 'premium'})
            return user
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

}