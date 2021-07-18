// pages/admin/admin.js
Page({


  data: {
    can_order2:false,
    dinnerDate:null
  },


  onLoad: function (options) {
    this.loadConfig();
  },

  loadConfig:function(){
    console.log("admin.loadConfig");
    const db = wx.cloud.database();
    db.collection('config').get({
      success:res=>{
        this.setData({
          dinnerDate:res.data[0].dinnerDate,

          can_order2:res.data[0].can_order2
        })
        this.init();
      },
      fail:err=>{

      }
    })
  },

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