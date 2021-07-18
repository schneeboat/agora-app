const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const MAX_LIMIT = 100

//引入发送邮件的类库
var nodemailer = require('nodemailer')
// 创建一个SMTP客户端配置
var config = {
  host: 'smtp.qq.com', //网易163邮箱 smtp.163.com
  port: 465, //网易邮箱端口 25
  auth: {
    user: '64705437@qq.com', //邮箱账号
    pass: 'guklhjxfejeobhcc' //邮箱的授权码
  }
};
// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);
// 云函数入口函数
exports.main = async(event, context) => {
  //从配置文件中获取就餐日期
  const config = await db.collection('config').get()
  const dinnerDate = config.data[0].dinnerDate
  let alldata = []

 let cvs = "食材预定记录HU" + dinnerDate + ".xlsx"
  
  const countResult = await db.collection('orders').where({ dinnerDate: dinnerDate, status: "已预定" }).count()
  const total = countResult.total
  const batchTimes = Math.ceil(total / 100)
  const tasks = []
    if (total > 0) {
      for (let i = 0; i < batchTimes; i++) {
        const promise = db.collection('orders').where({dinnerDate: dinnerDate, status: "已预定" }).orderBy("floorNum","asc").skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
        tasks.push(promise)
      }
      let userdata = (await Promise.all(tasks)).reduce((acc, cur) => {
        return {
          data: acc.data.concat(cur.data),
          errMsg: acc.errMsg,
        }
      })
      for (let key in userdata.data) {
        let arr = [];
        arr.push(userdata.data[key].floorNum);//楼层
 
        arr.push(userdata.data[key].employee);//工号

        alldata.push(arr);
      }
    }
  // 创建一个邮件对象
  
  var str ="<h1>总预定人数为："+alldata.length+"人次:（请注意去重）</h1>";
  str +="<table border='1'>";
  str +="<tr>";
  str +="<th>序号</th><th>楼层</th><th>员工</th>"
  str +="</tr>";
  for(var i=0;i<alldata.length;i++){
    str+="<tr><td>"+eval(i+1)+"</td><td>"+alldata[i][0]+"</td><td>"+alldata[i][1]+"</td></tr>"
  }
  str +="</table>";
  var mail = {
    // 发件人
    from: dinnerDate+'食材预定记录 <64705437@qq.com>',
    // 主题
    subject: dinnerDate+'食材预定记录',
    // 收件人
    to: 'alexia.fan@huawei.com',
    // 邮件内容，text或者html格式
    html: str //可以是链接，也可以是验证码
  };
  
  let res = await transporter.sendMail(mail);
  return 200;
}