const iconList = [
  '/images/index/age.png',
  '/images/index/phone.png',
  '/images/index/email.png',
  '/images/index/graduation-cap.png',
  '/images/index/school.png',
  '/images/index/target.png',
  '/images/index/briefcase.png',
  '/images/index/project.png',
  '/images/index/honor.png',
  '/images/index/skill.png',
  '/images/index/resa.png'
];

Page({
  data: {
    currentTab: 0,
    resumeData: {
      basicInfo: {
        name: '',
        age: '',
        phone: '',
        email: '',
        education: '',
        school: ''
      },
      jobIntention: {
        salary: '',
        position: '',
        location: ''
      },
      workExperience: [],
      projectExperience: [],
      honors: [],
      skills: '',
      selfEvaluation: ''
    },
    videoInfo: null,
    loading: true,
    error: null,
    isPlaying: false,
    audioContext: null,
    bgMusic: {
      src: '',
      isPlaying: false
    }
  },

  onLoad() {
    this.preloadIcons();
    this.loadData();
    this.initBgMusic();
  },

  onShow() {
    const resumeData = wx.getStorageSync('resumeData');
    if (resumeData) {
      this.setData({ resumeData });
    }
    // 检查媒体更新
    this.checkAndUpdateMedia();
  },

  async loadData() {
    try {
      this.setData({ loading: true, error: null });
      this.loadResumeData();
      if (this.data.currentTab === 1) {
        await this.loadVideoInfo();
      }
    } catch (error) {
      console.error('加载数据失败:', error);
      this.setData({ error: '数据加载失败，请重试' });
    } finally {
      this.setData({ loading: false });
    }
  },

  loadResumeData() {
    try {
      const resumeData = wx.getStorageSync('resumeData');
      if (resumeData) {
        this.setData({ resumeData });
      }
    } catch (error) {
      console.error('加载简历数据失败:', error);
    }
  },

  // 加载视频信息
  async loadVideoInfo() {
    try {
      const videoInfo = wx.getStorageSync('videoInfo');
      console.log('获取的视频信息:', videoInfo);
      
      if (videoInfo && videoInfo.src) {
        this.setData({ videoInfo });
        console.log('设置视频信息成功:', this.data.videoInfo);
      }
    } catch (error) {
      console.error('加载视频失败:', error);
      this.setData({ videoInfo: null });
    }
  },

  // 初始化背景音乐
  initBgMusic() {
    try {
      const musicInfo = wx.getStorageSync('bgMusic');
      if (musicInfo && musicInfo.src) {
        // 检查文件是否存在
        const fs = wx.getFileSystemManager();
        fs.accessSync(musicInfo.src);
        
        // 初始化音频上下文
        const audioContext = wx.createInnerAudioContext();
        audioContext.src = musicInfo.src;
        audioContext.loop = true;

        // 获取之前的播放状态
        const wasPlaying = this.data.isPlaying;

        // 监听播放状态
        audioContext.onPlay(() => {
          this.setData({ 
            isPlaying: true,
            'bgMusic.isPlaying': true 
          });
        });

        audioContext.onPause(() => {
          this.setData({ 
            isPlaying: false,
            'bgMusic.isPlaying': false 
          });
        });

        audioContext.onError((res) => {
          console.error('背景音乐播放错误:', res);
          wx.showToast({
            title: '音乐播放失败',
            icon: 'none'
          });
          this.setData({ isPlaying: false });
        });

        this.setData({
          audioContext,
          bgMusic: musicInfo
        });

        // 如果之前在播放，则继续播放
        if (wasPlaying) {
          audioContext.play();
        }
      }
    } catch (error) {
      console.error('背景音乐文件不存���:', error);
      wx.removeStorageSync('bgMusic');
    }
  },

  preloadIcons() {
    iconList.forEach(iconPath => {
      wx.getImageInfo({
        src: iconPath
      });
    });
  },

  async switchTab(e) {
    const tab = parseInt(e.currentTarget.dataset.tab);
    this.setData({ currentTab: tab });
    
    // 切换到视频标签页时加载视频
    if (tab === 1) {
      await this.loadVideoInfo();
    }
  },

  onVideoPlay() {
    console.log('视频开始播放');
  },

  onVideoPause() {
    console.log('视频暂停');
  },

  onVideoEnd() {
    console.log('视频播放结束');
  },

  onVideoError(e) {
    console.error('视频播放错误:', e.detail);
    wx.showToast({
      title: '视频加载失败',
      icon: 'none'
    });
  },

  onVideoLoad(e) {
    console.log('视频加载成功，元数据:', e.detail);
  },

  goToDetail(e) {
    const index = e.currentTarget.dataset.index; // 获取当前项的索引
    wx.navigateTo({
      url: `/pages/detail/index?index=${index}` // 传递索引或其他参数
    });
  },

  toggleMusic() {
    const { isPlaying, audioContext } = this.data;
    
    try {
      if (isPlaying) {
        audioContext.pause();
      } else {
        audioContext.play();
      }
    } catch (error) {
      console.error('背景音乐控制��误:', error);
      wx.showToast({
        title: '播放出错，请重试',
        icon: 'none'
      });
      this.setData({ isPlaying: false });
    }
  },

  onHide() {
    // 页面隐藏时暂停播放
    const { audioContext, isPlaying } = this.data;
    if (audioContext && isPlaying) {
      audioContext.pause();
      this.setData({ isPlaying: false });
    }
  },

  onUnload() {
    // 页面卸载时停止并销毁音频
    const { audioContext } = this.data;
    if (audioContext) {
      audioContext.stop();
      audioContext.destroy();
    }
  },

  // 选择并保存背景音乐
  chooseAndUploadBgMusic() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['mp3', 'wav'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].path;
        const fileSize = res.tempFiles[0].size;
        
        if (fileSize > 10 * 1024 * 1024) {
          wx.showToast({
            title: '音乐文件过大，请选择10MB以内的文件',
            icon: 'none'
          });
          return;
        }

        const musicInfo = {
          src: tempFilePath,
          title: res.tempFiles[0].name,
          isPlaying: false
        };

        try {
          wx.setStorageSync('bgMusic', musicInfo);
          // 重新初始化音频播放器
          if (this.data.audioContext) {
            this.data.audioContext.destroy();
          }
          this.initBgMusic();
          wx.showToast({
            title: '背景音乐已更新',
            icon: 'success'
          });
        } catch (error) {
          console.error('保存音乐失败:', error);
          wx.showToast({
            title: '保存失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('选择音乐失败:', err);
        wx.showToast({
          title: '选择音乐失败',
          icon: 'none'
        });
      }
    });
  },

  // 检查并更新媒体文件（音乐和视频）
  checkAndUpdateMedia() {
    try {
      // 检查背景音乐
      const musicInfo = wx.getStorageSync('bgMusic');
      if (musicInfo && musicInfo.src !== this.data.bgMusic.src) {
        if (this.data.audioContext) {
          this.data.audioContext.destroy();
        }
        this.initBgMusic();
      }

      // 检查视频
      const videoInfo = wx.getStorageSync('videoInfo');
      if (videoInfo && videoInfo.src) {
        // 只在视频发生变化时更新
        if (!this.data.videoInfo || this.data.videoInfo.src !== videoInfo.src) {
          this.setData({ videoInfo });
          console.log('视频已更新:', videoInfo);
        }
      } else if (this.data.videoInfo) {
        this.setData({ videoInfo: null });
      }
    } catch (error) {
      console.error('检查媒体更新失败:', error);
    }
  }
}); 