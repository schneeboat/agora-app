const cloud = require('wx-server-sdk')
cloud.init()
const db = database()
const MAX_LIMIT = 100
export async function main(event, context) {
  // 先取出集合记录总数
  const countResult = await db.collection('orders').where({dinnerDate:"4月18日"}).count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('orders').where({dinnerDate:"4月18日"}).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  // 等待所有
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
}