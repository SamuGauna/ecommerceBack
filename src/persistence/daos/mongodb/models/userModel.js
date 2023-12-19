import mongoose from "mongoose";

const userCollection = 'users'

const userSchema = mongoose.Schema({
    firstName : {type: String, required:true},
    lastName : {type: String, required:true},
    email: {type: String, required:true, unique: true},
    age: {type: Number, required:true},
    password: {type: String, required:true},
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    },
    role: {
        type: String,
        enum: ['admin', 'usuario', 'premium'],
        default: 'usuario'
    }
})

export const userModel = mongoose.model(userCollection, userSchema)