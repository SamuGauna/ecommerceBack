import dotenvConfig from "../../../../config/dotenvConfig.js";
import { connect } from "mongoose";

const connectionString = dotenvConfig.DB_MONGO_URL

try {
    await connect(connectionString)
        console.log('conectado a la database de Mongo');
    } catch (error) {
        console.log(error);
}