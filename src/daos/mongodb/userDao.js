import { userModel } from "./models/userModel.js";
import bcrypt from "bcrypt"



export default class userDao {
    
    async userExist(email) {
        try {
        const response = await userModel.findOne({email})
        if(!response){
            return console.log(`Los datos ingresados no son correctos`);
        }
        return response
        } catch (error) {
        console.log(error);
        }
    }
    async roleValidation(email, password) {
        try {
            if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
                return "admin";
            } else {
                return "usuario";
            }
        } catch (error) {
        console.log(error);
        }
    }

    async userCreate(firstName, lastName, email, age, password, role) {
        try {
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

}