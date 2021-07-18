<<<<<<< HEAD
//logs.js
=======
// logs.js
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
<<<<<<< HEAD
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
=======
  onLoad: function() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
        
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
      })
    })
  }
})
