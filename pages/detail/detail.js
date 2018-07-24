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
      complete: ()=>{
        wx.hideLoading();
      }
    })
  },
  addSource(result) {
    result.source = result.source + "  " + result.date.slice(0, 10) + "  " + result.date.slice(11, 16)
  }
})