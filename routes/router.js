let express = require('express');

let api = require('../api/index');
let management = require('../api/management')

let router = express.Router();

router.get(api.getAuditList, management.getAuditList);
router.get(api.getAuditDetail, management.getAuditDetail);

module.exports = router;