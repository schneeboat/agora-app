// pages/admin/admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /* can_order:false, */
    can_order2:false,
    dinnerDate:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadConfig();
  },
  /**
   * 加载配置文件
   */
  loadConfig:function(){
    console.log("admin.loadConfig");
    const db = wx.cloud.database();
    db.collection('config').get({
      success:res=>{
        this.setData({
          dinnerDate:res.data[0].dinnerDate,
         /*  can_order:res.data[1].can_order, */
          can_order2:res.data[0].can_order2
        })
        this.init();
      },
      fail:err=>{

      }
    })
  },
/*    switchChange:function(e){
    this.setData({
      can_order:e.detail.value
    }) 
  }, */
  switchChange2:function(e){
    this.setData({
      can_order2:e.detail.value
    })
  },
  sendFood:function (e) {
    wx.cloud.callFunction({
      name:"sendFoodHU",
      success:res=>{
        wx.showToast({
          title: '发送成功。',
        })
      },
      fail:err=>{
        console.log(err)
      }
    }
    );
  },
  submit:function(e){
    console.log(e.detail.value.dinnerDate)
    console.log(this.data.can_order2)
    const db = wx.cloud.database();
    db.collection("config").doc("cbddf0af60f03d13170dd9df7013f1e2").update({
      data:{dinnerDate:e.detail.value.dinnerDate,can_order2:this.data.can_order2}
    }).then(wx.showToast({
      title: '修改成功',
    }))
  },
  onReady: function () {

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