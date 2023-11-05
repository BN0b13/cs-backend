export const HandleErrors = func => (req, res, next) => {
    func(req, res, next).catch(err => {
        const date = Date.now();
        console.log('Handle Errors Middleware Error date: ', date);
        console.log('IP Address error happened to: ', req.ip);
        console.log('Error: ', err);
        next(err);
    });
}

export default (err, req, res, next) => {
    res.status(err.code ? err.code : 500).send({
        error: {
            message: err.message,
            data: err.data
        }
    });
}