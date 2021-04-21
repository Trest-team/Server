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