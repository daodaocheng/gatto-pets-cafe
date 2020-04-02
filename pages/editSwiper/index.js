// pages/editSwiiper/index.js
var num = 0;
var arr = new Array();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperItems: [{
      src: "https://6761-gatto-pets-cafe-mzve6-1300835645.tcb.qcloud.la/poster/%E6%A0%BC%E5%BA%A6banner.jpg?sign=8ddf1f1c12d0e89e83355e3751a1c166&t=1576856052",
      order: 1,
      url: ""
    }],
    newItems: []
  },

  addSwiper:function (e) {
    var swiperItemsNum = this.data.swiperItems.length;
    num ++;
    swiperItemsNum += num;
    var item = {
      src: "https://6761-gatto-pets-cafe-mzve6-1300835645.tcb.qcloud.la/poster/%E6%A0%BC%E5%BA%A6banner.jpg?sign=8ddf1f1c12d0e89e83355e3751a1c166&t=1576856052",
      order: swiperItemsNum,
      url: ''
    }
    arr.push(item);
    this.setData({
      newItems: arr
    })
    console.log("newItems:",this.data.newItems);
    console.log(e);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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