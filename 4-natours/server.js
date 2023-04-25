const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path: './config.env'});

const mongoose = require('mongoose');
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log('---------------------- DB Connection Successful! ----------------------'));
// const testTour = new Tour({name: "The Park Camper", price: 850});

// testTour.save().then(doc => console.log(doc)).catch(err => console.error(err));
// console.log(process.env);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App running on the port ${PORT}`);
});