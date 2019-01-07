const router = require('koa-router')()
const db = require('../db')
const Tips = require('../utils/tip')
// const Utils = require('../utils/index')

/**
 * get title & id
 */
router.get('/api/blog/getTitle', async (ctx, next) => {
  let sql = 'select title,id from blog;'
  let value = ''
  await db.query(sql, value).then(res => {
    if (res && res.length > 0) {
      ctx.body = {...Tips[0], data: res}
    } else {
      ctx.body = Tips[1005]
    }
  }).catch(e => {
    console.log(666)
    ctx.body = Tips[1005]
  })
})

/**
 * get content by id
 */
router.get('/api/blog/getcontent', async (ctx, next) => {
  let data = ctx.query
  let { id } = data
  let sql = 'select * from blog where id = ?;'
  let value = [id]
  await db.query(sql, value).then(res => {
    if (res && res.length > 0) {
      ctx.body = {...Tips[0], data: res}
    } else {
      ctx.body = Tips[1005]
    }
  }).catch(e => {
    console.log(666)
    ctx.body = Tips[1005]
  })
})
/**
 * add note
 */
router.post('/api/blog/add', async (ctx, next) => {
  let data = ctx.request.body
  console.log(data)
  let { title, content, markdown_content, id } = data

  if (id) {
    let sql = `update blog set title=?, content=?,markdown_content=? where id = ?`,
      value = [title, content, markdown_content, id]
    await db.query(sql, value).then(res => {
      let {insertId} = res
      console.log(res)
      if (insertId === 0) {
        ctx.body = {
          ...Tips[0],
          data: {
            id
          }
        }
      } else {
        ctx.body = Tips[1002]
      }
    }).catch(e => {})
  } else {
    let sql = `INSERT INTO blog(title,content,markdown_content) VALUES(?,?,?)`,
      value = [title, content, markdown_content]
    await db.query(sql, value).then(res => {
      let {insertId: id} = res
      if (id) {
        ctx.body = {
          ...Tips[0],
          data: {
            id
          }
        }
      } else {
        ctx.body = Tips[1002]
      }
    }).catch(e => {})
  }
})

module.exports = router
