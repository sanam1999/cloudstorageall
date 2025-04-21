const express = require('express');
const router = express.Router({ mergeParams: true });
const {basborddata,getfolder,getimage,payment,getplan} = require('../Controller/other')
const warpAsync = require('../utils/warpAsync');
const {APIAuthentication} = require('../utils/Middleware')

// Route for Google authentication
router.route('/')
    .get(warpAsync(basborddata))
    .post(warpAsync(payment))

router.route('/plan')
    .get(warpAsync(getplan))


router.route('/folder')
    .get(warpAsync(getfolder))


router.route('/folder/file')
    .get(warpAsync(getimage))
    



    

module.exports = router;
