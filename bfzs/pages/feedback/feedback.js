// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"使用问题",
        isActive:true
      },
      {
        id:1,
        value:"商家投诉",
        isActive:false
      }
    ],
    // 被选中的图片路径数组
    chooseImg:[],
    // 文本域内容
    textValue:""
  },
  // 图片的外网链接数组
  UploadImg:[],
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
  },
  // 点击“+” 上传图片
  handleChooseImg(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (result)=>{
        // console.log(result);
        this.setData({
            chooseImg:[...this.data.chooseImg,...result.tempFilePaths]
        })
      }
    });
  },
  // 点击删除图片
  handleClear(e){
    const {index} = e.currentTarget.dataset;
    // console.log(e);
    let {chooseImg} = this.data;
    chooseImg.splice(index,1);
    this.setData({
      chooseImg
    })
  },
  // 文本域内容
  handleTextInput(e){
    this.setData({
      textValue:e.detail.value
    })
  },
  // 点击提交按钮
  handleSubmit(){
    // 获取文本域内容 ，图片数组
    const {textValue,chooseImg} = this.data;
    // 判断合法性
    if(!textValue.trim()){
      // 不合法
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true
      });
      return;
    }
    // 准备上传图片到专门的图片服务器
    // 上传文件的api 不支持多个文件同时上传 需要遍历数组，挨个上传
    chooseImg.forEach((v,i)=>{
        wx.uploadFile({
      // 上传的路径
        url: 'http://127.0.0.1:4000',
      // 被上传的文件的路径
        filePath: v,
      // 上传的文件的名称 file
        name: "avatar",
        // 顺带的文本信息
        formData: {},
        success: (result)=>{
          console.log(result);
        }
      })
    })
    
  }
})