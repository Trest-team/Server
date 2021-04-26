var connection = require('./db')

exports.checkUser = function (cb) {
    connection.query(`SELECT * FROM users;`, function (error, results, fields) {
        if (error) {
            console.log(error);
        } else {
            cb(results[0])
        }
    });
}

exports.imgServe = function (body, cb) {
    connection.query(`SELECT botProfile FROM users where userid = '${body.userid}';`, function (error, results, fields) {
        if (error) {
            console.log(error);
        } else {
            cb(results[0].botProfile)
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
                sql = 'INSERT INTO users (userid, username, password, happy, angry, sad, botProfile) VALUES(?, ?, ?, ?, ?, ?, ?)';
                values = [body.userid, body.username, body.password,0,0,0,'http://localhost:3000/img/boy'];
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

//로그인
exports.login = function (body, cb) {
    connection.query(`SELECT * FROM user where userid = '${body.userid}' AND password = '${body.password}';`, function (error, results, fields) {
        if (error) {
            cb('nonemail')
        } else {
            if (results.length == 1) {
                cb(results[0])
            } else {
                cb('nonemail')
            }
        }
    });
}

exports.checkUserFeel = function (body, cb) {
    connection.query(`SELECT happy, angry, sad FROM users where userid = '${body.userid}';`, function (error, results, fields) {
        if (error) {
            console.log(error);
        } else {
            cb(results[0])
        }
    });
} 