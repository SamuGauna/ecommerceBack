import mongoose from "mongoose";

const connectionString = process.env.DB_MONGO_URL

try {
     await mongoose.connect(connectionString)
        console.log('conectado a la database de Mongo');
    } catch (error) {
        console.log(error);
}