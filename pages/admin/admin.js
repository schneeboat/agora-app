// pages/admin/admin.js
Page({

<<<<<<< HEAD

  data: {
    can_order2:false,
    dinnerDate:null
  },


  onLoad: function (options) {
    this.loadConfig();
  },

=======
  /**
   * 页面的初始数据
   */
  data: {
    can_order:false,
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
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
  loadConfig:function(){
    console.log("admin.loadConfig");
    const db = wx.cloud.database();
    db.collection('config').get({
      success:res=>{
        this.setData({
          dinnerDate:res.data[0].dinnerDate,
<<<<<<< HEAD

          can_order2:res.data[0].can_order2
=======
          can_order:res.data[0].can_order,

>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
        })
        this.init();
      },
      fail:err=>{

      }
    })
  },
<<<<<<< HEAD

  switchChange2:function(e){
    this.setData({
      can_order2:e.detail.value
    })
  },
  sendFood:function (e) {
=======
  switchChange:function(e){
    this.setData({
      can_order:e.detail.value,
    })
  },

  sendFoodHU:function (e) {
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
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
<<<<<<< HEAD
    console.log(this.data.can_order2)
    const db = wx.cloud.database();
    db.collection("config").doc("cbddf0af60f03d13170dd9df7013f1e2").update({
      data:{dinnerDate:e.detail.value.dinnerDate,can_order2:this.data.can_order2}
=======
    console.log(this.data.can_order)
    const db = wx.cloud.database();
    db.collection("config").doc("cbddf0af60f03d13170dd9df7013f1e2").update({
      data:{dinnerDate:e.detail.value.dinnerDate,can_order:this.data.can_order}
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
    }).then(wx.showToast({
      title: '修改成功',
    }))
  },
  onReady: function () {

  },

<<<<<<< HEAD
=======
  /**
   * 生命周期函数--监听页面显示
   */
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
  onShow: function () {

  },

<<<<<<< HEAD

=======
  /**
   * 生命周期函数--监听页面隐藏
   */
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
  onHide: function () {

  },

<<<<<<< HEAD
=======
  /**
   * 生命周期函数--监听页面卸载
   */
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
  onUnload: function () {

  },

<<<<<<< HEAD

=======
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
  onPullDownRefresh: function () {

  },

<<<<<<< HEAD
=======
  /**
   * 页面上拉触底事件的处理函数
   */
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
  onReachBottom: function () {

  },

<<<<<<< HEAD

=======
  /**
   * 用户点击右上角分享
   */
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
  onShareAppMessage: function () {

  }
})