const express = require('express');
const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const morgan = require('morgan');

app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
    console.log("Hello from the Middleware 👋");
    next();
});

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

module.exports = app;