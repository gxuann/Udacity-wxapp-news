let selColor = "#ffffff"
let unSelColor = "#ced3dc"

Page({
  data: {
    newsTypeList: [
      {"text": "国内", "tp": "gn", "color":selColor},
      {"text": "国际", "tp": "gj", "color": unSelColor},
      { "text": "财经", "tp": "cj", "color": unSelColor},
      { "text": "娱乐", "tp": "yl", "color": unSelColor},
      { "text": "军事", "tp": "js", "color": unSelColor},
      { "text": "体育", "tp": "ty", "color": unSelColor},
      { "text": "其他", "tp": "other", "color": unSelColor}
    ],
    topNewsList: [],
    secendNewsList: [],
    selectedNewsType:"gn"
  },
  onLoad(){
    this.getNews();
  },
  //点击新闻类别跳转并获取新闻列表
  selNewsType(e) {
    if (this.data.selectedNewsType == e.currentTarget.dataset.tp) {
      return;
    }
    this.data.newsTypeList.forEach(function (value) {
      if (value.tp == e.currentTarget.dataset.tp) {
        value.color = selColor;
      } else {
        value.color = unSelColor;
      }
    });
    this.setData({
      newsTypeList: this.data.newsTypeList,
      selectedNewsType: e.currentTarget.dataset.tp
    })
    this.getNews(); //获取新闻列表
  },
  getNews(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        "type": this.data.selectedNewsType,
      },
      success: res=>{
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
      }
    })
  },
  addSource(result){
    for(var i=0; i<result.length; i++){
      result[i].date = result[i].source + " " + result[i].date.slice(11,16)
    }
  }
})