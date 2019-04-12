let tools = require('../sql/tools');

function isEmpty(v) {
    if (v == '' || v == undefined || v == null) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    getAuditList(req, res) {
        let applicationStartTime = req.query.applicationStartTime;
        let applicationEndTime = req.query.applicationEndTime;
        let applicationStatus = req.query.applicationStatus;

        let auditID = req.query.auditID;
        let userName = req.query.userName;
        let teaHouseName = req.query.teaHouseName;

        let sqlString = 'SELECT a.id auditID, h.user_name userName, h.name teaHouseName, a.status, a.payment_time teaHouseName FROM tea_house_audit a INNER JOIN tea_house h ON a.id = h.tea_house_audit_id';
        tools.connectPool(sqlString, auditID, auditList => {
            res.json({ errCode: "000000", errMsg: 'success', result: { auditList } });
        });
    },
    getAuditDetail(req, res) {
        let auditID = req.query.auditID;
        let sqlString = 'SELECT * FROM tea_house_audit WHERE id=? ';
        tools.connectPool(sqlString, auditID, auditList => {
            res.json({ errCode: "000000", errMsg: 'success', result:  auditList[0]  });
        });
    }

}