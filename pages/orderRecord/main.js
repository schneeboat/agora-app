// pages/orderRecord/main.js
const app = getApp()
Page({
  data: {
    can_order2:true,
    count:0,
    listData:null,
    hiddenSendCommentModal:true,
    password1:null
  },
  onLoad: function (options) {

  },


  onReady: function () {
    this.loadConfig();
  },
  
  loadConfig:function(){
    const db = wx.cloud.database();
    db.collection('config').get({
      success:res=>{
        this.setData({
          can_order2:res.data[0].can_order2
        })
        this.getOrderList();
      },
      fail:err=>{

      }
    })
  },
  
 
  sendFood:function(){
    
    let that = this
    wx.cloud.callFunction({
      name:"sendFoodHU",
      success:res=>{
        wx.showToast({
          title: '发送成功',
        })
        
        //that.getFileUrl(res.result.fileID)
      },
      fail:err=>{
        console.log(err)
      }
    })
  },


  getFileUrl:function(fileID){
    let that = this;
    wx.cloud.getTempFileURL({
      fileList: [fileID],
      success: res => {
        // get temp file URL
        console.log("文件下载链接", res.fileList[0].tempFileURL)
        that.setData({
          fileUrl: res.fileList[0].tempFileURL
        })
      },
      fail: err => {
        // handle error
        console.log(err)
      }
    })
  },

  cancel1:function(){
    this.setData({
      hiddenSendCommentModal:true
    })
  },

  getPassword1:function(e){
    this.setData({
      password1:e.detail.value
    })
  },
  sendScoreNew:function(){
    this.setData({
      hiddenSendCommentModal:false
    })
  },

  confirm1:function(){
    if(this.data.password1=="546754"){
      console.log("密码正确")
      this.sendFood()
    }else{
      console.log("密码错误")
    }
    this.setData({
      hiddenSendCommentModal:true,
      password1:null
    })
  },

  getOrderList:function(){
    const db = wx.cloud.database();

    db.collection('orders').where({_openid:app.globalData.openId}).orderBy('serverDate','desc').limit(20).get({
      success: res => {
        this.setData({
          listData:res.data
        })
        
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  onShow: function () {

  },


  onHide: function () {

  },


  onUnload: function () {

  },


  onPullDownRefresh: function () {

  },


  onReachBottom: function () {

  },


  onShareAppMessage: function () {

  }
})