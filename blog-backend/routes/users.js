const router = require('koa-router')()
const db = require('../db')
const Tips = require('../utils/tip')

router.get('/api/user', async (ctx, next) => {
  // let {uid} = ctx.state || {}
  let sql = 'SELECT * FROM user limit 3'
  // let value = [uid]
  let value = ''
  await db.query(sql, value).then(res => {
    if (res && res.length > 0) {
      // console.log(res)
      ctx.body = {...Tips[0], data: res}
    } else {
      ctx.body = Tips[1005]
    }
  }).catch(e => {
    ctx.body = Tips[1005]
  })
})

module.exports = router
