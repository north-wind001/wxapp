import { getSetting,chooseAddress,openSetting,showModal,showToast } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    const address=wx.getStorageSync("address");
    const cart=wx.getStorageSync("cart")||[];
    //every 数组函数
    // const allChecked = cart.length?cart.every(v=>v.checked):false;
    this.setData({
      address
    })
    this.setCart(cart);
  },
  //获取收货地址
  async handleChooseAddress(){
    //获取权限状态
    wx.getSetting({
      success: (result)=>{
        //发现一些属性名怪异的时候，要使用[]形式来获取属性
        const scopeAddress =result.authSetting["scope.address"];
        if(scopeAddress===true||scopeAddress===undefined){
          //内置api获取地址
          wx.chooseAddress({
            success: (result1)=>{
              
            }
          });
        }else{
          //用户拒绝过授予权限 诱导用户打开授权
          wx.openSetting({
            success: (result2)=>{
              wx.chooseAddress({
                success: (result3)=>{
                  
                }
              });
            },
            fail: ()=>{},
            complete: ()=>{}
          });
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
    try {
      const res1=await getSetting();
      const scopeAddress=res1.authSetting["scope.address"];
      if(scopeAddress === false){
        await openSetting();
      }
      let address=await chooseAddress();
      address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo;
      //存入缓存
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error);
    }
  },

  handleItemChange(e){
    //获取商品id
    const goods_id=e.currentTarget.dataset.id;
    //获取购物车数组
    let {cart}=this.data;
    //获取索引
    let index=cart.findIndex(v=>v.goods_id===goods_id);
    //修改选中效果
    cart[index].checked=!cart[index].checked;

    this.setCart(cart);
  },
  //计算数据
  setCart(cart){
    let allChecked=true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice += v.goods_price * v.num;
        totalNum += v.num;
      }else{
        allChecked=false;
      }
    })
    allChecked=cart.length!=0?allChecked:false;
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart", cart);
  },
  //全选
  handleItemAllCheck(){
    let {cart,allChecked}=this.data;
    allChecked=!allChecked;
    cart.forEach(v=>v.checked=allChecked);
    this.setCart(cart);
  },
  //减少数量
  // handleItemDown(e){
  //   const goods_id=e.currentTarget.dataset.id;
  //   let {cart}=this.data;
  //   let index=cart.findIndex(v=>v.goods_id===goods_id);
  //   cart[index].num--;
  //   this.setCart(cart);
  // },
// 修改数量
  async handleItemEdit(e){
    const {id,op}=e.currentTarget.dataset;
    let {cart}=this.data;
    let index=cart.findIndex(v=>v.goods_id===id);
    //判断删除
    if(cart[index].num===1 &&op===-1){
      const res = await showModal({content:"是否删除该商品?"});
      if(res.confirm){
        cart.splice(index,1);
        this.setCart(cart);
      }
    }else{
      cart[index].num+=op;
      this.setCart(cart);
    }
  },
  //点击结算
  async handlePay(){
    const {address,totalNum}=this.data;
    if(totalNum===0){
      await showToast({title:"您未选购商品"});
      return;
    }
    if(!address.userName){
      await showToast({title:"您未添加收货地址"});
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/pay'
    });
  }
})