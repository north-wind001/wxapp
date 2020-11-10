// pages/goods_list/goods_list.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList:[ ]
  },
  //
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  //总页数
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.QueryParams.cid=options.cid;
    this.getGoodsList();
  },

  async getGoodsList(){
    const res=await request({url:"/goods/search",data:this.QueryParams});
    const total=res.total;
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
    this.setData({
      //拼接数组
      goodsList:[...this.data.goodsList,...res.goods]
    })
    wx.stopPullDownRefresh(); 
  },
  handleItemChange(e){
    // console.log(e);
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i) =>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  //滚动条触底
  onReachBottom(){
    //没有下一页数据
    if(this.QueryParams.pagenum>=this.totalPages){
      // console.log("到底了！！")
      wx.showToast({
        title: '到底啦!'
      })
    }else{
      //有下一页数据
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  //下拉事件
  onPullDownRefresh(){
    // console.log("sxl")
    //重置数组
    this.setData({
      goodsList:[]
    })
    //重置页码
    this.QueryParams.pagenum=1;
    //发送请求
    this.getGoodsList();
    // wx.stopPullDownRefresh(); 
    // wx.showToast({
    //   title: '刷新成功!'
    // })
  }
})