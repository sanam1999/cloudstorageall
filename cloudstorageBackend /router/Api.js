const express = require('express');
const router = express.Router({ mergeParams: true });
const {generateapi,getallapis,deleteapi} = require('../Controller/Api')
const warpAsync = require('../utils/warpAsync');
const {APIAuthentication} = require('../utils/Middleware')

// Route for Google authentication
router.route('/')
    .get(warpAsync(getallapis))
    .delete(warpAsync(deleteapi));




router.route('/generateapi')
    .post(warpAsync(generateapi));


module.exports = router;
