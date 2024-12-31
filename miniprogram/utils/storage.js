const RESUME_KEY = 'resumeData';

export const saveResume = (data) => {
  wx.setStorageSync(RESUME_KEY, data);
};

export const getResume = () => {
  return wx.getStorageSync(RESUME_KEY);
}; 