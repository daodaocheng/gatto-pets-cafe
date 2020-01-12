// pages/i_pets/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cost: 0,
    selected: 0,
    howMuch: 12,
    pullBar: false,
    showModal: false,
    foodName: null,
    src_big: null,
    sales: null,
    rating: null,
    material: null,
    price: null,
    desc: null,
    numb: null,
    index: null,
    pets: [{
      typeName: "猫",
      petContent: []
    },
    {
      typeName: "水母",
      petContent: []
    }, {
      typeName: "小宠物",
      petContent: []
    }, {
      typeName: "爬行动物",
      petContent: []
    }]
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