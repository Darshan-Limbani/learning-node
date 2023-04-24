const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/APIFeatures');
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


exports.aliasTopTours = (req, res, next) => {
    req.query.limit = 5;
    req.query.sort = '-ratingAverage,price';
    req.query.fields = 'name,price,ratingAverage,summary,difficulty';
    next();
};

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

exports.getTour = async (req, res) => {

    try {
        const tour = await Tour.findById(req.params.id);
        // Tour.findOne({_id:req.params.id})

        res.status(200).json({
            status: "success",
            data: {tour}
        });
    } catch (err) {

        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getAllTours = async (req, res) => {
    try {

        // BUILD QUERY
        // // 1A) Filtering
        // const queryObj = {...req.query};
        // const excludedFields = ['page', 'sort', 'limit', 'fields'];
        // excludedFields.forEach(el => delete queryObj[el]);
        //
        // // 2B) Advanced filtering
        // let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(/\b(gte|ge|lte|lt)\b/, match => `$${match}`);

        // EXECUTE QUERY
        // let query = Tour.find(JSON.parse(queryStr));

        // SORT DATA
        // if (req.query.sort) {
        //     const sortBy = req.query.sort.split(',').join(' ');
        //     query = query.sort(sortBy);
        // } else {
        //     query = query.sort('-createdAt');
        // }

        // SELECT ONLY SPECIFIC FIELDS
        // if (req.query.fields) {
        //     const fields = req.query.fields.split(',').join(' ');
        //     query = query.select(fields);
        // } else {
        //     query = query.select('-__v');
        // }

        // PAGINATION
        // const page = req.query.page * 1 || 1;
        // const limit = req.query.limit * 1 || 100;
        // const skip = (page - 1) * limit;
        //
        // query = query.skip(skip).limit(limit);
        //
        // if (req.query.page) {
        //     const numTours = await Tour.countDocuments();
        //     console.log("numTours : ------>", numTours);
        //     if (skip > numTours) {
        //         throw new Error('This page does not exist');
        //     }
        // }

        const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate();

        console.log("features : ------->", features);

        // const tours = await Tour.find()
        //     .where('duration')
        //     .equals(5)
        //     .where('difficulty')
        //     .equals('easy');

        const tours = await features.query;

        console.log("tours : ---------------->", tours);
        // const tours = await Tour.find();

        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        });
    } catch (err) {

        console.log(err);
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.updateTour = async (req, res) => {

    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: "success",
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "success", data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getToursStats = async (req, res) => {

    try {
        const stats = await Tour.aggregate([
            {
                $match: {ratingsAverage: {$gte: 4.5}}
            },
            {
                $group: {
                    _id: {$toUpper: '$difficulty'},
                    numTours: {$sum: 1},
                    numRating: {$sum: '$ratingsQuantity'},
                    avgRating: {$avg: '$ratingsAverage'},
                    avgPrice: {$avg: '$price'},
                    minPrice: {$min: '$price'},
                    maxPrice: {$max: '$price'},
                }
            },
            {
                $sort: {avgPrice: 1}
            },
            // {
            //     $match: {_id: {$ne: 'EASY'}}
            // }
        ]);

        res.status(200).json({
            status: "success",
            data: {
                stats
            }
        });


    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};


exports.getMonthlyPlan = async (req, res) => {

    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                }
            }
        },
        {
            $group: {
                _id: {$month: '$startDates'},
                numToursStart: {$sum: 1},
                tours: {$push: '$name'}

            }
        }, {
            $addFields: {month: '$_id'}
        }, {
            $project: {
                _id: 0
            }
        },
        {
            $sort: {numToursStart: -1}
        }, {
            $limit: 12
        }
    ]);

    try {

        res.status(200).json({
            status: "success",
            results: plan.length,
            data: {
                plan
            }
        });


    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }


};