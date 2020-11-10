// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectList:[]

  },

  onShow: function () {
    let collect = wx.getStorageSync("collect")||[];
    this.setData({
      collectList:collect
    })
  }
})