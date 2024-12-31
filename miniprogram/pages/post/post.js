// pages/post/post.js
var dataObj =require("../../data/data.js")
import{DBPost}from'../../db/DBPost';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var dbPost=new DBPost();
    this.setData({
      postList:dbPost.getAllPostData()
    });
  },

  onTapToDetail(event){
    var postId=event.currentTarget.dataset.postId;
    console.log(postId);
    wx.navigateTo({
      url: 'poat-detail/post-detail?id='+postId,
    })
    console.log(url);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})