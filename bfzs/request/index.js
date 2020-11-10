let reTime=0;

export const request=(params)=>{
    //请求次数
    reTime++;
    wx.showLoading({
        title: "加载中",
        mask: true
    });
      
    const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success:(result)=>{
                resolve(result.data.message);
            },
            fail:(err)=>{
                reject(err);
            },
            complete: function() {
                reTime--;
                if(reTime===0){
                    wx.hideLoading();
                }
            }
          });
    })
}