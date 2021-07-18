<<<<<<< HEAD
//index.js

const app = getApp()

=======
// index.js
const app = getApp()
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hiddenPasswordModal:true,
    password:null
    
  },
  cancel:function(){
    this.setData({
      hiddenPasswordModal:true
    })
  },
  getPassword:function(e){
    this.setData({
      password:e.detail.value
    })
  },
  confirm:function(){
    if(this.data.password=="546754"){
      console.log("密码正确")
      wx.navigateTo({
        url: '/pages/admin/admin',
      })
    }else{
      console.log("密码错误")
    }
    this.setData({
      hiddenPasswordModal:true,
      password:null
    })
  },
  showPasswordModal:function(){
    this.setData({
      hiddenPasswordModal:false
    })
  },
<<<<<<< HEAD
  
=======
  //事件处理函数
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log("index.onLoad");
   
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.reLaunch({
<<<<<<< HEAD
      url: '/pages/index/index',
=======
      url: '/pages/history/history',
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
    })
  },
  switchTab:function(e){
   console.log(e.currentTarget.dataset.value);
    var index = e.currentTarget.dataset.value;
    this.setData({ currentTab: e.currentTarget.dataset.value});
  },

<<<<<<< HEAD

  loadConfig:function(){
    const db = wx.cloud.database();
    db.collection('config').get({
    
    
    })
  },

=======
  /**
   * 加载配置文件
   */
  loadConfig:function(){
    const db = wx.cloud.database();
    db.collection('config').get({
      success:res=>{
        this.setData({
        
        })
      },
      fail:err=>{

      }
    })
  },
   /**
   * 生命周期函数--监听页面初次渲染完成
   */
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
  onReady: function() {
    console.log("index.onReady");
  },

<<<<<<< HEAD

=======
  /**
   * 生命周期函数--监听页面显示
   */
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
  onShow: function() {
    console.log("index.onShow");
    this.loadConfig();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
<<<<<<< HEAD

=======
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
      app.userInfoReadyCallback = res => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
<<<<<<< HEAD
 
=======
      // 在没有 open-type=getUserInfo 版本的兼容处理
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

<<<<<<< HEAD

=======
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
  onHide: function() {

  },

<<<<<<< HEAD

=======
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
  onUnload: function() {

  },

<<<<<<< HEAD

=======
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
  onPullDownRefresh: function() {

  },

<<<<<<< HEAD

=======
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
  onReachBottom: function() {

  },

<<<<<<< HEAD

=======
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
  onShareAppMessage: function() {

  },
})
<<<<<<< HEAD
=======

>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
