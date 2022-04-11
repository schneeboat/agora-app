// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    const result = await cloud.openapi.subscribeMessage.send({
        touser: 'oOZ044xpL66-dDcVcj-KscWgRXNU',
        page: 'pages/index/index',
        lang: 'zh_CN',
        data: {
          thing1: {
            value: '东北欧'
          },
          date2: {
            value: '2015年01月05日'
          }
        },
        templateId: 'sCCGEUeNung9IJAnYZFOVXzFNo8rDlpW38jhcrmdKsg',
        miniprogramState: 'trial'
      })
    return result
  } catch (err) {
    return err
  }
}