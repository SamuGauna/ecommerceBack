import dotenvConfig from "../../../../config/dotenvConfig.js";
import { connect } from "mongoose";
import { logger } from "../../../../utils/loggers.js";

const connectionString = dotenvConfig.DB_MONGO_URL

try {
    await connect(connectionString)
        logger.info('conectado a la database de Mongo');
    } catch (error) {
        logger.error(error);
}