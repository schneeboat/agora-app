<<<<<<< HEAD
//app.js
App({
  onLaunch: function () {

=======
// app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    if (!wx.cloud) {
<<<<<<< HEAD
      console.error('error')
    }else {
      wx.cloud.init({
=======
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    }else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
        traceUser: true,
      })
    }

<<<<<<< HEAD
  
    wx.login({
      success: res => {

=======
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
        console.log("app.login");
        wx.cloud.callFunction({
          name:"getOpenId",
          complete:res=>{
            this.globalData.openId=res.result.openid;
          }
        });
      }
    })
   
<<<<<<< HEAD

=======
    // 获取用户信息
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
    wx.getSetting({
      success: res => {
        console.log("app.getSetting");
        if (res.authSetting['scope.userInfo']) {
<<<<<<< HEAD

          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }              
=======
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
              wx.redirectTo({
              url: '/pages/index/index',
              })
            }
          })
<<<<<<< HEAD
        }else{         
=======
        }else{
         
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
          wx.redirectTo({
           url: '/pages/index/index',
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})