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
    openid: null,
    role: null,
    userInfo: null,
    modle: null
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
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        this.globalData.openid = res.result.openid
        console.log('openid: ', this.globalData.openid);
        db.collection('user').where({
          openid: this.globalData.openid // 填入当前用户 openid
        }).get().then(res => {
          this.globalData.role = res.data.role;
        })
        //this.signUp_to_database(app.globalData.openid, app.globalData.userInfo);
      }
    })
  },
  signUp_to_database: function (userData, db) {
    var that = this;
    this.userQuery(db).then(function (res_q) {
      var flag = false;
      for (var i = 0; i < res_q.data.length; i++) {
        if (res_q.data[i]._openid == userData._openid) {
          flag = true;
          that.globalData.userId = res_q.data[i]._id;
        }
      }
      if (flag == false) {
        console.log("新增");
        db.collection('user').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            openid: userData._openid,
            nickName: userData.nickName,
            phoneNumber: '',
            role: '普通会员'
          }
        })
          .then(res => {
            console.log(res)
          })
          .catch(console.error)
      }
      else {
        console.log("更新");
        db.collection('user').doc(that.globalData.userId).update({
          // data 字段表示需新增的 JSON 数据
          data: {
            openid: userData._openid,
            nickName: userData.nickName,
            phoneNumber: '',
            role: '普通会员'
          }
        })
          .then(res => {
            console.log(res)
          })
          .catch(console.error)
      }
    })
  },
  userQuery: async function (db) {
    const MAX_LIMIT = 20;
    // 先取出集合记录总数
    const countResult = await db.collection('user').count();
    const total = countResult.total;
    // 计算需分几次取
    const batchTimes = Math.ceil(total / 1000);
    // 承载所有读操作的 promise 的数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('user').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
      tasks.push(promise)
    }
    // 等待所有
    return (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      }
    })
  },
  // signUp_to_database: function(openid, userInfo) {
  //   db.collection('user').get().then(res => {
  //     var flag = true;
  //     var i;
  //     var count = res.data.length;
  //     for (i = 0; i < count; i++) {
  //       if (res.data[i].openid == openid) {
  //         flag = false;
  //       }
  //     }
  //     if (flag) {
  //       db.collection('user').add({
  //           // data 字段表示需新增的 JSON 数据
  //           data: {
  //             openid: openid,
  //             nickName: userInfo.nickName,
  //             phoneNumber: '',
  //             role: '普通会员'
  //           }
  //         })
  //         .then(res => {
  //           console.log(res)
  //         })
  //         .catch(console.error)
  //     }
  //   }).catch(console.error)
  // }
})