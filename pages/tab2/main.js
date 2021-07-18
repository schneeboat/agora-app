// pages/tab2/main.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    message: "读取预定状态",
    buttonType: "primary",
    buttonText: "我要订餐",
    buttonDisabled: true,
    orderCount:0,
    orderId: null
  },

  //判断当天是是第几周
  getWeek: function() {
    var d1 = new Date();
    var d2 = new Date();
    d2.setMonth(0);
    d2.setDate(1);
    var rq = d1 - d2;
    var s1 = Math.ceil(rq / (24 * 60 * 60 * 1000));
    var s2 = Math.ceil(s1 / 7);
    return s2;
  },
  //订餐
  bindFormSubmit: function() {
    this.setData({
      buttonDisabled: true
    })
    wx.showLoading({
      title: '提交中...',
    })
    const db = wx.cloud.database();
    //判断是否预定过，如果没有预定则执行预定操作，如果已经预定则执行取消操作
    if (this.data.orderId == null) {
      db.collection('orders').add({
        data: {
          user: app.globalData.userInfo.nickName,
          week: this.getWeek(),
          dateTime: db.serverDate()

        },
        //保存成功时执行
        success: res => {
          this._init();
          wx.showToast({
            title: '预定成功',
          });

        },
        //保存失败时执行
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '预定失败'
          })
        }
      })
    } else { //已经预定执行取消操作
      db.collection('orders').doc(this.data.orderId).remove({
        success: res => {
          this._init();
          wx.showToast({
            title: '取消成功',
          });

        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '删除失败',
          })
          console.error('[数据库] [删除记录] 失败：', err)
        }
      })


    }


  },

  /**
   * 获取订餐人数
   */
  getOrderCount:function(){
    const db = wx.cloud.database()
    db.collection('orders').where({
      week: this.getWeek()
    }).count({
      success:res=>{
        console.log(res);
        this.setData({
          orderCount:res.total
        })
      },
      fail:res=>{
        console.log("订餐人数" + res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getOrderCount();
    if (app.globalData.userInfo) {
      this.setData({
        buttonDisabled: false
      })

    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          buttonDisabled: false
        })
      }
    }
    this._init();
  },


  /**
   * 初始化函数
   */
  _init: function() {
    //判断本周是否已经订餐
    const db = wx.cloud.database()
    db.collection('orders').where({
      _openid: this.data.openid,
      week: this.getWeek()
    }).get({
      success: res => {
        if (res.data.length > 0) {
          if (res.data[0].week == this.getWeek()) {
            this.setData({
              orderId: res.data[0]._id,
              message: "已经预定，是否要取消?",
              buttonText: "我要取消"
            })
          }
        } else {
          this.setData({
            orderId: null,
            message: "是否预定周六加班餐?",
            buttonText: "我要订餐"
          })
        }
        wx.hideLoading();
        this.setData({
          buttonDisabled: false
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})