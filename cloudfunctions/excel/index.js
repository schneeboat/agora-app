// 云函数入口文件
import { init, database, uploadFile } from 'wx-server-sdk'

init()
const db = database()
const MAX_LIMIT = 100
const DINNER_DATE = "7月15日"
import { build } from 'node-xlsx'//操作excel用的库类
// 云函数入口函数
export async function main(event, context) {
  //生成excel
//1.定义excel表格名
  let cvs = "订餐记录HU" + DINNER_DATE + ".xlsx"
  //2.定义储存数据的
  let alldata = []
  let row = ["工号", "楼层"]//表属性
  alldata.push(row)

  //读取预定数据
  // 先取出集合记录总数
  const countResult = await db.collection('orders').where({ dinnerDate: DINNER_DATE, status: "已预定" }).count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  if (total > 0) {
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('orders').where({ dinnerDate: DINNER_DATE, status: "已预定" }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
      tasks.push(promise)
    }
    let userdata = (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      }
    })

    //这里的数据是我们查询到的用户数据，通过遍历数组存入excel
    for (let key in userdata.data) {
      let arr = [];
      arr.push(userdata.data[key].employee);
      arr.push(userdata.data[key].floorNum);

      alldata.push(arr);
    }
  }


console.log(alldata.toString());
  var buffer = build([{ name: "mysheet", data: alldata }]) //把数据保存到exccel里
//把数据保存到exccel里
  return await uploadFile({ cloudPath: cvs, fileContent: buffer })//excel保存到云储存里
}