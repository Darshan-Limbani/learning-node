const express = require('express');
const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');


const morgan = require('morgan');

// MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//     console.log("Hello from the Middleware 👋");
//     next();
// });

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
// app.post('/api/v1/tours', createTour);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    // res.status(404)
    //     .json({
    //             status: 'fail',
    //             message: `Can't find ${req.originalUrl} on the server!`
    //         }
    //     );

    // const err = new Error(`Can't find ${req.originalUrl} on the server!`);
    // err.status = 'failed';
    // err.statusCode = 404;
    next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});


app.use(globalErrorHandler);

module.exports = app;