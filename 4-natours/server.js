const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log('---------------------- DB Connection Successful! ----------------------'));

const app = require('./app');
console.log(process.env);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App running on the port ${PORT}`);
});