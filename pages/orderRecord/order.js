const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dinnerDate:null,
    count:0,
    listData:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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

  /**
   * 发送预定记录
   */
  sendMailHU:function(){
    let that = this
    wx.cloud.callFunction({
      name:"sendMailHU",
      success:res=>{
        //that.getFileUrl(res.result.fileID)
      },
      fail:err=>{
        console.log(err)
      }
    })
  },

  /**
   * 获得excel文件的URL
   */
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

  /**
   * 获得订餐清单
   */
  getOrderList:function(){
    const db = wx.cloud.database();
    //获取订餐人数
    // db.collection('orders').count({
    //   success:res=>{
    //     this.setData({
    //       count:res.total
    //     })
    //   }
    // }),
    //获取订餐列表
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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})