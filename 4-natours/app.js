const express = require('express');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const globalErrorHandler = require('./controllers/errorController');

const AppError = require('./utils/appError');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

// set security http headers
app.use(helmet());


// MIDDLEWARE : Development Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Rate limit prevent bruteforce attack : limit request for the same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000
});
app.use('/api', limiter);

app.use(express.json({limit: '10kb'}));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp({
    whitelist: [
        'duration',
        'ratingsQuantity',
        'ratingAverage',
        'maxGroupSize',
        'difficulty',
        'price'
    ]
}));
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
app.use('/api/v1/reviews', reviewRouter);

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