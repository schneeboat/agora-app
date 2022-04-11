// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  
  const wxContext = cloud.getWXContext()
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
    
  }
  //获得评价结果
  let createDate = event.createDate;
  
  
  const score1 =await db.collection("scores").where({"score":"1","createDate":createDate}).count();
  const score2 =await db.collection("scores").where({"score":"2","createDate":createDate}).count();
  const score3 =await db.collection("scores").where({"score":"3","createDate":createDate}).count();
  const score4 =await db.collection("scores").where({"score":"4","createDate":createDate}).count();
  const score5 =await db.collection("scores").where({"score":"5","createDate":createDate}).count();
  let total1 = score1.total;
  let total2 = score2.total;
  let total3 = score3.total;
  let total4 = score4.total;
  let total5 = score5.total;
  return {
    employee:employee,
    score1:total1,
    score2:total2,
    score3:total3,
    score4:total4,
    score5:total5
  }
}