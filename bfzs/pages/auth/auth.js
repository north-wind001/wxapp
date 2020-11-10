import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from "../../utils/asyncWx.js";
Page({
  //获取用户信息
  async handleGetUserInfo(e){
    try {
      const {encryptedData,rawData,iv,signature} = e.detail;
    const {code} = await login();
    const loginParams = {encryptedData,rawData,iv,signature,code};
    // console.log(code);
    //发送请求，获取用户token
    const res = await request({url:"/users/wxlogin",data:loginParams,method:"post"})
    // token存入缓存(虚假)
    const token = iv;
    wx.setStorageSync("token", token);
    //跳转回上一页
    wx.navigateBack({
      delta: 1
    });
    } catch (error) {
      console.log(error);
    }
  }
})