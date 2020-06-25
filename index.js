const bodyparser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ extended: false, limit: "50mb" }));

app.use(morgan('dev'));

app.use('/api', require('./routes/index'));

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on ${port}.`)
});

module.exports = app;