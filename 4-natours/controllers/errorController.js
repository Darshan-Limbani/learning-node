const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path} : ${err.value}`;
    return new AppError(message, 400);

};
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = (err, res) => {

    // Operational, trusted error : send message to the client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
        //     Programming or other unknown error: don't leak error details
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }
};
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // res.status(err.statusCode).json({
    //     status: err.status,
    //     message: err.message
    // });

    if (process.env.NODE_ENV === 'development') {
        console.log("DEVELOPMENT ERROR :------------------------------------>\n ", err);
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {

        console.log("PRODUCTION ERROR :------------------------------------>\n ", JSON.parse(JSON.stringify(err)));

        let error = err;
        // 1) LOG the error
        if (error.name === 'CastError') {
            error = handleCastErrorDB(error);
        }
//         // 2) send the generic message
        sendErrorProd(error, res);
    }
};