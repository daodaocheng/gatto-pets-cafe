// pages/user/index.js
const app = getApp()
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
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
  },
  getUserInfo: function (e) {
    var that = this;
    var _that = e;
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    console.log(app.globalData.userInfo);
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log('callFunction test result: ', res)
        const app = getApp()
        app.globalData.openid = res.result.openid
        console.log('openid: ', app.globalData.openid);
        that.signUp_to_database(app.globalData.openid, app.globalData.userInfo)
        that.setData({
          userInfo: _that.detail.userInfo,
          hasUserInfo: true,
        });
      }
    })
  },
  signUp_to_database: function (openid, userInfo) {
    db.collection('user').get().then(res => {
      var count = res.data.length;
      var flag = true;
      for (var i = 0; i < count; count++) {
        if (res.data.openid == openid) {
          flag = false;
        }
      }
      if (flag) {
        db.collection('user').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            openid: openid,
            nickName: userInfo.nickName,
            phoneNumber: '',
            role: '普通会员'
          }
        })
          .then(res => {
            console.log(res)
          })
          .catch(console.error)
      }
    }).catch(console.error)
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