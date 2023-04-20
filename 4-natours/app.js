const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.status(200)
        .json({message: 'Hello From the Server', app: 'Natours'});
});

app.post('/', (req, res) => {
    res.send('You can post to this end point');
});


app.listen(PORT, (err) => {
    console.log(`App running on the port ${PORT}`);
});