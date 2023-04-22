const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require("../../models/tourModel");
const fs = require("fs");

// dotenv.config({path: './config.env'});
dotenv.config({path: '../../config.env'});

console.log(process.argv);

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);


mongoose.connect(DB).then(() => console.log('---------------------- DB Connection Successful! ----------------------'));
//  Read JSON file


const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));
// Import Data to DB

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data Successfully Loaded!!');
    } catch (err) {
        console.log(err);
    }
    process.exit();

};
// Delete Data from DB

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data Successfully Deleted!!');
    } catch (err) {
        console.log(err);
    }
    process.exit();


};
if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();


}