// pages/goodsdetail/goodsdetail.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:[],
    isCollect:false
  },
  goods_info:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length-1];
    let options = currentPage.options;
    const {goods_id}=options;
    this.getGoodsDetail(goods_id);

    
  },
  async getGoodsDetail(goods_id){
    const res=await request({url:"/goods/detail",data:{goods_id}});
    this.goods_info=res;
    // 获取缓存中的收藏数组
    let collect = wx.getStorageSync("collect")||[];
    // 判断当前商品是否已被收藏
    let isCollect = collect.some(v=>v.goods_id===this.goods_info.goods_id); 
    this.setData({
      goodsObj:{
        goods_name:res.goods_name,
        goods_price:res.goods_price,
        //针对 iphone机型不支持 webp 格式的图片
        //1. 要求后台更换
        //2. 临时方案：替换富文本中的 webp 为 jpg。。。
        goods_introduce:res.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:res.pics
      },
      isCollect
    })
  },
  //点击预览轮播图
  handlePreviewImage(e){
    const urls=this.goods_info.pics.map(v=>v.pics_mid);
    const current=e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
      
  },
  // 点击切换收藏
  handleCollectChange(){
    let isCollect = false;
    // 获取缓存中的收藏数组
    let collect = wx.getStorageSync("collect")||[];
    // 判断当前商品是否已被收藏
    let index = collect.findIndex(v=>v.goods_id===this.goods_info.goods_id);

    if(index!==-1){
      // 已被收藏，从数组中删除
      collect.splice(index,1);
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
    }else{
      // 没被收藏
      collect.push(this.goods_info);
      isCollect = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }

    // 存入缓存
    wx.setStorageSync("collect",collect);
    this.setData({
      isCollect
    })
  },
  //加入购物车
  handleCartAdd(){
    //获取缓存中的购物车数组
    let cart=wx.getStorageSync("cart")||[];
    //判断 商品对象是否已存在于购物车数组中
    let index =cart.findIndex(v=>v.goods_id===this.goods_info.goods_id);
    if(index===-1){
      //不存在
      this.goods_info.num=1;
      this.goods_info.checked=true;
      cart.push(this.goods_info);
    }else{
      //存在
      cart[index].num++;
    }
    //
    wx.setStorageSync("cart", cart);
    //
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      //true时，1.5秒后才可点击页面
      mask: true
    });
  }
})