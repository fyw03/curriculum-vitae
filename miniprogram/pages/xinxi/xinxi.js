// pages/xinxi/xinxi.js
//在这里添加你申请的极速数据api
const JISUAPI_KEY = '';


Page({
  data: {
    newsList: [],
    loading: false,
    error: null,
    refresherEnabled: true,
    triggered: false
  },

  onLoad() {
    this.fetchNews();
  },

  // 获取新闻数据
  fetchNews() {
    this.setData({ loading: true, error: null });

    wx.request({
      url: 'https://api.jisuapi.com/news/get',
      data: {
        channel: '头条',
        start: 0,
        num: 30,
        appkey: JISUAPI_KEY
      },
      success: (res) => {
        if (res.data.status === 0) {
          const news = res.data.result.list || [];
          this.setData({
            newsList: news.map(item => ({
              ...item,
              time: this.formatTime(item.time)
            }))
          });
        } else {
          this.setData({
            error: '获取新闻失败，请下拉刷新重试'
          });
        }
      },
      fail: () => {
        this.setData({
          error: '网络连接失败，请检查网络设置'
        });
      },
      complete: () => {
        this.setData({ 
          loading: false,
          triggered: false
        });
        wx.stopPullDownRefresh();
      }
    });
  },

  // 格式化时间
  formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diff = now - date;
    
    // 小于1小时显示"xx分钟前"
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes}分钟前`;
    }
    // 小于24小时显示"xx小时前"
    else if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `${hours}小时前`;
    }
    // 其他显示具体日期时间
    else {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours().toString().padStart(2, '0');
      const minute = date.getMinutes().toString().padStart(2, '0');
      return `${month}月${day}日 ${hour}:${minute}`;
    }
  },

  // 查看新闻详情
  viewDetail(e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: `/pages/web-view/index?url=${encodeURIComponent(url)}`
    });
  },

  // 下拉刷新开始
  onRefresherPulling(e) {
    this.setData({
      triggered: true
    });
  },

  // 下拉刷新触发
  onRefresherRefresh(e) {
    this.fetchNews();
  },

  // 下拉刷新复位
  onRefresherRestore(e) {
    this.setData({
      triggered: false
    });
  },

  // 滚动到顶部/底部触发
  onScrollToUpper(e) {
    // 防止顶部回弹
    return false;
  },

  onScrollToLower(e) {
    // 防止底部回弹
    return false;
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '今日头条新闻',
      path: '/pages/xinxi/xinxi'
    };
  }
});