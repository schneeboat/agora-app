// pages/component/tab2/main.js
const app = getApp()
Component({
   
  data: {
    isLogin:false,
    status:"未预定",
    buttonType: "primary",
    quantity:1,
    orderId: null,
    floorNum:0,
    employee:null,
    isLongTime:0,
    can_order2:false,
    dinnerDate:null,
    checkboxItems:[
      {name:"我要长期预定",value:'1'}
    ]
  },


  properties: {

  },
  
  pageLifetimes: {

    show: function () {
      console.log("tab4.show");
      if (app.globalData.userInfo) {
        this.setData({
          isLogin:true
        })
        this.loadConfig();
  
      } else {
        app.userInfoReadyCallback = res => {
          this.setData({
            isLogin:true
          })
          this.loadConfig();
        }
      }
     },
    hide: function () { },
    resize: function () { },
  },


  attached:function(){
  },

  ready: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        isLogin:true
      })
      this.loadConfig();

    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          isLogin:true
        })
        this.loadConfig();
      }
    }
    
    
  },

  methods: {

    
 

    bindFormSubmit: function () {
     if(!this._validate()){
        return;
     }
      
   
      if (this.data.status == "已预定") {
        this._cancel();
      } else { 
        this._save();
      }
    },

    _getDinnerDate:function(){
      var now = new Date();
      var day = now.getDay();
      var delta = 6-day;
      now.setDate(now.getDate()+delta);
      return now.getMonth()+1+"月"+now.getDate()+"日";
    },
   

 
    init: function () {
      console.log("tab4.init");

      this.setData({
        status:"未预定",
        buttonType: "primary",
        quantity:1,
        orderId: null,
        floorNum:0,
        isLongTime:0
      })

      const db = wx.cloud.database();
      console.log(app.globalData.openId);
       db.collection('orders').where({_openid:app.globalData.openId}).orderBy('serverDate','desc').limit(1).get({
        success: res => {
          if (res.data.length > 0) {
            if (res.data[0].dinnerDate == this.data.dinnerDate&&res.data[0].status=="已预定") {
              this.setData({
                status:"已预定"
              })
            }
       
            this.setData({
              orderId: res.data[0]._id,
              employee:res.data[0].employee,
              quantity:res.data[0].quantity,
              isLongTime:res.data[0].isLongTime,
              floorNum:res.data[0].floorNum
            })
          }
           /* else{
            
            db.collection('ordersHU').where({_openid:app.globalData.openId}).orderBy('serverDate','desc').limit(1).get({//获取最近一条预定记录
              success: res => {
                if (res.data.length > 0) {
                  this.setData({
                    employee:res.data[1].employee,
                    floorNum:res.data[1].floorNum,
                  })
                }
              }
            })
          }  */
          wx.hideLoading();
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

    loadConfig:function(){
    console.log("tab4.loadConfig");
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
   

    selectFloorNum:function(e){
      var floorNum = e.currentTarget.dataset.floornum;
      this.setData({
        floorNum:floorNum
      })
  
    },
   

    getEmployee:function(e){
      this.setData({
        employee:e.detail.value
      })
    },

    checkboxChange:function(e){
      console.log(e.detail.value);
      if(e.detail.value==1){
        this.setData({
          isLongTime : 1
        })
      }else{
        this.setData({
          isLongTime : 0
        })
      }
    },

    sliderChange:function(e){
      this.setData({
        quantity:e.detail.value
      })
    },

  _validate:function(){

    if(!app.globalData.userInfo){
      wx.showToast({
        icon:"none",
        title: '请登录后提交',
      })
      return false;
    }
    if(!this.data.employee){
      wx.showToast({
        icon:"none",
        title: '请输入姓名工号',
      })
      return false;
    }
    if(this.data.floorNum==0){
      wx.showToast({
        icon:"none",
        title: '请选择楼层',
      })
      return false;
    }

    return true;
  },

    navigateToOrderRecord:function() {
      wx.switchTab({
 

        url: '/pages/orderRecord/',
      })
    },


    getWeek: function () {
      var d1 = new Date();
      var d2 = new Date();
      d2.setMonth(0);
      d2.setDate(1);
      var rq = d1 - d2;
      var s1 = Math.ceil(rq / (24 * 60 * 60 * 1000));
      var s2 = Math.ceil(s1 / 7);
      return s2;
    },

    

  _save:function(){
    wx.showLoading({
      title: '提交中...',
    })

    this.setData({
      status:"提交中"
    })
    const db = wx.cloud.database();
    var now = new Date();
    var dateTime = now.getMonth()+1+"月"+now.getDate()+"日";
    var serverDate = db.serverDate();
    db.collection('orders').add({
      data: {
        user: app.globalData.userInfo.nickName,
        employee:this.data.employee,
        floorNum:this.data.floorNum,
        quantity:this.data.quantity,
        isLongTime:this.data.isLongTime,
        dinnerDate: this.data.dinnerDate,
        dateTime: dateTime,
        serverDate:serverDate,
        status:"已预定"
      },
    
      success: res => {
        wx.showLoading({
          title: '提交中...',
        })
        this.init();
        wx.showToast({
          title: '预定成功',
        });

      },
 
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '预定失败'
        })
      }
    })
 },


 _cancel:function () {
 
   this.setData({
    status:"提交中"
  })
   const db = wx.cloud.database();
   db.collection('orders').where({
     _id :this.data.orderId,
     _openid:app.globalData.openId
   }).update({
     data:{
       status:"已取消"
     },
       success: res => {
       this.init();
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
 },
  },
  

  
})
