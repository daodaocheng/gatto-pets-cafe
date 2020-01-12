// pages/i_night/index.js
const app = getApp()
const db = wx.cloud.database();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    imgUrls2: [],
    iconColor: '#ffffff',
    navHeight: null,
    navTop: null,
    windowHeight: null,
    windowWidth: null,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    current_1: 1
  },
  //回退
  _navBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onSight:function(e){

  },
  onAlcohol:function(e){

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
    var img_urls = [];
    var that = this;
    db.collection('poster').where({
      type: "小酒馆"
    }).get({
      success(res) {
        var count = res.data.length;
        if (count != 0) {
          for (var i = 0; i < count; i++) {
            img_urls.push(res.data[i].src);
          }
        }
        that.setData({
          imgUrls: img_urls,
        })
      },
      fail(res_fail) {
        console.log(res_fail);
      }
    })
    var imgUrls_1 = [];
    db.collection('pictures').where({
      type: "小酒馆"
    }).get({
      success(res) {
        console.log(res);
        var count = res.data.length;
        if(count!=0){
          res.data.reverse();
          for (var i = 0; i < count; i++) {
            imgUrls_1.push(res.data[i].src);
          }
          that.setData({
            imgUrls2: imgUrls_1
          })
        }
      },
      fail(res_fail) {
        console.log(res_fail);
      }
    })
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