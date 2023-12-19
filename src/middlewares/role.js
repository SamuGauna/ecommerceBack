import { logger } from "../utils/loggers.js";
import userRepository from "../persistence/repository/userRepository.js";
const user = new userRepository();


export const roleValidationMiddleware = async (req, res, next) => {
    try {
        const userDto = req.user
        const userRole = userDto.user_role;

        if (userRole === 'admin') {
            next();
        } else {
            logger.warn('No tienes los permisos necesarios para acceder a esta ruta');
            res.json("No puedes acceder a esta ruta");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

