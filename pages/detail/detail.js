var newsID 
Page({
  data:{
    contentList: []
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
        let result = res.data.result
        this.addSource(result)
        this.setData({
          title: result.title,
          date: result.date,
          contentList: result.content
        })
      },
      complete: () => {
        wx.stopPullDownRefresh()
      }
    })
  },
  addSource(result) {
    result.date = result.source + "  " + result.date.slice(0, 10) + "  " + result.date.slice(11, 16)
  }
})