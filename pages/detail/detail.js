var newsID 
Page({
  data:{
    contentList: [],
    count:""
  },
  onLoad(options){
    newsID = options.newsID
    this.getNewsDetail(newsID)
  }, 
  onPullDownRefresh() {
    this.getNewsList();
  },
  getNewsDetail(){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        "id": newsID
      },
      success: res=>{
        wx.showLoading({
          title: '加载中',
        });
        let result = res.data.result
        this.addSource(result)
        this.setData({
          title: result.title,
          source: result.source,
          contentList: result.content,
          count: "阅读 " + result.readCount
        })
      },
      fail: ()=>{
        this.setData({
          contentList: [
            {
              "type":"image",
              "src":"/images/404.jpg"
            },
            {
              "type":"strong",
              "text":"Oops,好像出现了什么问题,请过一会儿再来看看~"
            }
          ],
          title: "新闻页好像丢了~",
          source: "err",
          count: "err" 
        })
      },
      complete: ()=>{
        wx.hideLoading();
      }
    })
  },
  addSource(result) {
    if (result.firstImage == "") {
      result.firstImage = "/images/news-bg.jpg"
    };
    if (result.source == "") {
      result.source = "来自网络"
    };
    result.source = result.source + "  " + result.date.slice(0, 10) + "  " + result.date.slice(11, 16)
  }
})