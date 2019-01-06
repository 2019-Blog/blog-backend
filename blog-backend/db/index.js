var mysql = require('mysql')
let config = {
  host: '127.0.0.1',
  user: 'root',
  password: 'Liyanan_123',
  database: 'blog',
  port: 3306,
  multipleStatements: true// 允许多条sql同时执行
}
let pool = mysql.createPool(config)
let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.end()
        })
      }
    })
  })
}
module.exports = {
  query
}
