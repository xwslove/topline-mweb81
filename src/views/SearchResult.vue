<template>
  <div>
      <van-nav-bar
      title="搜索结果"
      left-text="返回"
      left-arrow
      fixed
      @click-left="$router.back()"/>
     <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="article in list"
        :key="article.art_id.toString()"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  name: 'SearchResult',
  props: ['q'],
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10
    }
  },
  methods: {
    async onLoad () {
      try {
        const data = await getSearchResults({
          page: this.page,
          perPage: this.per_page,
          q: this.q
        })
        // 把获取的结果push到数组中
        this.list.push(...data.results)
        this.page++
        this.loading = false
        // 判断是否加载完毕
        if (data.results.length === 0) {
          this.finished = true
        }
      } catch (err) {
        this.$toast.fail('获取搜索结果数据失败')
      }
    }
  }
}
</script>

<style>
.van-list{
    margin-top: 46px;
}
</style>
