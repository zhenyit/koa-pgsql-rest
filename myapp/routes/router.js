let express = require('express');

let api = require('../api/index');
let userInfo = require('../api/userInfo')

let router = express.Router();

router.get(api.testData, userInfo.getUserInfo);

module.exports = router;