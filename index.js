const bodyparser = require('body-parser');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ extended: false, limit: "50mb" }));

app.use(morgan('dev'));

app.use(cors());

app.use('/api', require('./routes/index'));

app.use('/', express.static(path.join(__dirname, 'public/')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on ${port}.`)
});

module.exports = app;