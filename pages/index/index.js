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
    this.getNewsList();
  },
  onPullDownRefresh() {
    this.getNewsList();
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
    this.getNewsList(); 
  },
  //获取新闻列表
  getNewsList(){
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
      },
      complete: ()=>{
        wx.stopPullDownRefresh()
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
      result[i].source = result[i].source + "  "+ result[i].date.slice(0,10) +"  "+ result[i].date.slice(11,16)
    }
  }
})