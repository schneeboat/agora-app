//app.js
App({
  onLaunch: function () {

    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    if (!wx.cloud) {
      console.error('error')
    }else {
      wx.cloud.init({
        traceUser: true,
      })
    }

  
    wx.login({
      success: res => {

        console.log("app.login");
        wx.cloud.callFunction({
          name:"getOpenId",
          complete:res=>{
            this.globalData.openId=res.result.openid;
          }
        });
      }
    })
   

    wx.getSetting({
      success: res => {
        console.log("app.getSetting");
        if (res.authSetting['scope.userInfo']) {

          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }              
              wx.redirectTo({
              url: '/pages/index/index',
              })
            }
          })
        }else{         
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