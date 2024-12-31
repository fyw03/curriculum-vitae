var postList = [{
  date: "Jan 28 2017",
  title: "小米商城",
  postImg: "/images/post/post11.png",
  avatar: "/images/avatar/a1.jpg",
  content: "   本项目聚焦重塑小米商城官网，旨在融合简洁美学与极致交互体验。优化页面布局，让产品展示更吸睛，搜索、下单流程更丝滑，适配全终端。同时强化个性化推荐，借大数据贴合用户喜好，全方位提升购物愉悦感与品牌忠诚度。",
  readingNum: 23,
  collectionNum: 3,
  commentNum: 0,
  author: "林白衣",
  dateTime: "24小时前",
  detail: "此次小米商城网站设计项目意义非凡，意在打破传统电商边界，为用户勾勒全新数字购物场域。设计团队将深挖小米的科技、亲民等品牌特质，打造视觉上清爽且科技感十足的界面。从首页智能分流，到商品详情沉浸式浏览，再到一键下单售后无忧，全链路精雕细琢，用前沿设计赋能，让全球米粉畅享极致购物之旅，巩固小米科技潮牌的电商阵地。...",
  postId: 1,
  music: {
      url: "http://ws.stream.qqmusic.qq.com/C100001Dc80Z3qPj2Z.m4a?fromtag=38",
      title: "罗大佑 恋曲1980",
      coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000003cWU1M2qNwxZ.jpg?max_age=2592000",
  },
  collectionStatus: true,
  upStatus: false,
  upNum: 11,
  comments: []
},
{
  date: "Jan 9 2017",
  title: "图书管理系统",
  postImg: "/images/post/post12.png",
  avatar: "/images/avatar/a1.jpg",
  content: "图书管理学系统项目，旨在为图书馆打造数字化管理方案。整合书籍采编、借还、盘点流程，实现自动化操作。系统自带检索与统计功能，方便管理员调控馆藏，也让读者能迅速找书，提升借阅体验，开启智慧阅读服务新篇章。",
  readingNum: 96,
  collectionNum: 7,
  commentNum: 4,
  author: "林白衣",
  dateTime: "24小时前",
  detail: "图书管理学系统项目聚焦于革新图书馆运营模式。它运用先进技术，将繁杂的图书业务数字化，涵盖采编录入、流通管理、库存盘点等各环节。管理员能远程监控馆藏动态，及时补货；读者凭借线上平台，一键检索心仪书籍、预约借阅。该项目不仅提升管理效率，还为全民阅读注入强劲动力。",
  postId: 2,
  music: {
      url: "http://ws.stream.qqmusic.qq.com/C100004VybKS2SpZVL.m4a?fromtag=38",
      title: "齐秦 原来的我",
      coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000003ZvAeK2PgA4Y.jpg?max_age=2592000"
  },
  collectionStatus: true,
  upStatus: true,
  upNum: 22,
  comments: [
      {
          username: '青石',
          avatar: '/images/avatar/avatar-3.png',
          create_time: '1484723344',
          content: {
              txt: ' 写的非常好',
              img: [],
              audio: null
          }
      }, {
          username: '水清',
          avatar: '/images/avatar/avatar-2.png',
          create_time: '1481018319',
          content: {
              txt: '夏日的蝉鸣与夜晚的火车，时长会在未来无数的日子里不断的在我耳边响起，难以忘怀',
              img: [],
              audio: null,
          }
      }, 
      {
          username: '赤墨',
          avatar: '/images/avatar/avatar-1.png',
          create_time: '1484496000',
          content: {
              txt: '时光的湮染，自然的吞噬，让太多的老火车站也消失得无影无踪',
              img: ["/images/comment/train-4.jpg",],
              audio: null,
          }
      },
       {
          username: '林白',
          avatar: '/images/avatar/avatar-4.png',
          create_time: '1484582400',
          content: {
              txt: '',
              img: [],
              audio: {url:"http://123",timeLen:8},
          }
      }
  ]
},
{
  date: "Jan 29 2017",
  title: "完美上岸推免管理系统",
  postImg: "/images/post/post13.png",
  avatar: "/images/avatar/a1.jpg",
  content: "完美上岸推免管理系统，专为高校推免工作打造。整合学生信息、成绩排名、申报流程，实现一站式数字化管理。老师能高效审核筛选，学生随时跟进进度，消除信息差，让推免流程清晰、公正，助力莘莘学子顺利迈向新征程。",
  readingNum: 56,
  collectionNum: 6,
  commentNum: 0,
  author: "林白衣",
  dateTime: "24小时前",
  detail: "完美上岸推免管理系统项目，致力于优化高校保研推免流程。系统汇聚学生学业数据、获奖经历、科研成果等海量信息，自动排名筛选。教师端操作简便，精准把控审核节奏；学生端界面友好，实时知晓动态。全程信息化运作，提升效率，保障推免工作公开透明、有条不紊。",
  postId: 3,
  music: {
      url: "http://ws.stream.qqmusic.qq.com/C100003XYcCu3IZKLc.m4a?fromtag=38",
      title: "老狼 虎口脱险",
      coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000002sNbWp3royJG.jpg?max_age=2592000"
  },
  collectionStatus: false,
  upStatus: false,
  upNum: 9,
  comments: []
},

]

module.exports = {
  postList: postList
}