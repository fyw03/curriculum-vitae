import {DBPost} from'../../../db/DBPost.js';

// pages/post/post-comment/post-comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //控制使用键盘还是发送语音
      useKeyboardFlag:true,
    //控制input组件的初始值
    keyboardInputValue:'',
    //控制是否显示图片选择面板
    sendMoreMsgFlag:false,
    //保存已选择的图片
    chooseFiles:[],
    //被删除的图片序号
    deleteIndex:-1,
    //保存当前正播放语音的URL
    currentAudio:''
  },

    //录音暂停
    playAudio:function(event){
      var url=event.currentTarget.dataset.url,
      that=this;
      //暂停当前录音
      if(url==this.data.currentAudio){
        wx.pauseVoice();
        this.data.currentAudio=''
      }
      //播放录音
      else{
        this.data.currentAudio=url;
        wx.playVoice({
          filePath: 'url',
          complete:function(){
            //只有当录音播放完毕之后才会执行
            that.data.currentAudio='';
          }
        })
      }
    },

  //开始录音
  recordStart:function(){
    var that=this;
    this.setData({
      recodingClass:'recoding'
    })
    //记录录音开始时间
    this.startTime=new Date();
    wx.startRecord({
      success:function(res){
        //计算录音时长
        var diff=(that.endTime-that.startTime)/1000;
        diff=Math.ceil(diff);
        //发送录音
        that.submitVoiceComment({ url:res.tempFilePath,timeLen:diff  })
      },
      fail:function(res){
        console.log(res);
      },
      complete:function(res){
        console.log(res);
      }
    })
  },

  //结束录音
  recordEnd:function(){
    this.setData({
      recodingClass:''
    });
    this.endTime=new Date();
    wx.stopRecord();
  },

  //选择本地照片与拍照
  chooseImage:function(event){
    //已选择照片数组
    var imgArr=this.data.chooseFiles;
    //只能上传3张照片，包括拍照
    var leftCount=3-imgArr.length;
    if(leftCount<=0){
      return;
    }
    var sourceType =[event.currentTarget.dataset.category],
      that=this;
    wx.chooseImage({
      count:leftCount,
      sourceType:sourceType,
      success:function(res){
        //可以分次选择图片，但总数不能超过3张
        that.setData({
          chooseFiles:imgArr.concat(res.tempFilePaths)
        });
      }
    })
  },
  //删除已经选择的照片
  deleteImage:function(event){
      var index=event.currentTarget.dataset.idx,
        that=this;
      that.setData({
       deleteIndex:index
      })
      that.data.chooseFiles.splice(index,1);
      setTimeout(function(){
          that.setData({
            deleteIndex:-1,
            chooseFiles:that.data.chooseFiles
          })
      },500)
  },

  //显示选择照片、拍照等按钮
  sendMoreMsg:function(){
    this.setData({
      sendMoreMsgFlag:!this.data.sendMoreMsgFlag
    })
  },

  //切换语音和键盘输入
  switchInputType:function(event){
      this.setData({
        useKeyboardFlag:!this.data.useKeyboardFlag
      })
  },
  //获取用户输入
  bindCommentInput:function(event){
    var val=event.detail.value;
    console.log(val);
    this.data.keyboardInputValue=val;
  },
  
  //提交录音
  submitVoiceComment:function(audio){
    
    var newData={
      username:'傅钰文',
      avatar:'https://img1.baidu.com/it/u=4081570746,311001242&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
      //评论时间
      create_time:new Date().getTime(),
      //评论内容
      content:{
        txt:'',
        img:[],
        audio:audio
      }
    };
     //保存新评论到缓存数据库中
     this.dbPost.newComment(newData);
     //显示操作结果
     this.showCommitSuccessToast();
      //重新渲染并绑定所有评论
      this.bindCommentData();
  },
  
  //提交用户评论
    submitComment:function(event){
     var imgs=this.data.chooseFiles;
      var newData={
        username:'傅钰文',
        avatar:'https://img1.baidu.com/it/u=4081570746,311001242&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
        //评论时间
        create_time:new Date().getTime(),
        //评论内容
        content:{
          txt:this.data.keyboardInputValue,
          img:imgs
        }
      };
      console.log(newData);
      if(!newData.content.txt&&imgs.length===0){
        //如果没有评论内容，就不执行任何操作
        return;
      }
      //保存新评论到缓存数据库中
      this.dbPost.newComment(newData);
      //显示操作结果
      this.showCommitSuccessToast();
      //重新渲染并绑定所有评论
      this.bindCommentData();
      //恢复初始状态
      this.resetAllDefaultStatus();
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var postId=options.id;
    this.dbPost=new DBPost(postId);
    var comments=this.dbPost.getCommentData();

    //绑定评论数据
    this.setData({
      comments:comments
    })
  },
  //评论成功
  showCommitSuccessToast:function(){
    //显示操作结果
    wx.showToast({
      title:"评论成功",
      duration:1000,
      icon:"success"
    })
  },
  //
  bindCommentData:function(){
    var comments=this.dbPost.getCommentData();
    //绑定评论数据
    this.setData({
      comments:comments
    });
  },
  //将所有有关的按钮状态、输入转态都恢复到初始化状态
  resetAllDefaultStatus:function(){
    //清空评论框
    this.setData({
      keyboardInputValue:'',
      chooseFiles:[],
      sendMoreMsgFlag:false
    })
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