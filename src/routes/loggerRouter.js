import { Router } from "express";
import { logger } from "../utils/loggers.js";

const router = Router()

router.get('/loggerTest',  (req, res)=>{
    logger.silly('mensaje con nivel silly');
    logger.debug('mensaje con nivel debug');
    logger.verbose('mensaje con nivel verbose');
    logger.info('mensaje con nivel info');
    logger.http('mensaje con nivel http');
    logger.warn('mensaje con nivel warn');
    logger.error('mensaje con nivel error');
})


export default router