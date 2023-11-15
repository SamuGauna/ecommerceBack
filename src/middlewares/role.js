export const  checkUserRole = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'user')) {
        next();
    } else {
        res.status(403).send('Acceso denegado. No tienes los permisos necesarios.');
    }
}