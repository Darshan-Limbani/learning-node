const app = require('./app');

const PORT = 3000;

app.listen(PORT, (err) => {
    console.log(`App running on the port ${PORT}`);
});