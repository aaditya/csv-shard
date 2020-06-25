const { Router: er } = require('express');
const multer = require('multer');

const router = er();

const upload = multer();

router.post('/v1/process', upload.array('docs', 100), require('./dataprocess'));

module.exports = router;