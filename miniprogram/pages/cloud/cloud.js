// pages/cloud/cloud.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  insert() {
    db.collection('users')
    .add({
      data: {
        name: "lucky",
        age: 18
      },
      success: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  },
  update() {
    db.collection('users').doc('f11f525b5efb0ba4000c0adf6b118a86').update({
      data: {
        age: 16
      }
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  },
  search() {
    db.collection('users').where({
      name:'lucky'
    }).get().then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  },
  delete() {
    db.collection('users')
    .doc('b7d9f2ea5efb00bb001108725e02c2e6')
    .remove()
    .then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  sum() {
    wx.cloud.callFunction({
      name: 'sum',
      data: {
        a: 6,
        b: 8
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  getOpenId() {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  batchDelete() {
    wx.cloud.callFunction({
      name: 'batchDelete'
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
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