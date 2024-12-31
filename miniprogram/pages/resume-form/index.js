Page({
  data: {
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
      skills: '',
      selfEvaluation: ''
    }
  },

  onLoad() {
    // 加载已有的简历数据
    const resumeData = wx.getStorageSync('resumeData');
    if (resumeData) {
      this.setData({
        formData: resumeData
      });
    }
  },

  // 处理基本信息输入
  handleInput(e) {
    const { field } = e.currentTarget.dataset;
    const { value } = e.detail;
    this.setData({
      [`formData.basicInfo.${field}`]: value
    });
  },

  // 处理工作经历输入
  handleWorkInput(e) {
    const { index, field } = e.currentTarget.dataset;
    const { value } = e.detail;
    const workExperience = this.data.formData.workExperience;
    workExperience[index][field] = value;
    this.setData({
      'formData.workExperience': workExperience
    });
  },

  // 处理技能特长输入
  handleSkillsInput(e) {
    const { value } = e.detail;
    this.setData({
      'formData.skills': value
    });
  },

  // 处理自我评价输入
  handleEvaluationInput(e) {
    const { value } = e.detail;
    this.setData({
      'formData.selfEvaluation': value
    });
  },

  // 添加工作经历
  addWorkExperience() {
    const workExperience = this.data.formData.workExperience;
    if (workExperience.length >= 5) {
      wx.showToast({
        title: '最多添加5段工作经历',
        icon: 'none'
      });
      return;
    }
    workExperience.push({
      company: '',
      position: '',
      description: ''
    });
    this.setData({
      'formData.workExperience': workExperience
    });
  },

  // 删除工作经历
  deleteWorkExperience(e) {
    const { index } = e.currentTarget.dataset;
    const workExperience = this.data.formData.workExperience;
    workExperience.splice(index, 1);
    this.setData({
      'formData.workExperience': workExperience
    });
  },

  // 处理求职意向输入
  handleJobIntentionInput(e) {
    const { field } = e.currentTarget.dataset;
    const { value } = e.detail;
    this.setData({
      [`formData.jobIntention.${field}`]: value
    });
  },

  // 提交表单前验证
  validateForm(formData) {
    const { basicInfo, jobIntention } = formData;
    
    // 验证基本信息
    if (!basicInfo.name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return false;
    }

    if (!basicInfo.phone) {
      wx.showToast({
        title: '请输入电话',
        icon: 'none'
      });
      return false;
    }

    // 验证手机号格式
    const phoneReg = /^1[3-9]\d{9}$/;
    if (!phoneReg.test(basicInfo.phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      });
      return false;
    }

    // 验证邮箱格式
    const emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if (basicInfo.email && !emailReg.test(basicInfo.email)) {
      wx.showToast({
        title: '邮箱格式不正确',
        icon: 'none'
      });
      return false;
    }

    return true;
  },

  // 修改提交表单方法
  submitForm(e) {
    const formData = e.detail.value;
    
    if (!this.validateForm(formData)) {
      return;
    }

    wx.showLoading({
      title: '保存中...'
    });

    // 保存到本地存储
    try {
      wx.setStorageSync('resumeData', formData);
      wx.hideLoading();
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        success: () => {
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      });
    } catch (error) {
      wx.hideLoading();
      wx.showToast({
        title: '保存失败，请重试',
        icon: 'none'
      });
    }
  }
}); 