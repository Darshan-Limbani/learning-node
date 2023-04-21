const Tour = require('./../models/tourModel');
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));


/*exports.checkID = (req, res, next, val) => {

    console.log("ID is :", val);
    if (val > tours.length - 1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });

    }
    next();
};*/


// exports.checkBody = (req, res, next) => {
//
//     if (!req.body.name || !req.body.price) {
//         return res.status(400).json({
//             status: 'fail', message: 'Missing name or price'
//         });
//     }
//     next();
// };

exports.createTour = async (req, res) => {
    console.log(req.body);

    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {tour: newTour}
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid Data Sent'
        });
    }
};

exports.getTour = (req, res) => {
    const id = req.params.id * 1;

    // const tour = tours.find(el => el.id === id);
    // res.status(200).json({
    //     status: "success",
    //     data: {tour}
    // });
};

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success', requestedTime: req.requestTime, // results: tours.length,
        // data: {
        //     tours
        // }
    });
};


exports.deleteTour = (req, res) => {

    res.status(204).json({
        status: "success", data: null
    });
};

exports.updateTour = (req, res) => {
    const id = req.params.id * 1;

    res.status(200).json({
        status: "success", data: {tour: '<Updated tour here...>'}
    });
};