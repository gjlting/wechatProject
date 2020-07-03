// pages/comment/comment.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieId: '',
    detail: [],
    content: '',
    score: 5,
    images: [],
    fileIds: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      movieId: options.movieId
    })
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: 'getDetail',
      data: {
        movieid: this.data.movieId
      }
    }).then(res => {
      this.setData({
        detail: JSON.parse(res.result)
      })
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  onContentChange(event) {
    console.log(event)
    this.setData({
      content: event.detail
    })
  },
  onScoreChange(event) {
    this.setData({
      score: event.detail
    })
  },
  uploadImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        let tempFilePaths = res.tempFilePaths
        this.setData({
          images: this.data.images.concat(tempFilePaths)
        })
      }
    })
  },
  submit() {
    wx.showLoading({
      title: '提交中...',
    })
    let promiseArr = []
    for(let i = 0; i < this.data.images.length; i++) {
      let item = this.data.images[i];
      let suffix = /\.\w+$/.exec(item)[0]; // 正则表达式，返回文件扩展名
      promiseArr.push(new Promise((resolve, reject) => {
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix,
          filePath: item,
          success: res => {
            console.log(res)
            this.setData({
              fileIds: this.data.fileIds.concat(res.fileID)
            })
            resolve()
          },
          fail: console.error
        })
      }))
    }
    Promise.all(promiseArr).then(() => {
      db.collection('comments').add({
        data: {
          content: this.data.content,
          score: this.data.score,
          movieid: this.data.movieId,
          fileIds: this.data.fileIds
        }
      }).then(res => {
        wx.hideLoading()
        wx.showToast({
          title: '您已提交评论！',
        })
      }).catch(err => {
        wx.hideLoading()
        console.log(err)
        wx.showToast({
          title: '提交失败！',
        })
      })
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