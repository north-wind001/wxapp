// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"全部订单",
        isActive:true
      },
      {
        id:1,
        value:"待付款",
        isActive:false
      },
      {
        id:2,
        value:"待收货",
        isActive:false
      },
      {
        id:3,
        value:"退款/退货",
        isActive:false
      }
    ],
    payed:[]

  },
  onShow(){
    let payed = wx.getStorageSync("payed")||[];
    // console.log(checkedCart);
    this.setData({
      payed
    })
    // 获取页面栈
    let pages =  getCurrentPages();
    // 当前页面
    let currentPage = pages[pages.length-1];
    // console.log(currentPage);
    // 获取url传递的type值
    const {type} = currentPage.options;
    // console.log(type);
    this.getTitleChange(type-1);
  },
  getTitleChange(index){
    let {tabs}=this.data;
    tabs.forEach((v,i) =>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  handleItemChange(e){
    // console.log(e);
    const {index}=e.detail;
    this.getTitleChange(index);
  }
})