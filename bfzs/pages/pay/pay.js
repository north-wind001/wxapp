import { getSetting,chooseAddress,openSetting,showModal,showToast } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0,
    checkedCart:[]
  },
  onShow(){
    const address=wx.getStorageSync("address");
    const cart=wx.getStorageSync("cart")||[];
    //只结算checked 为true 的商品
    const checkedCart = cart.filter(v=>v.checked);
    let totalPrice = 0;
    let totalNum = 0;
    checkedCart.forEach(v=>{
      totalPrice += v.goods_price * v.num;
      totalNum += v.num;
    })
    this.setData({
      cart,
      address,
      totalPrice,
      totalNum,
      checkedCart
    })
    wx.setStorageSync("checkedCart", checkedCart);
  },
  handlePay(){
    const token = wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/auth'
      });
      return;
    }
    // console.log("success ");
    // 
    wx.showToast({
      title: '支付成功',
      icon: 'none',
      mask: false
    });
    let newCart=wx.getStorageSync("cart");
    let payed = wx.getStorageSync("payed")||[];
    payed.push(...this.data.checkedCart);
    wx.setStorageSync("payed", payed);
    newCart=newCart.filter(v=>!v.checked);
    wx.setStorageSync("cart", newCart);
    wx.redirectTo({
      url: '/pages/order/order'
    });
  }

})