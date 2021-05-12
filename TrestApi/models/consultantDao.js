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


//회원가입
exports.insertMember = function (body,cb) {
    connection.query(`SELECT * FROM consultant where idconsultant = '${body.idconsultant}';`, function (error, results, fields) {
        if (error) {
            console.log(error);
        } else {
            if (results == '') {
                console.log("회원가입 가능");
                sql = 'INSERT INTO consultant (idconsultant, consultantname, password) VALUES(?, ?, ?)';
                values = [body.idconsultant, body.consultantname, body.password];
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
    connection.query(`SELECT * FROM consultant where idconsultant = '${body.idconsultant}' AND password = '${body.password}';`, function (error, results, fields) {
        if (error) {
            cb('500')
        } else {
            if (results.length == 1) {
                try {
                    const id = body.idconsultant;
                
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

exports.ProfileUpdate = function (body,tokenId, cb) {
    connection.query(`UPDATE consultant SET introduce = '${body.introduce}', studentcount = '${body.studentcount}' where id = '${tokenId}';`, function (error, results, fields) {
        if (error) {
            console.log(error);
        } else {
            cb(results[0].botProfile)
        }
    });
}