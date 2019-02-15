//index.js
//获取应用实例
let QR = require("../../utils/qrcode.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
   placeholder:'https://www.baidu.com'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let size = this.setCanvasSize();
    let url = this.data.placeholder
    this.createQRcode(url,'mycanvas',size.w,size.h)
  },
  createQRcode(url,canvasId,canvasWidth,canvasHeight){
    QR.qrApi.draw(url,canvasId,canvasWidth,canvasHeight)
  },
  setCanvasSize(){
    let size = {}
    let res = wx.getSystemInfoSync()
    let scale = 686 / 750
    let width = res.windowWidth * scale
    let height = width
    size.w = width
    size.h = height
    return size
  },
  formSubmit(e){
    let url = this.data.placeholder
    console.log(url)
    wx.showToast({
      title: '生成中，不急',
      icon:'loading',
      duration:2000
    })
    let that = this
    let timer = setTimeout(()=>{
      let size = that.setCanvasSize();
      // let url = that.data.placeholder
      that.createQRcode(url, 'mycanvas', size.w, size.h)
      wx.hideToast()
      clearTimeout(timer)
    },2000)
  },
  inputeidt(e){ // 此方法用来实现双向数据绑定
    let inputData = e.detail.value
    this.setData({
      placeholder: inputData
    })
  }
})
