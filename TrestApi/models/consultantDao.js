var connection = require('./db')
const jwt = require('jsonwebtoken');
exports.checkUser = function (cb) {
    connection.query(`SELECT * FROM consultant;`, function (error, results, fields) {
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
    connection.query(`SELECT * FROM users where userid = '${body.userid}' AND password = '${body.password}';`, function (error, results, fields) {
        if (error) {
            cb('500')
        } else {
            if (results.length == 1) {
                try {
                    const id = body.userid;
                
                    // jwt.sign() 메소드: 토큰 발급
                    const token = jwt.sign({
                      id,
                    }, process.env.JWT_SECRET, {
                      expiresIn: '1h', // 1시간
                    });
                
                    cb(token)
                  }
                
                  catch (error) {
                    console.error(error);
                    cb('error')
                  }
            } else {
                cb("BadRequest")
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