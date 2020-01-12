// pages/i_day/index.js
const app = getApp()
const db = wx.cloud.database();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperCurrent: 0,
    imgUrls: null,
    iconColor: '#ffffff',
    navHeight: null,
    navTop: null,
    windowHeight: null,
    windowWidth: null,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular:true,
    current_1:1,
    circular_1:true,
    photoTweets: ['https://6761-gatto-pets-cafe-mzve6-1300835645.tcb.qcloud.la/1.png?sign=7f59e3a7f64439e500f0cbb4a7c72583&t=1576946432', 
    'https://6761-gatto-pets-cafe-mzve6-1300835645.tcb.qcloud.la/2.png?sign=eaff5e922a96a89e755b0913474c3b20&t=1576946457',
    'https://6761-gatto-pets-cafe-mzve6-1300835645.tcb.qcloud.la/3.png?sign=5937743528fe09b84ec0d21c91c1bfc3&t=1576946481',
    'https://6761-gatto-pets-cafe-mzve6-1300835645.tcb.qcloud.la/4.png?sign=09fcc14e9d9b45155c220f749b235221&t=1576946500']
  },
  //回退
  _navBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onAnimalType:function(e){
    wx.navigateTo({
      url: '/pages/animalList/index?id='+e.currentTarget.id,
    })
  },
  //轮播图的切换事件 
 swiperChange: function (e) {
  console.log(e.detail.current);
  this.setData({
   swiperCurrent: e.detail.current  //获取当前轮播图片的下标
  })
 },
 //滑动图片切换 
 chuangEvent: function (e) { 
  this.setData({
   swiperCurrent: e.currentTarget.id
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
    var img_urls = [];
    var that = this;
    db.collection('poster').where({
      type: "萌宠咖"
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