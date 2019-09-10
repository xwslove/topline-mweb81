<template>
<!-- 不能使用 v-model="value"
    value 是通过props传递，是单项的
    当dialog组件中input事件触发，说明要去更改value

    @input="handleInput(i)"
   -->
<van-dialog
  :value="value"
  @input="$emit('input',$event)"
 :show-confirm-button="false"
 close-on-click-overlay
>
<van-cell-group v-show="!hide">
  <van-cell title="不感兴趣" icon="location-o" @click="handle('dislike')"/>
  <van-cell title="防窥内容" icon="location-o" is-link @click="hide=true"/>
  <van-cell title="拉黑作者" icon="location-o" @click="handle('blacklist')"/>
</van-cell-group>

<van-cell-group v-show="hide">
  <van-cell icon="arrow-left" @click="hide=false"/>
  <!-- <van-cell title="标题夸张" @click="handle('report',1)"/>
  <van-cell title="色情低俗" @click="handle('report',2)"/>
  <van-cell title="错别字多" @click="handle('report',3)"/> -->
  <van-cell
    v-for="item in reportList"
    :key='item.type'
    :title="item.title"
    @click="handle('report',item.type)"
  ></van-cell>
</van-cell-group>

</van-dialog>
</template>

<script>
import { dislikeArticle, reportArticle } from '@/api/article'
import { blacklists } from '@/api/user'
export default {
  name: 'MoreAction',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      hide: false,
      // 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权'
      reportList: [
        { title: '标题夸张', type: 1 },
        { title: '低俗色情', type: 2 },
        { title: '错别字多', type: 3 },
        { title: '旧闻重复', type: 4 },
        { title: '广告软文', type: 5 },
        { title: '内容不实', type: 6 },
        { title: '涉嫌违法犯罪', type: 7 },
        { title: '侵权', type: 8 },
        { title: '其他问题', type: 0 }
      ]
    }
  },
  methods: {
  // 点击所有cell的时候都该执行该方法
  // 通过type判断具体要执行的操作
    handle (type, reportType) {
      switch (type) {
        case 'dislike':
          this.dislike()
          break
        case 'blacklist':
          // 拉黑作者
          this.blacklistUser()
          break
        case 'report':
          this.report(reportType)
          break
      }
    },
    async blacklistUser () {
      try {
        await blacklists(this.article.aut_id)
        // 隐藏移除掉数据
        // 告知父组件，操作成功
        this.$emit('handleSuccess')
        this.$toast.success('操作成功')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    },

    // 不感兴趣
    async dislike () {
      try {
        await dislikeArticle(this.article.art_id)
        this.$toast.success('操作成功')
        // 隐藏移除掉数据
        // 告知父组件，操作成功
        this.$emit('handleSuccess')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    },
    // 举报文章
    async report (reportType) {
      try {
        await reportArticle({
          target: this.article.art_id,
          type: reportType
        })
        // 告诉父组件隐藏对话框
        this.$emit('input', false)
        this.$toast.success('操作成功')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style>

</style>
