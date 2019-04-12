let tools = require('../sql/tools');

function isEmpty(v) {
    if (v == '' || v == undefined || v == null) {
        return true;
    } else {
        return false;
    }
}
module.exports = {
    getUserInfo(req, res) {
        let applicationStartTime = req.query.applicationStartTime;
        let applicationEndTime = req.query.applicationEndTime;
        let applicationStatus = req.query.applicationStatus;

        let auditID = req.query.auditID;
        let userName = req.query.userName;
        let teaHouseName = req.query.teaHouseName;

        // 如果username不为空，使用usernsame查询auditID
        if (!isEmpty(userName)) {
            let sqlString = 'SELECT tea_house_audit_id FROM tea_house where user_name=?';
            tools.connectPool(sqlString, userName, data => {
                auditID = data[0].tea_house_audit_id;
            });
        }
        // 如果teaHouseName不为空，使用teaHouseName查询auditID
        if (!isEmpty(teaHouseName)) {
            let sqlString = 'SELECT tea_house_audit_id FROM tea_house where name=?';
            tools.connectPool(sqlString, teaHouseName, data => {
                auditID = data[0].tea_house_audit_id;
            });
        }

        // 根据时间状态和auditID这三个参数查询tea_house_audit表
        if (isEmpty(applicationStatus)) {
            if (!isEmpty(auditID)) {
                if (!isEmpty(applicationStartTime)) {
                    //查询全部、有auditID、有时间
                    let sqlString = 'SELECT * FROM tea_house_audit where (payment_time>=? AND payment_time<=?) AND id=?';
                    let arr = [applicationStartTime, applicationEndTime, auditID];
                    tools.connectPool(sqlString, arr, auditList => {
                        res.json({ errCode: "000000", errMsg: 'success', result: { auditList } });
                    });
                } else {
                    //查询全部、有auditID、无时间
                    let sqlString = 'SELECT * FROM tea_house_audit where id=?';
                    tools.connectPool(sqlString, auditID, auditList => {
                        res.json({ errCode: "000000", errMsg: 'success', result: { auditList } });
                    });
                }
            } else {
                if (!isEmpty(applicationStartTime)) {
                    //查询全部、无auditID、有时间
                    let sqlString = 'SELECT * FROM tea_house_audit where (payment_time>=? AND payment_time<=?)';
                    let arr = [applicationStartTime, applicationEndTime];
                    tools.connectPool(sqlString, arr, auditList => {
                        res.json({ errCode: "000000", errMsg: 'success', result: { auditList } });
                    });
                } else {
                    //查询全部、无auditID、无时间
                    let sqlString = 'SELECT * FROM tea_house_audit';
                    tools.connectPool(sqlString, auditID, auditList => {
                        res.json({ errCode: "000000", errMsg: 'success', result: { auditList } });
                    });
                }
            }
        } else {
            if (!isEmpty(auditID)) {
                if (!isEmpty(applicationStartTime)) {
                    //查询某一状态、有auditID、有时间
                    let sqlString = 'SELECT * FROM tea_house_audit where (payment_time>=? AND payment_time<=?) AND auditID=? AND status=?';
                    let arr = [applicationStartTime, applicationEndTime, auditID, applicationStatus];
                    tools.connectPool(sqlString, arr, auditList => {
                        res.json({ errCode: "000000", errMsg: 'success', result: { auditList } });
                    });
                } else {
                    //查询某一状态、有auditID、无时间
                    let sqlString = 'SELECT * FROM tea_house_audit where auditID=? AND status=?';
                    let arr = [auditID, applicationStatus];
                    tools.connectPool(sqlString, arr, auditList => {
                        res.json({ errCode: "000000", errMsg: 'success', result: { auditList } });
                    });
                }
            } else {
                if (!isEmpty(applicationStartTime)) {
                    //查询某一状态、无auditID、有时间
                    let sqlString = 'SELECT * FROM tea_house_audit where (payment_time>=? AND payment_time<=?) AND status=?';
                    let arr = [applicationStartTime, applicationEndTime, applicationStatus];
                    tools.connectPool(sqlString, arr, auditList => {
                        res.json({ errCode: "000000", errMsg: 'success', result: { auditList } });
                    });
                } else {
                    //查询某一状态、无auditID、无时间
                    let sqlString = 'SELECT * FROM tea_house_audit where status=?';
                    tools.connectPool(sqlString, applicationStatus, auditList => {
                        res.json({ errCode: "000000", errMsg: 'success', result: { auditList } });
                    });
                }
            }
        }

    }

}