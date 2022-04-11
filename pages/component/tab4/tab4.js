// pages/component/tab2/main.js
const app = getApp()
Component({
  data: {
    isLogin:false,
    status:"未预定",
    buttonType: "primary",
    orderId: null,
    floorNum:0,
    employee:null,
    can_order2:false,
    dinnerDate:null,
    breaki:0,
    lunch:0,
    dinner:0,
    checkboxItemsbreaki:[
      {name:"Breakfast",value:'1'}
    ],
     checkboxItemslunch:[
      {name:"Lunch",value:'1'}
    ],
     checkboxItemsdinner:[
      {name:"Dinner",value:'1'}
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
    init: function () {
      console.log("tab4.init");
      this.setData({
        status:"未预定",
        buttonType: "primary",
        orderId: null,
        floorNum:0,
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
              floorNum:res.data[0].floorNum,
              breaki:res.data[0].breaki,
              lunch:res.data[0].lunch,
              dinner:res.data[0].dinner,
           
            })


          }
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
    const db= wx.cloud.database();   
    var now = new Date();
  var mealTime = now.getMonth()+1+"月"+Number(now.getDate()+1)+"日";  
var hourn = now.getHours();
if(hourn >=19){
  db.collection("config").doc("807102f6624d90ea04ddb6b568356b53").update({
    data:{can_order2:false}
  })
}else{
   db.collection("config").doc("807102f6624d90ea04ddb6b568356b53").update({
      data:{can_order2:true}
    })
}
      db.collection('config').get({
      success:res=>{
        this.setData({
         dinnerDate:mealTime,
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

    checkboxChangebreaki:function(e){
      console.log(e.detail.value);
      if(e.detail.value==1){
        this.setData({
          breaki : 1
        })
      }else{
        this.setData({
          breaki : 0
        })
      }
    },
        checkboxChangelunch:function(e){
      console.log(e.detail.value);
      if(e.detail.value==1){
        this.setData({
          lunch : 1
        })
      }else{
        this.setData({
          lunch : 0
        })
      }
    },
        checkboxChangedinner:function(e){
      console.log(e.detail.value);
      if(e.detail.value==1){
        this.setData({
          dinner : 1
        })
      }else{
        this.setData({
          dinner : 0
        })
      }
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
      if(this.data.breaki==0 &&this.data.lunch==0 &&this.data.dinner==0 ){
      wx.showToast({
        icon:"none",
        title: '请输入餐类',
      })
      return false;
    }
    return true;
  },
 navigateToOrderRecord:function() {
      wx.switchTab({
  url: '/pages/orderRecord/main',
      })
    },
  _save:function(){
    wx.showLoading({
      title: 'Submitting...',
    })

    this.setData({
      status:"提交中"
    })
    const db = wx.cloud.database();
    var now = new Date();
    var dateTime = now.getMonth()+1+"月"+now.getDate()+"日";
    var serverDate = db.serverDate();
    var mealTime = now.getMonth()+1+"月"+Number(now.getDate()+1)+"日";

    db.collection('orders').add({
      data: {
        user: app.globalData.userInfo.nickName,
        employee:this.data.employee,
        breaki:this.data.breaki,
        lunch:this.data.lunch,
        dinner:this.data.dinner,
        floorNum:this.data.floorNum,
        dinnerDate:mealTime,
        dateTime: dateTime,
        serverDate:serverDate,
        status:"已预定"
      },
    
      success: res => {
        wx.showLoading({
          title: 'Submitting...',
        })
        this.init();
        wx.showToast({
          title: 'Success',
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
