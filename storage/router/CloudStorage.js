const express = require('express');
const router = express.Router({ mergeParams: true });
const warpAsync = require('../utils/warpAsync');
const {dynamicUpload} = require('../utils/storage')
const {UploadStorage,deleteImage,APIdeleteImage}  = require('../Controller/CloudStorage')
const {APIAuthentication,checkStorage} = require('../utils/Middleware')

    
router.route('/')
    .post(APIAuthentication,checkStorage,dynamicUpload, warpAsync(UploadStorage));
router.route('/image')
    .delete(warpAsync(deleteImage));
router.route('/image/api')
    .delete(APIAuthentication, warpAsync(APIdeleteImage));

module.exports = router;