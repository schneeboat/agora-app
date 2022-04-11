// pages/component/tab3/main.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    content: "",
    buttonDisabled: true

  },

  /**
   * 生命周期函数
   */
  ready: function () {
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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    //保存意见
    bindFormSubmit: function (e) {
      if (e.detail.value.textarea == "") {
        wx.showToast({
          icon: "none",
          title: '说点啥呗',
          content: '',
        });
        return;
      }
      wx.showLoading({
        title: 'Saving...',
      })
      const db = wx.cloud.database()
      db.collection('suggestions').add({
        data: {
          content: e.detail.value.textarea,
          user: app.globalData.userInfo.nickName,
          dateTime: db.serverDate()

        },
        //保存成功时执行
        success: res => {
          this.setData({
            content: ""
          })
          wx.hideLoading();
          wx.showToast({
            title: 'Success',
          })
        },
        //保存失败时执行
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: 'Fail'
          })
        }
      })
    },

  }
})
