// pages/animalList/index.js
const db = wx.cloud.database();
const _ = db.command;
const app = getApp();
var id = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animals:[],
    windowHeight: null,
    windowWidth: null,
    navHeight: null,
    navTop: null,
    images:null,
    showModal:false,
    name:null,
    age:null,
    variety:null,
    color:null,
    photo:null,
    info:null,
    genda:null
  },
  modalShow:function(e){
    this.setData({
      showModal: true,
      name: e.currentTarget.dataset.name,
      age: e.currentTarget.dataset.age,
      variety: e.currentTarget.dataset.variety,
      color: e.currentTarget.dataset.color,
      photo: e.currentTarget.dataset.photo,
      info: e.currentTarget.dataset.info,
      genda: e.currentTarget.dataset.genda
    });
  },
  hideModal: function (e) {
    this.setData({
      showModal: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      windowHeight: app.globalData.windowHeight,
      windowWidth: app.globalData.windowWidth,
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop
    })
    id = options.id;
    console.log("id:"+id);
    // db.collection('animals').where({
    //   type: '猫'
    // }).get({
    //   success: function (res) {
    //     that.setData({
    //       animals: res.data.reverse()
    //     })
    //     console.log(that.data);
    //   },
    //   fail: console.error
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      animals: []
    })
    var that = this;
    if (id == 0) {
      db.collection('animals').where({
        type: '猫'
      }).get({
        success: function (res) {
          that.setData({
            animals: res.data
          })
          console.log(that.data);
        },
        fail: console.error
      })
    } else if (id == 1) {
      db.collection('animals').where({
        type: '爬行动物'
      }).get({
        success: function (res) {
          that.setData({
            animals: res.data
          })
        },
        fail: console.error
      })
    } else if (id == 2) {
      db.collection('animals').where({
        type: '小宠物'
      }).get({
        success: function (res) {
          that.setData({
            animals: res.data
          })
        },
        fail: console.error
      })
    } else if (id == 3) {
      db.collection('animals').where({
        type: '水母'
      }).get({
        success: function (res) {
          that.setData({
            animals: res.data
          })
        },
        fail: console.error
      })
    } else {
      console.log("判断有误")
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})