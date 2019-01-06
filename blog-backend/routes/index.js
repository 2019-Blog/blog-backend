
const user = require('./users')
const blog = require('./blog')

module.exports = function (app) {
  app.use(user.routes()).use(user.allowedMethods())
  app.use(blog.routes()).use(blog.allowedMethods())
}
