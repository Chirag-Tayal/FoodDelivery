const express = require('express');
const ExpressFormidable = require('express-formidable')
const multer = require('multer');
const {imageUploadController} = require('../controller/imageUpload');

router = express.Router()

router.post('/upload-image', ExpressFormidable(), imageUploadController)
router.post('/test', ExpressFormidable, imageUploadController)

module.exports = router;