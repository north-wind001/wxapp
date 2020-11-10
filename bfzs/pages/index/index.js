//导入用于发送请求的方法，路径要全
import { request } from "../../request/index.js";
//Page Object
Page({
  data: {
    //轮播图数组
    swiperList:[],
    //导航数组
    catesList:[],
    //楼层数据
    floorList:[]
  },
  //options(Object)
  onLoad: function(options) {
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },
  getSwiperList(){
    //发送异步请求获取轮播图数据
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     // console.log(result)
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // });
    request({url:"/home/swiperdata"})
    .then(result=>{
        this.setData({
        swiperList:result
      })
    })
  },
  getCatesList(){
    request({url:"/home/catitems"})
    .then(result=>{
        this.setData({
        catesList:result
      })
    })
  },
  getFloorList(){
    request({url:"/home/floordata"})
    .then(result=>{
        this.setData({
        floorList:result
      })
    })
  }
});
  