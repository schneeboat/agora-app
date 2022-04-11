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
    user: '1620649014@qq.com', //邮箱账号
    pass: 'dpztqhdcefmueijb' //邮箱的授权码
  }
};
// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);
// 云函数入口函数
exports.main = async(event, context) => {
  let alldata = []
  let createDate = event.createDate;

  //获得评价信息
  const countResult = await db.collection('scores').where({ createDate: createDate}).count()
  const total = countResult.total
  const batchTimes = Math.ceil(total / 100)
  const tasks = []
    if (total > 0) {
      for (let i = 0; i < batchTimes; i++) {
        const promise = db.collection('scores').where({ createDate: createDate}).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
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
        arr.push(userdata.data[key].createDate);
        arr.push(userdata.data[key].createTime);
        arr.push(userdata.data[key].employee);
        arr.push(userdata.data[key].user);
        arr.push(userdata.data[key].score);
        arr.push(userdata.data[key].remark);
        alldata.push(arr);
      }
    }

  var str ="<h1>评价记录"+alldata.length+"人次:</h1>";
  str +="<table border='1'>";
  str +="<tr>";
  str +="<th>序号</th><th>评价日期</th><th>评价时间</th><th>员工</th><th>用户</th><th>评分</th><th>评价</th>"
  str +="</tr>";
  for(var i=0;i<alldata.length;i++){
    str+="<tr><td>"+eval(i+1)+"</td><td>"+alldata[i][0]+"</td><td>"+alldata[i][1]+"</td><td>"+alldata[i][2]+"</td><td>"+alldata[i][3]+"</td><td>"+alldata[i][4]+"</td><td>"+alldata[i][5]+"</td></tr>"
  }
  str +="</table>";

//获得建议信息
const result2 = await db.collection('suggestions').limit(MAX_LIMIT).orderBy("dateTime","desc").get();


  var str2 ="<h1>最近100条建议记录</h1>";
  str2 +="<table border='1'>";
  str2 +="<tr>";
  str2 +="<th>序号</th><th>建议日期</th><th>建议内容</th><th>用户</th>"
  str2 +="</tr>";
  for(var i=0;i<result2.data.length;i++){
    str2+="<tr><td>"+eval(i+1)+"</td><td>"+result2.data[i].dateTime.toDateString()+"</td><td>"+result2.data[i].content+"</td><td>"+result2.data[i].user+"</td></tr>"
  }
  str2 +="</table>";

    // 创建一个邮件对象
  var mail = {
    // 发件人
    from: createDate+'评价记录 <1620649014@qq.com>',
    // 主题
    subject: createDate+'评价记录',
    // 收件人
    to: 'zhou.wenyan@huawei.com; hungarys.manager@huawei.com',
    // 邮件内容，text或者html格式
    html: str+"<br/>"+str2 //可以是链接，也可以是验证码
  };
  
  let res = await transporter.sendMail(mail);
  return 200;
}