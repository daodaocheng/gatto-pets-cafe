//index.js
const util = require('../../utils/prom');
const app = getApp();
const db = wx.cloud.database();
const _ = db.command;
wx.cloud.init({
  env: "gatto-pets-cafe-mzve6"
})
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: null,
    photoTweets: null,
    indicatorDots: true,
    indicatorDots_1: false,
    autoplay_1: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    circular1: true,
    current_1: 0,
    current: 4,
    list: [],
    page: 1,
    navHeight: null,
    navTop: null,
    windowHeight: null,
    windowWidth: null,
    video: null,
    role: null,
    showModal: null,
    model: null,
    modeName: null
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  addCart(data) {
    let item = data.currentTarget.dataset.item
    // app.http('v1/order/addCart', {
    //   id: item._id,
    //   num: 1,
    //   spec: ['asdasasd'],
    //   title: item.title,
    //   img: item.img,
    //   price: item.price
    // }, "POST")
    //   .then(res => {
    //     console.log(res)
    //     if (res.code == 200) {
    //       wx.showToast({
    //         title: '已加入购物车',
    //         icon: 'success',
    //         duration: 500
    //       })
    //     }
    //   })
  },
  imgsc: function(e) {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
      }
    })
  },
  lower: function(e) {
    console.log(e)
    this.getList()
  },
  /**
   * 公众号推文跳转
   */
  toPhotoTweets: function(e) {
    var id = e.currentTarget.dataset.id; // 获取点击的推文的数组下标
    var url = this.data.photoTweets[id].url; // 通过id判断是哪个推文的链接
    //跳转并传参
    wx.navigateTo({
      url: '/pages/showTweets/showTweets?name=photoTweets&url=' + url,
    })
  },
  hideModal:function(){
    this.setData({
      showModal: false
    })
    app.globalData.model = this.data.model;
  },
  onShowModel: function(e) {
    this.setData({
      model: 'show',
      modeName: '普通模式',
      showModal: false
    })
    app.globalData.model = this.data.model;
  },
  onEditModel: function(e) {
    this.setData({
      model:'edit',
      modeName: '编辑模式',
      showModal: false
    })
  },
  onModelChange: function(e) {
    if(this.data.model != 'edit'){
      this.setData({
        model: 'edit'
      })
    }else {
      this.setData({
        model: 'show'
      })
    }
  },
  clickEditSwiper: function(e) {
    wx.navigateTo({
      url: '../editSwiper/index',
    })
  },
  onLoad: function() {
    let app = getApp()
    this.setData({
      windowHeight: app.globalData.windowHeight,
      windowWidth: app.globalData.windowWidth,
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    })
    this.getPhotoTweets;
    var that = this;
    if (app.globalData.userInfo == null) {
      util.getSettingsPromisified().then(function (res) {
        app.globalData.userInfo = res.userInfo
        wx.cloud.callFunction({
          name: 'login',
          complete: res => {
            app.globalData.openid = res.result.openid
            console.log('openid: ', app.globalData.openid);
            db.collection('user').where({
              openid: app.globalData.openid // 填入当前用户 openid
            }).get().then(res => {
              app.globalData.role = res.data[0].role;
              that.setData({
                role: app.globalData.role
              })
              console.log("2用户角色:" + that.data.role);
              if (that.data.role == '管理员') {
                that.setData({
                  showModal: true
                })
              }
            })
            //app.signUp_to_database(app.globalData.openid, app.globalData.userInfo);
          }
        })
      }).catch(() => console.log('failure'));
    } else {
      //app.globalData.userInfo = res.userInfo
      wx.cloud.callFunction({
        name: 'login',
        complete: res => {
          app.globalData.openid = res.result.openid
          console.log('openid: ', app.globalData.openid);
          db.collection('user').where({
            openid: app.globalData.openid // 填入当前用户 openid
          }).get().then(res => {
            console.log("1_res用户角色:");
            console.log(res);
            app.globalData.role = res.data[0].role;
            console.log("1_app用户角色:" + app.globalData.role);
            that.setData({
              role: app.globalData.role
            })
            console.log("1用户角色:" + that.data.role);
            if (that.data.role == '管理员') {
              that.setData({
                showModal: true
              })
            }
          })
        }
      })
    }
    db.collection('video').get({
      success(res) {
        for(var i = 0; i < res.data.length; i ++){
          if(res.data[i].publish == true){
            that.setData({
              video: res.data[i].video
            })
          }
        }
      },
      fail(res_fail) {
        console.log(res_fail);
      }
    })
    var img_urls = [];
    db.collection('poster').where({
      type: "首页"
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
    db.collection('photoTweets').get({
      success(res) {
        that.setData({
          photoTweets: res.data.reverse(), // 使最新推文在上面
        })
      },
      fail(res_fail) {
        console.log(res_fail);
      }
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("show：");
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})