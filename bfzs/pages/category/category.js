// pages/category/category.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单数据
    leftMenuList:[],
    //右侧的商品数据
    rightContent:[],
    //当前选中的菜单
    currentIndex:0,
    //
    rightTop:0
  },
  //接口数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //缓存技术
    //获取本体存储中数据
    const Cates = wx.getStorageSync("cates");
    //判断
    if(!Cates){
      this.getCates();
    }else{
      //有旧数据  但过期
      if(Date.now()-Cates.time>1000*10){
        this.getCates();
      }else{
        //可以使用的旧数据
        this.Cates = Cates.data;
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        let rightContent=this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
      
  },
  async getCates(){
    // request({
    //   url:"/categories"
    // })
    // .then(res=>{
    //   // console.log(res)
    //   this.Cates=res.data.message;

    //   //
    //   wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
        

    //   //构建左侧菜单数据
    //   let leftMenuList=this.Cates.map(v=>v.cat_name);
    //   //构建右侧
    //   let rightContent=this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })

    // })
    const res=await request({url:"/categories"});
      this.Cates=res;

      //存入
      wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
        

      //构建左侧菜单数据
      let leftMenuList=this.Cates.map(v=>v.cat_name);
      //构建右侧
      let rightContent=this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
  },

  handleItemTap(e){
    // console.log(e)
    const {index}=e.currentTarget.dataset;
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      rightTop:0
    })
    
  }
})