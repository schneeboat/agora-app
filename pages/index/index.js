//index.js

const app = getApp()

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
      url: '/pages/index/index',
    })
  },
  switchTab:function(e){
   console.log(e.currentTarget.dataset.value);
    var index = e.currentTarget.dataset.value;
    this.setData({ currentTab: e.currentTarget.dataset.value});
  },


  loadConfig:function(){
    const db = wx.cloud.database();
    db.collection('config').get({
    
    
    })
  },

  onReady: function() {
    console.log("index.onReady");
  },


  onShow: function() {
    console.log("index.onShow");
    this.loadConfig();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){

      app.userInfoReadyCallback = res => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
 
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


  onHide: function() {

  },


  onUnload: function() {

  },


  onPullDownRefresh: function() {

  },


  onReachBottom: function() {

  },


  onShareAppMessage: function() {

  },
})
