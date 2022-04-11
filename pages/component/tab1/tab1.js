// pages/component/tab1/main.js

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
    employee:null,
    score1:"",
    score2:"",
    score3:"",
    score4:"",
    score5:"",
    createDate:"",
    buttonDisabled: true,
    buttonHidden: true,
    remarkHidden: true,
    score: 0,
    remark: "",
    remark1: "Tastes bad/too oily/too spicy",
    remark2: "Not clean",
    remark3: "Limited supply",
    remark4: "Long queue",
    remark5: "Bad attitude",
    remark6: "Low hygiene",
    hiddenSendCommentModal:true,
    password1:null
  },
  /**
    * 生命周期函数--监听页面加载
    */
  ready: function () {
    this.setData({
      createDate:new Date().format("yyyy-MM-dd")
    })
    if (app.globalData.userInfo) {
      this.setData({
        buttonDisabled: false
      })
      this.init();

    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          buttonDisabled: false
        })
      }
      this.init();
    }
  },


  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 初始化，获得当前用户及当天的评价记录
     */
    init:function(){
      wx.showLoading({
        title: 'Loading',
      })

      const db = wx.cloud.database();
      console.log(app.globalData.openId);

       db.collection('scores').where({_openid:app.globalData.openId}).orderBy('createDate','desc').limit(1).get({//获取最近一条预定记录
        success: res => {
          if (res.data.length > 0) {
            if (res.data[0].createDate == this.data.createDate) {
              this.setData({
                buttonDisabled:true
              })
            }
          } 
          wx.hideLoading();

        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: 'Fail'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })

      wx.cloud.callFunction({
        name:"initTab1",
        data:{
          createDate:this.data.createDate
        },
        success:res=>{
          var total = res.result.score1+res.result.score2+res.result.score3+res.result.score4+res.result.score5;
          var score1 =total?":"+parseInt(res.result.score1*100/total)+'%,'+res.result.score1+" 次":"";
          var score2 =total?":"+parseInt(res.result.score2*100/total)+'%,'+res.result.score2+" 次":"";
          var score3 =total?":"+parseInt(res.result.score3*100/total)+'%,'+res.result.score3+" 次":"";
          var score4 =total?":"+parseInt(res.result.score4*100/total)+'%,'+res.result.score4+" 次":"";
          var score5 =total?":"+parseInt(res.result.score5*100/total)+'%,'+res.result.score5+" 次":"";
          this.setData({
            buttonHidden:false,
            //buttonDisabled:false,
            employee:res.result.employee,
            score1:score1,
            score2:score2,
            score3:score3,
            score4:score4,
            score5:score5
          })
          wx.hideLoading();
        },
        fail:err=>{
          console.log(err)
          wx.hideLoading();
        }
      })
    },
    //获得员工信息
    getEmployee:function(e){
      this.setData({
        employee:e.detail.value
      })
    },
    bindDateChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        createDate: e.detail.value
      })
      this.init();
    },

    cancel1:function(){
      this.setData({
        hiddenSendCommentModal:true
      })
    },

    getPassword1:function(e){
      this.setData({
        password1:e.detail.value
      })
    },

    confirm1:function(){
      if(this.data.password1=="546754"){
        console.log("密码正确")
        this.sendScore()
      }else{
        console.log("密码错误")
      }
      this.setData({
        hiddenSendCommentModal:true,
        password1:null
      })
    },

    sendScoreNew:function(){
      this.setData({
        hiddenSendCommentModal:false
      })
    },

    /**
     * 发送评价记录
     *  
     */
    sendScore:function(e){
      wx.cloud.callFunction({
        name:"sendScore",
        data:{createDate:this.data.createDate},
        success:res=>{
          wx.showToast({
            title: 'Success',
          })
        },
        fail:err=>{
          console.log(err)
        }
      }
      );
    },
    /**
     * 
     * 保存评价记录 
     */
    setScore: function (e) {
     
      if(!this.data.employee){
        wx.showToast({
          icon:"none",
          title: 'Please type in your Name + ID',
        })
        return;
      }
      if (e.currentTarget.dataset["score"] == 1 || e.currentTarget.dataset["score"] == 2) {
        
        this.setData({
          buttonHidden: true,
          remarkHidden: false,
          score: e.currentTarget.dataset["score"],
        });
        return;
      } else if (e.currentTarget.dataset["score"] == null) {
        wx.showLoading({
          title: 'Saving',
        })
        this.setData({
          remark: e.currentTarget.dataset["remark"],
        });
      } else {
        wx.showLoading({
          title: 'Saving',
        })
        this.setData({
          score: e.currentTarget.dataset["score"],
        })
      }
      this.setData({
        buttonDisabled:true
      });
      const db = wx.cloud.database();
      db.collection("scores").add({
        data: {
          score: this.data.score,
          dateTime: db.serverDate(),
          employee:this.data.employee,
          createDate:new Date().format("yyyy-MM-dd"),
          createTime:new Date().format("hh:mm:ss"),
          user: app.globalData.userInfo.nickName,
          remark: this.data.remark
        },
        success: res => {
          
          this.init();
          wx.showToast({
            title: 'Success',
          });
          this.setData({
            buttonHidden: false,
            remarkHidden: true
          })
        },
      
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: 'Fail'
          })
        }
      })
    },

    showRemark: function () {
      this.setData({
        remarkHidden: false,
        buttonHidden: true
      })
    },

 
  }
})
