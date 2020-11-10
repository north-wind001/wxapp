// pages/user/user.js
Page({

  data: {
    userinfo:{},
    collectNum:0
  },
  onShow(){
    const userinfo = wx.getStorageSync("userinfo");
    // console.log(userinfo);
    let collect = wx.getStorageSync("collect")||[];
    this.setData({
      userinfo,
      collectNum:collect.length
    })
  }
})