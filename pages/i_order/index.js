// pages/i_order/index.js
const dbo = wx.cloud.database();
const _ = dbo.command;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cost: 0,
    selected: 0,
    howMuch: 12,
    pullBar: false,
    showModal:false,
    foodName:null,
    src_big:null,
    sales:null,
    rating:null,
    material:null,
    price:null,
    desc:null,
    numb:null,
    index:null,
    menu:[{
      typeName: "咖啡",
      menuContent: []
    },
    {
      typeName: "水果茶",
      menuContent: []
    },{
      typeName: "苏打",
      menuContent: []
    }, {
      typeName: "特调",
      menuContent: []
    }, {
      typeName: "甜点",
      menuContent: []
    }, {
      typeName: "酒",
      menuContent: []
    }, {
      typeName: "简餐",
      menuContent: []
    }]
  },
  modalShow:function(e){
    this.setData({
      showModal:true,
      foodName: e.currentTarget.dataset.name,
      src_big: e.currentTarget.dataset.src,
      sales: e.currentTarget.dataset.sales,
      rating: e.currentTarget.dataset.rating,
      material: e.currentTarget.dataset.material,
      price: e.currentTarget.dataset.price,
      desc: e.currentTarget.dataset.desc,
      numb: e.currentTarget.dataset.numb,
      index: e.currentTarget.dataset.index
    })
  },
  hideModal:function(e){
    this.setData({
      showModal:false
    })
  },
  pullBar: function () {
    this.setData({
      pullBar: !this.data.pullBar
    })
  },
  addToTrolley: function (e) {
    var info = this.data.menu;
    info[this.data.selected].menuContent[e.currentTarget.dataset.index].numb++;
    this.setData({
      cost: this.data.cost + this.data.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].price,
      menu: info,
    })
  },
  addToTrolley_modal: function (e) {
    var info = this.data.menu;
    console.log(this.data);
    info[this.data.selected].menuContent[this.data.index].numb++;
    this.setData({
      cost: this.data.cost + this.data.menu[this.data.selected].menuContent[this.data.index].price,
      menu: info,
      numb: info[this.data.selected].menuContent[this.data.index].numb
    })
  },
  removeFromTrolley: function (e) {
    var info = this.data.menu;
    if (info[this.data.selected].menuContent[e.currentTarget.dataset.index].numb != 0) {
      info[this.data.selected].menuContent[e.currentTarget.dataset.index].numb--;
      this.setData({
        cost: this.data.cost - this.data.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].price,
        menu: info,
      })
    }
  },
  removeFromTrolley_modal: function (e) {
    var info = this.data.menu;
    if (info[this.data.selected].menuContent[this.data.index].numb != 0) {
      info[this.data.selected].menuContent[this.data.index].numb--;
      this.setData({
        cost: this.data.cost - this.data.menu[this.data.selected].menuContent[this.data.index].price,
        menu: info,
        numb: info[this.data.selected].menuContent[this.data.index].numb
      })
    }
  },
  turnPage: function (e) {
    this.setData({
      currentPage: e.currentTarget.dataset.index
    })
  },
  turnTitle: function (e) {
    if (e.detail.source == "touch") {
      this.setData({
        currentPage: e.detail.current
      })
    }
  },
  turnMenu: function (e) {
    this.setData({
      selected: e.currentTarget.dataset.index
    })
    console.log(e.currentTarget.dataset.index);
  },
  getMenuList: function () {
    var that = this;
    switch(this.data.selected){
      case 0:
        dbo.collection('menu').where({
          typeName: '咖啡'
        }).get({
          success: function (res) {
            var arr = [];
            var count = res.data.length;
            if (count != 0) {
              for (var i = 0; i < count; i++) {
                arr.push(res.data[i]);
              }
              that.setData({
                'menu[0].menuContent': arr
              });
            }
          },
          fail: console.error
        })
      case 1:
        dbo.collection('menu').where({
          typeName: '水果茶'
        }).get({
          success: function (res) {
            var arr = [];
            var count = res.data.length;
            if (count != 0) {
              for (var i = 0; i < count; i++) {
                arr.push(res.data[i]);
              }
              that.setData({
                'menu[1].menuContent': arr
              });
            }
          },
          fail: console.error
        })
      case 2:
        dbo.collection('menu').where({
          typeName: '苏打'
        }).get({
          success: function (res) {
            var arr = [];
            var count = res.data.length;
            if (count != 0) {
              for (var i = 0; i < count; i++) {
                arr.push(res.data[i]);
              }
              that.setData({
                'menu[2].menuContent': arr
              });
            }
          },
          fail: console.error
        })
      case 3:
        dbo.collection('menu').where({
          typeName: '特调'
        }).get({
          success: function (res) {
            var arr = [];
            var count = res.data.length;
            if (count != 0) {
              for (var i = 0; i < count; i++) {
                arr.push(res.data[i]);
              }
              that.setData({
                'menu[3].menuContent': arr
              });
            }
          },
          fail: console.error
        })
      case 4:
        dbo.collection('menu').where({
          typeName: '甜点'
        }).get({
          success: function (res) {
            var arr = [];
            var count = res.data.length;
            if (count != 0) {
              for (var i = 0; i < count; i++) {
                arr.push(res.data[i]);
              }
              that.setData({
                'menu[4].menuContent': arr
              });
            }
          },
          fail: console.error
        })
      case 5:
        dbo.collection('menu').where({
          typeName: '酒'
        }).get({
          success: function (res) {
            var arr = [];
            var count = res.data.length;
            if (count != 0) {
              for (var i = 0; i < count; i++) {
                arr.push(res.data[i]);
              }
              that.setData({
                'menu[5].menuContent': arr
              });
            }
          },
          fail: console.error
        })
      case 6:
        dbo.collection('menu').where({
          typeName: '简餐'
        }).get({
          success: function (res) {
            var arr = [];
            var count = res.data.length;
            if (count != 0) {
              for (var i = 0; i < count; i++) {
                arr.push(res.data[i]);
              }
              that.setData({
                'menu[6].menuContent': arr
              });
            }
          },
          fail: console.error
        })
      break;
    }
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
    this.getMenuList();
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