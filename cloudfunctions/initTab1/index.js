// 云函数入口文件
import { init, database, getWXContext } from 'wx-server-sdk'
init()
const db = database()

// 云函数入口函数
export async function main(event, context) {
  
  const wxContext = getWXContext()
  let employee;
  //获得当前用户
  const orderUser =await db.collection("orders").where({"_openid":wxContext.OPENID}).limit(1).get();
  try {
    employee = orderUser.data[0].employee;
  } catch (error) {
    
  }
  const _ = db.command
  const scoreUser =await db.collection("scores").where({"_openid":wxContext.OPENID,employee:_.neq(null)}).limit(1).get();
  try {
    employee = scoreUser.data[0].employee;
  } catch (error) {
    
  }}
