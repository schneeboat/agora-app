// index.js
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
  //事件处理函数
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
      url: '/pages/history/history',
    })
  },
  switchTab:function(e){
   console.log(e.currentTarget.dataset.value);
    var index = e.currentTarget.dataset.value;
    this.setData({ currentTab: e.currentTarget.dataset.value});
  },

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
  onReady: function() {
    console.log("index.onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("index.onShow");
    this.loadConfig();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
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

