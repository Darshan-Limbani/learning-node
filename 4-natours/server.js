const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log('---------------------- DB Connection Successful! ----------------------'));

const tourSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'A tour must have a name'],
        unique: true
    },

    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: true,
        require: [true, 'A tour must have a price']
    }
});

const tour = mongoose.model('Tour', tourSchema);


const app = require('./app');
console.log(process.env);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App running on the port ${PORT}`);
});