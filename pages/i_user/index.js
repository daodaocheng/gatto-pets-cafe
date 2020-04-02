// pages/user/index.js
const app = getApp();
wx.cloud.init({
  env: "gatto-pets-cafe-mzve6"
})
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: null,
    hasUserInfo: false,
    modle: null,
    hasPhoneNumber: false
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo != null){
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },
  getUserInfo: function(e) {
    var that = this;
    var _that = e;
    var userData = null;
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    console.log(app.globalData.userInfo);
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log('callFunction test result: ', res)
        app.globalData.openid = res.result.openid
        app.userQuery(db).then(function (res_q) {
          var flag = false;
          for (var i = 0; i < res_q.data.length; i++) {
            if (res_q.data[i]._openid == app.globalData.openid) {
              flag = true;
              app.globalData.role = res_q.data[i].role;
              that.setData({
                userInfo: _that.detail.userInfo,
                hasUserInfo: true,
              });
            }
          }
          if(flag == false){
            userData = {
              openid: app.globalData.openid,
              nickName: app.globalData.userInfo.nickName,
            }
            app.signUp_to_database(userData, db);
          }
        })
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