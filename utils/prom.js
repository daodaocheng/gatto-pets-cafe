/**
 * 将小程序的API封装成支持Promise的API
 * @params fn {Function} 小程序原始API，如wx.login
 */
var Promise = require('/promise.js');

const promisify = name => option =>
  new Promise((resolve, reject) =>
    wx[name]({
      ...option,
      success: resolve,
      fail: reject,
    })
  )

const getSettingsPromisified = promisify('getUserInfo');

module.exports = {
  getSettingsPromisified
}