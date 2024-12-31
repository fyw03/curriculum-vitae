Page({
  data: {
    resumeData: null
  },

  onLoad() {
    const resumeData = wx.getStorageSync('resumeData');
    this.setData({ resumeData });
  }
}); 