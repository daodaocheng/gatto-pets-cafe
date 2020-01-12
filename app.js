//app.js
wx.cloud.init({
  env: "gatto-pets-cafe-mzve6"
})
const db = wx.cloud.database();
var menuButtonObject = wx.getMenuButtonBoundingClientRect();
App({
  globalData: {
    navHeight: null,
    navTop: null,
    windowHeight: null,
    windowWidth: null,
    userInfo: null,
    openid: null
  },
  onLaunch: function() {
    wx.getSystemInfo({
      success: res => {
        var statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top, //胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2; //导航高度
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowWidth = res.windowWidth;
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      }
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // const app = getApp()
        // app.globalData.openid = res.data.openid
        // app.globalData.userInfo = res.data
        // if (!res.data.mobile) {
        //   wx.reLaunch({
        //     url: "/pages/bindPhone/index"
        //   });
        // }
        // this.http('v1/wx/getUser', { code:res.code}).then(res=>{
        //   const app = getApp()
        //   app.globalData.openid = res.data.openid
        //   app.globalData.userInfo = res.data
        //   if (!res.data.mobile) {
        //     wx.reLaunch({
        //       url: "/pages/bindPhone/index"
        //     });
        //   }
        // })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              wx.cloud.callFunction({
                name: 'login',
                complete: res => {
                  console.log('callFunction test result: ', res)
                  const app = getApp()
                  app.globalData.openid = res.result.openid
                  console.log('openid: ', app.globalData.openid);
                  this.signUp_to_database(app.globalData.openid, app.globalData.userInfo);
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  signUp_to_database: function(openid, userInfo) {
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
  }
})