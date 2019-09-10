import request from '@/utils/request'

/**
 * 获取文章列表（登录和不登录）
 * @param {*} 参数 channel_id,timestamp,with_top
 */
export const getArticles = ({
  // 频道的id
  channelId,
  // 时间戳
  timestamp,
  // 是否包含置顶1，0不包含
  withTop
}) => {
  return request.get('/app/v1_1/articles', {
    params: {
      channel_id: channelId,
      timestamp,
      with_top: withTop
    }
  })
}
// 不喜欢的文章
export const dislikeArticle = (id) => {
  return request.post('/app/v1_0/article/dislikes', {
  // 文章列表
    target: id
  })
}
// 举报类型
// 0-其他问题1标题夸张
export const reportArticle = ({
  // 文章id
  target,
  type
}) => {
  return request.post('/app/v1_0/article/reports', {
    target,
    type
  })
}
