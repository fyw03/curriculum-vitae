const { DBPost } = require("../../../db/DBPost");

// pages/post/poat-detail/post-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //阅读量+1
  addReadingTimes:function(){
      this.dbPost.addReadingTimes();
  },
  //收藏
  onCollectionTap:function(event){
    var newData=this.dbPost.collect();
    //重新绑定数据 不可以将整个newData全部作为setData的参数
    //应当选择性更新部分数据
    this.setData({
      'post.collectionStatus':newData.collectionStatus,
      'post.collectionNum':newData.collectionNum
    })

    wx.showToast({
      title: newData.collectionStatus?"收藏成功":"取消成功",
      duration:1000,
      icon:"success",
      mask:true
    })
  },

//点赞
  onUpTap:function(event){
    var newData=this.dbPost.up();

    this.setData({
      'post.upStatus':newData.upStatus,
      'post.upNum':newData.upNum
    }),


    this.animationUp.scale(10).step();
    this.setData({
      animationUp:this.animationUp.export()
    })
    setTimeout(function(){
      this.animationUp.scale(1).step();
      this.setData({
        animationUp:this.animationUp.export()
      })
    }.bind(this),220);
  },
  
  //评论
  onCommentTap:function(event){
    var id=event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: '../post-comment/post-comment?id='+id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      var postId=options.id;
      this.dbPost=new DBPost(postId);
      this.postData=this.dbPost.getPostItemById().data;
      this.setData({
          post:this.postData
      })
      this.setAniation();
      this.addReadingTimes();
  },

  //自定义点赞动画
  setAniation:function(){
      var animationUp=wx.createAnimation({
        timingFunction:"ease-in-out"
      })
      this.animationUp=animationUp
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: this.postData.title,
    })
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