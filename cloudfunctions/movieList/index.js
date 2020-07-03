// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var rp = require('request-promise');

// 云函数入口函数

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 注意要用`而不是',否则count和start值不变
  // return await rp(`https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=time&page_limit=${event.count}&page_start=${event.start}`)
  return await rp(`http://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${event.start}&count=${event.count}`)
    .then(function (res) {
      console.log(event.count)
      console.log(event.start)
      return res
    })
    .catch(function (err) {
      console.log(err)
    });
}