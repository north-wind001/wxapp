import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:"",
    goods:[],
    isFocus:false
  },
  // 全局定时器
  TimeId:-1,
  // 输入搜索
  handleInput(e){
    // 获取输入框的值
    const {value} = e.detail;
    // 检测值的合法性
    if(!value.trim()){
      this.setData({
        goods:[],
        isFocus:false
      })
      // 不合法
      return;
    }
    this.setData({
      isFocus:true
    })
    // 清除计时器
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(()=>{
      // 发送请求
      this.qsearch(value);
    },1500)
  },
  // 请求函数
  async qsearch(query){
    const res = await request({url:"/goods/qsearch",data:{query}});
    // console.log(res);
    this.setData({
      goods:res
    })
  },
  // 点击 取消 按钮
  handleQuxiao(){
    this.setData({
      inputValue:"",
      goods:[],
      isFocus:false
    })
  }
})