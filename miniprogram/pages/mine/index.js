Page({
  data: {
    currentTab: 0,
    formData: {
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
    bgMusic: null
  },

  onLoad() {
    this.initDefaultData();
    this.loadFormData();
    this.loadBgMusic();
    this.loadVideoInfo();
  },

  // 切换标签页
  switchTab(e) {
    const tab = parseInt(e.currentTarget.dataset.tab);
    this.setData({ currentTab: tab });
  },

  // 初始化默认数据
  initDefaultData() {
    try {
      const resumeData = wx.getStorageSync('resumeData');
      if (!resumeData) {
        // 如果没有数据，创建默认数据
        const defaultData = {
          basicInfo: {
            name: '傅钰文',
            age: '18',
            phone: '17637285209',
            email: '2044126442@qq.com',
            education: '本科',
            school: '新乡学院'
          },
          jobIntention: {
            salary: '9k',
            position: '软件开发工程师',
            location: '新乡'
          },
          workExperience: [
            {
              startTime: '2023-01',
              endTime: '2023-12',
              company: '某某科技有限公司',
              position: '前端开发工程师',
              description: '负责公司主要产品的前端开发工作'
            }
          ],
          projectExperience: [
            {
              name: '企业官网重构项目',
              role: '前端开发负责人',
              time: '2023-06 至 2023-09',
              description: '使用Vue3重构公司官网，提升了网站性能和用户体验'
            }
          ],
          honors: [
            {
              time: '2023-05',
              name: '优秀员工',
              description: '因工作表现突出被评为季度优秀员工'
            },
            {
              time: '2023-05',
              name: '三好学生',
              description: '因学习表现突出被评为三好学生'
            }
          ],
          skills: '熟练掌握HTML、CSS、JavaScript等前端技术，拥有较强的编程能力',
          selfEvaluation: '工作认真负责，有较强的学习能力和团队协作精神'
        };

        // 保存默认数据
        wx.setStorageSync('resumeData', defaultData);
        this.setData({ formData: defaultData });
      }
    } catch (error) {
      console.error('初始化默认数据失败:', error);
    }
  },

  // 加载表单数据
  loadFormData() {
    try {
      const resumeData = wx.getStorageSync('resumeData');
      if (resumeData) {
        this.setData({
          formData: resumeData
        });
      }
    } catch (error) {
      console.error('加载简历数据失败:', error);
      wx.showToast({
        title: '加载数据失败',
        icon: 'none'
      });
    }
  },

  // 加载背景音乐信息
  loadBgMusic() {
    try {
      const bgMusic = wx.getStorageSync('bgMusic');
      if (bgMusic) {
        this.setData({ bgMusic });
      }
    } catch (error) {
      console.error('加载背景音乐失败:', error);
    }
  },

  // 加载视频信息
  loadVideoInfo() {
    try {
      const videoInfo = wx.getStorageSync('videoInfo');
      if (videoInfo) {
        this.setData({ videoInfo });
      }
    } catch (error) {
      console.error('加载视频信息失败:', error);
    }
  },

  // 保存表单数据
  submitForm(e) {
    try {
      const formValues = e.detail.value;
      // 构建完整的表单数据
      const formData = {
        basicInfo: {
          name: formValues['basicInfo.name'],
          age: formValues['basicInfo.age'],
          phone: formValues['basicInfo.phone'],
          email: formValues['basicInfo.email'],
          education: formValues['basicInfo.education'],
          school: formValues['basicInfo.school']
        },
        jobIntention: {
          salary: formValues['jobIntention.salary'],
          position: formValues['jobIntention.position'],
          location: formValues['jobIntention.location']
        },
        // 保持数组数据不变
        workExperience: this.data.formData.workExperience.map((item, index) => ({
          startTime: formValues[`workExperience[${index}].startTime`],
          endTime: formValues[`workExperience[${index}].endTime`],
          company: formValues[`workExperience[${index}].company`],
          position: formValues[`workExperience[${index}].position`],
          description: formValues[`workExperience[${index}].description`]
        })),
        projectExperience: this.data.formData.projectExperience.map((item, index) => ({
          name: formValues[`projectExperience[${index}].name`],
          role: formValues[`projectExperience[${index}].role`],
          time: formValues[`projectExperience[${index}].time`],
          description: formValues[`projectExperience[${index}].description`]
        })),
        honors: this.data.formData.honors.map((item, index) => ({
          time: formValues[`honors[${index}].time`],
          name: formValues[`honors[${index}].name`],
          description: formValues[`honors[${index}].description`]
        })),
        skills: formValues.skills,
        selfEvaluation: formValues.selfEvaluation
      };

      // 保存到本地存储
      wx.setStorageSync('resumeData', formData);
      
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      });

      // 更新当前页面数据
      this.setData({ formData });

      // 返回并刷新上一页
      setTimeout(() => {
        const pages = getCurrentPages();
        const prevPage = pages[pages.length - 2];
        if (prevPage) {
          // 更新简历页面的数据
          prevPage.setData({
            resumeData: formData
          });
          wx.navigateBack();
        }
      }, 1500);
    } catch (error) {
      console.error('保存数据失败:', error);
      wx.showToast({
        title: '保存失败',
        icon: 'none'
      });
    }
  },

  // 添加工作经历
  addWork() {
    const workExperience = this.data.formData.workExperience || [];
    workExperience.push({
      startTime: '',
      endTime: '',
      company: '',
      position: '',
      description: ''
    });
    this.setData({
      'formData.workExperience': workExperience
    });
  },

  // 删除工作经历
  deleteWork(e) {
    const index = e.currentTarget.dataset.index;
    const workExperience = this.data.formData.workExperience;
    workExperience.splice(index, 1);
    this.setData({
      'formData.workExperience': workExperience
    });
  },

  // 添加项目经验
  addProject() {
    const projectExperience = this.data.formData.projectExperience || [];
    projectExperience.push({
      name: '',
      role: '',
      time: '',
      description: ''
    });
    this.setData({
      'formData.projectExperience': projectExperience
    });
  },

  // 删除项目经验
  deleteProject(e) {
    const index = e.currentTarget.dataset.index;
    const projectExperience = this.data.formData.projectExperience;
    projectExperience.splice(index, 1);
    this.setData({
      'formData.projectExperience': projectExperience
    });
  },

  // 添加荣誉
  addHonor() {
    const honors = this.data.formData.honors || [];
    honors.push({
      time: '',
      name: '',
      description: ''
    });
    this.setData({
      'formData.honors': honors
    });
  },

  // 删除荣誉
  deleteHonor(e) {
    const index = e.currentTarget.dataset.index;
    const honors = this.data.formData.honors;
    honors.splice(index, 1);
    this.setData({
      'formData.honors': honors
    });
  },

  // 选择视频
  chooseVideo() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['video'],
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        const videoInfo = {
          src: tempFilePath,
          title: '自我介绍'
        };
        
        try {
          wx.setStorageSync('videoInfo', videoInfo);
          this.setData({ videoInfo });
          wx.showToast({
            title: '上传成功',
            icon: 'success'
          });
        } catch (error) {
          console.error('保存视频失败:', error);
          wx.showToast({
            title: '上传失败',
            icon: 'none'
          });
        }
      }
    });
  },

  // 视频选择回调
  onChooseVideo(e) {
    const tempFilePath = e.detail.tempFilePath;
    if (tempFilePath) {
      const videoInfo = {
        src: tempFilePath,
        title: '自我介绍'
      };
      
      try {
        wx.setStorageSync('videoInfo', videoInfo);
        this.setData({ videoInfo });
        wx.showToast({
          title: '视频已更新',
          icon: 'success'
        });
      } catch (error) {
        console.error('保存视频失败:', error);
        wx.showToast({
          title: '更新失败',
          icon: 'none'
        });
      }
    }
  },

  // 删除视频
  clearVideo() {
    try {
      wx.removeStorageSync('videoInfo');
      this.setData({ videoInfo: null });
      wx.showToast({
        title: '视频已删除',
        icon: 'success'
      });
    } catch (error) {
      console.error('删除视频失败:', error);
      wx.showToast({
        title: '删除失败',
        icon: 'none'
      });
    }
  },

  // 选择背景音乐
  chooseBgMusic() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['mp3', 'wav'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].path;
        const musicInfo = {
          src: tempFilePath,
          title: res.tempFiles[0].name
        };
        
        try {
          wx.setStorageSync('bgMusic', musicInfo);
          this.setData({ bgMusic: musicInfo });
          wx.showToast({
            title: '音乐已更新',
            icon: 'success'
          });
        } catch (error) {
          console.error('保存音乐失败:', error);
          wx.showToast({
            title: '更新失败',
            icon: 'none'
          });
        }
      }
    });
  }
}); 