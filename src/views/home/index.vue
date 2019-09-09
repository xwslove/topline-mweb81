<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar fixed title="黑马头条" />
    <!-- 频道列表 -->
    <van-tabs animated v-model="activeIndex">
      <!-- 遍历标签页，显示频道列表 -->
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <!-- 下拉加载更多组件 -->
        <van-pull-refresh
          :success-text="successText"
          v-model="currentChannel.pullLoading"
          @refresh="onRefresh"
        >
          <!-- 文章列表,不同的标签页下有不同的列表 -->
          <van-list
            v-model="currentChannel.loading"
            :finished="currentChannel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="article in currentChannel.articles"
              :key="article.art_id.toString()"
              :title="article.title"
            >
              <div slot="label">
                  <!-- grid 显示封面
                  article.cover.type   0 没有图片   1 1个图片 3 3个图片
                 -->
                <van-grid v-if="article.cover.type" :border="false" :column-num="3">
                  <van-grid-item
                    v-for="(img, index) in article.cover.images"
                    :key="img + index"
                  >
                    <van-image height="80" :src="img" />
                  </van-grid-item>
                </van-grid>
                <p>
                  <span>{{article.aut_name}}</span> &nbsp;
                  <span>{{article.comm_count}}评论</span> &nbsp;
                  <span>{{article.pubdate | fmtDate}}</span>
                    <!-- 点击x按钮，记录当前的文章对象 -->
                  <van-icon name="cross" class="close" @click="handleAction(article)"/>
                </p>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 弹出层组件-moreAction -->
    <!-- 如果article的值为null 不显示more-action -->
    <more-action v-if="currentArticle" :article="currentArticle" v-model="hide"></more-action>
  </div>
</template>

<script>
import { getDefaultOrUserChannels } from '@/api/channel'
import { getArticles } from '@/api/article'
import Vue from 'vue'
import { Lazyload } from 'vant'
import MoreAction from './components/MoreAction'

// options为可选参数，无则不传
Vue.use(Lazyload)
export default {
  name: 'Home',
  components: {
    MoreAction
  },
  data () {
    return {
      // 列表数据
      // list: [],
      // loading: false,
      // finished: false,
      // 频道列表
      channels: [],
      // tab是组件中默人显示的tab的索引
      activeIndex: 0,
      // 下拉更新完毕之后显示成功的提示
      successText: '',
      hide: false,
      // 点击x的时候，记录的当前文章对象
      currentArticle: null
    }
  },
  created () {
    // 加载频道列表
    this.loadChannels()
  },
  computed: {
    // 返回当前的频道对象
    currentChannel () {
      return this.channels[this.activeIndex]
    }
  },
  methods: {
    // 加载频道列表
    async loadChannels () {
      try {
        const data = await getDefaultOrUserChannels()
        // 给所有的频道设置，时间戳和文章数组
        data.channels.forEach(channel => {
          channel.timestamp = null
          channel.articles = []
          channel.loading = false
          channel.finished = false
        })
        this.channels = data.channels
      } catch (err) {
        console.log(err)
      }
    },
    // list组件的load
    async onLoad () {
      // 发送请求
      // 获取当前频道对象  --- 下面不需要写了，因为设置了一个当前频道的计算属性
      // const currentChannel = this.channels[this.activeIndex]
      //  当前频道对象 时间戳
      //  当前频道对象 文章数组
      const data = await getArticles({
        // 频道的id
        channelId: this.currentChannel.id,
        // 时间戳
        timestamp: this.currentChannel.timestamp || Date.now(),
        // 是否包含置顶1，0不包含
        withTop: 1
      })
      // 记录文章列表，记录最后一条数据的时间戳
      this.currentChannel.timestamp = data.pre_timestamp
      // [[], []]
      this.currentChannel.articles.push(...data.results)
      // this.loading = false
      this.currentChannel.loading = false
      // 文章加载完毕
      // 如果木一个频道加载完毕，其他频道的finshed也是加载完毕
      if (data.results.length === 0) {
        this.currentChannel.finished = true
      }
    },
    // 下拉加载更多
    async onRefresh () {
      try {
        const data = await getArticles({
          // 频道的id
          channelId: this.currentChannel.id,
          // 时间戳
          timestamp: this.currentChannel.timestamp || Date.now(),
          // 是否包含置顶1，0不包含
          withTop: 1
        })
        // 加载完毕
        this.currentChannel.pullLoading = false
        // 把数据放到数组中最前面
        this.currentChannel.articles.unshift(...data.results)
        this.successText = `加载了${data.results.length}条数据`
      } catch (err) {
        console.log(err)
      }
    },
    // 点击x按钮，弹出MoreAction，并且记录对应的文章对象
    handleAction (article) {
      this.hide = true
      this.currentArticle = article
    }
  }
}
</script>

<style lang="less" scoped>
// 在scoped中书写的样式，动态生成的标签或者子组件中不可用
// 深度作用选择器   /deep/
.van-tabs {
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 10px;
    z-index: 100;
  }
  /deep/ .van-tabs__content {
    margin-top: 90px;
    margin-bottom: 50px;
  }
}
.close {
  float: right;
}
</style>
