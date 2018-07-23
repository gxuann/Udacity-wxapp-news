let selColor = "#ffffff"
let unSelColor = "#ced3dc"

Page({
  data: {
    newsTypeList: [
      {"text": "国内", "id": "gn", "color":selColor},
      {"text": "国际", "id": "gj", "color": unSelColor},
      { "text": "财经", "id": "cj", "color": unSelColor},
      { "text": "娱乐", "id": "yl", "color": unSelColor},
      { "text": "军事", "id": "js", "color": unSelColor},
      { "text": "体育", "id": "ty", "color": unSelColor},
      { "text": "其他", "id": "other", "color": unSelColor}
    ]
  },
  onLoad(){

  },
  //点击新闻类别跳转并获取新闻列表
  selNewsType(e) {
    if (this.data.selectedNewsType == e.currentTarget.dataset.id) {
      return;
    }
    this.data.newsTypeList.forEach(function (value) {
      if (value.id == e.currentTarget.dataset.id) {
        value.color = selColor;
      } else {
        value.color = unSelColor;
      }
    });
    this.setData({
      newsTypeList: this.data.newsTypeList,
      selectedNewsType: e.currentTarget.dataset.id
    })
    this.getNews(); //获取新闻列表
  },
})