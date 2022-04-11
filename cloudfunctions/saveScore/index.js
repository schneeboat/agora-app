// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main =(event, context) => {

  const wxContext = cloud.getWXContext()
  //获得当前用户
  // const promise =await db.collection("orders").where({"_openid":wxContext.OPENID}).limit(1).get();
  // let employee;
  // try {
  //   employee = promise.data[0].employee;
  // } catch (error) {
    
  // }
  db.collection("scores").add({
    data: {
      score: event.score,
      dateTime: db.serverDate(),
      employee:event.employee,
      createDate:new Date().format("yyyy-MM-dd"),
      createTime:new Date().format("hh:mm:ss"),
      user:event.user,
      remark: event.remark
    },
    success:res=>{
      return 200
    },
    fail:err=>{
      return 503
    }
  })
  
}

Date.prototype.format = function (fmt) { //author: meizz 
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
