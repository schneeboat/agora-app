// pages/orderRecord/main.js
const app = getApp()
Page({


  data: {
    dinnerDate:null,
    count:0,
    listData:null
  },


  onLoad: function (options) {

  },


  onReady: function () {
    this.loadConfig();
  },
  /**
   * 
   */
  loadConfig:function(){
    const db = wx.cloud.database();
    db.collection('config').get({
      success:res=>{
        this.setData({
          dinnerDate:res.data[0].dinnerDate,
        })
        this.getOrderList();
      },
      fail:err=>{

      }
    })
  },


  sendMail:function(){
    let that = this
    wx.cloud.callFunction({
      name:"sendFoodHU",
      success:res=>{
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


  getOrderList:function(){
    const db = wx.cloud.database();

    // db.collection('orders').count({
    //   success:res=>{
    //     this.setData({
    //       count:res.total
    //     })
    //   }
    // }),

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