let selColor = "#ffffff"
let unSelColor = "#ced3dc"
let selLine = "1px solid #fff"
let unSelLine = ""

Page({
  data: {
    newsTypeList: [
      {"text": "国内", "tp": "gn", "color":selColor, "line":selLine},
      { "text": "国际", "tp": "gj", "color": unSelColor, "line": unSelLine},
      { "text": "财经", "tp": "cj", "color": unSelColor, "line": unSelLine},
      { "text": "娱乐", "tp": "yl", "color": unSelColor, "line": unSelLine},
      { "text": "军事", "tp": "js", "color": unSelColor, "line": unSelLine},
      { "text": "体育", "tp": "ty", "color": unSelColor, "line": unSelLine},
      { "text": "其他", "tp": "other", "color": unSelColor, "line": unSelLine}
    ],
    topNewsList: [],
    secendNewsList: [],
    selectedNewsType:"gn"
  },
  onLoad(){
    this.getNewsList();
  },
  onPullDownRefresh() {
    this.getNewsList(()=>{
      wx.stopPullDownRefresh()
    });
  },
  //点击新闻类别跳转并获取新闻列表
  selNewsType(e) {
    if (this.data.selectedNewsType == e.currentTarget.dataset.tp) {
      return;
    }
    this.data.newsTypeList.forEach(function (value) {
      if (value.tp == e.currentTarget.dataset.tp) {
        value.color = selColor;
        value.line = selLine;
      } else {
        value.color = unSelColor;
        value.line = unSelLine;
      }
    });
    this.setData({
      newsTypeList: this.data.newsTypeList,
      selectedNewsType: e.currentTarget.dataset.tp
    })
    this.getNewsList(); 
  },
  //获取新闻列表
  getNewsList(callback){
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        "type": this.data.selectedNewsType,
      },
      success: res=>{
        wx.hideLoading();
        let result = res.data.result;
        this.addSource(result);
        var topList = [] , secendList = [];
        topList.push(result[0]);
        for (var i = 1; i<result.length; i++){
          secendList.push(result[i]);
        }
        this.setData({
          topNewsList: topList,
          secendNewsList: secendList
        })
      },
      complete: ()=>{
        callback && callback();
      }
    })
  },
  tapNews(e){
    wx.navigateTo({
      url: '/pages/detail/detail?newsID=' + e.currentTarget.dataset.id
    })
    console.log(e.currentTarget.dataset.id)
  },
  //将新闻来源和时间拼接在一起，通过JavaScript slice方法取出时间和日期
  addSource(result){
    for(var i=0; i<result.length; i++){
      if(result[i].firstImage == ""){
        result[i].firstImage = "/images/news-bg.jpg"
      };
      if(result[i].source == ""){
        result[i].source = "来自网络"
      };
      result[i].source = result[i].source + "  "+ result[i].date.slice(0,10) +"  "+ result[i].date.slice(11,16)
    }
  }
})