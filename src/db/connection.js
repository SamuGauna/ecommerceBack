import mongoose from "mongoose";

const connectionString = 'mongodb+srv://admin78:Martina102509.@cluster0.toskn6p.mongodb.net/ecommerce?retryWrites=true&w=majority'

try {
     await mongoose.connect(connectionString)
        console.log('conectado a la database de Mongo');
    } catch (error) {
        console.log(error);
}