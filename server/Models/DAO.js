var connection = require('./db')

exports.checkUser = function (cb) {
    connection.query(`SELECT * FROM users;`, function (error, results, fields) {
        if (error) {
            console.log(error);
        } else {
            console.log(results);
            cb(results)
        }
    });
}

//회원가입
exports.insertMember = function (body,cb) {
    connection.query(`SELECT * FROM users where userid = '${body.userid}';`, function (error, results, fields) {
        if (error) {
            console.log(error);
            
        } else {
            if (results == '') {
                console.log("회원가입 가능");
                sql = 'INSERT INTO users (userid, username, password) VALUES(?, ?, ?)';
                values = [body.userid, body.username, body.password];
                connection.query(sql, values, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    } else {
                        cb(results);
                    }
                })
            }
            else {
                cb("duplicate");
            }
        }
    });
}