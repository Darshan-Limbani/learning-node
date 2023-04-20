const express = require('express');
const app = express();
const fs = require('fs');
const {del} = require("express/lib/application");
const morgan = require('morgan');
const PORT = 3000;


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


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        requestedTime: req.requestTime,
        data: {
            tours
        }
    });
};

const createTour = (req, res) => {
    console.log(req.body);

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
        res.status(201).json({status: 'success', data: {tour: newTour}});
    });


};

const getTour = (req, res) => {

    const id = req.params.id * 1;

    if (id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });

    }

    const tour = tours.find(el => el.id === id);
    res.status(200).json({
        status: "success",
        data: {tour}
    });
};

const deleteTour = (req, res) => {
    const id = req.params.id * 1;
    if (id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });

    }

    res.status(204).json({
        status: "success",
        data: null
    });
};

const updateTour = (req, res) => {
    const id = req.params.id * 1;
    if (id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });

    }

    res.status(200).json({
        status: "success",
        data: {tour: '<Updated tour here...>'}
    });
};

const getAllUsers = (req, res) => {
    res.status(500).json({status: 'error', message: 'This route is not yet defined'});
};

const createUser = (req, res) => {
    res.status(500).json({status: 'error', message: 'This route is not yet defined'});
};

const updateUser = (req, res) => {
    res.status(500).json({status: 'error', message: 'This route is not yet defined'});
};

const deleteUser = (req, res) => {
    res.status(500).json({status: 'error', message: 'This route is not yet defined'});
};

const getUser = (req, res) => {
    res.status(500).json({status: 'error', message: 'This route is not yet defined'});
};


// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
// app.post('/api/v1/tours', createTour);

// TOURS Routes
app.route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app.route('/api/v1/tours/:id')
    .patch(updateTour)
    .delete(deleteTour)
    .get(getTour);

// USERS Routes

app.route('/api/v1/users')
    .get(getAllUsers)
    .post(createUser);

app.route('/api/v1/users/:id')
    .patch(updateUser)
    .delete(deleteUser)
    .get(getUser);


app.listen(PORT, (err) => {
    console.log(`App running on the port ${PORT}`);
});