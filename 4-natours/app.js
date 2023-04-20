const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 3000;

// app.get('/', (req, res) => {
//     res.status(200)
//         .json({message: 'Hello From the Server', app: 'Natours'});
// });
//
// app.post('/', (req, res) => {
//     res.send('You can post to this end point');
// });


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));


app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
});


app.listen(PORT, (err) => {
    console.log(`App running on the port ${PORT}`);
});