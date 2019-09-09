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
  <van-cell title="色情低俗" />
  <van-cell title="青少那想" />
  <van-cell title="政治舆论" />
  <van-cell title="不甘心去" />
</van-cell-group>

</van-dialog>
</template>

<script>
import { dislikeArticle } from '@/api/article'
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
      hide: false
    }
  },
  methods: {
  // 点击所有cell的时候都该执行该方法
  // 通过type判断具体要执行的操作
    handle (type) {
      switch (type) {
        case 'dislike':
          this.dislike()
          break
        case 'blacklist':
          break
      }
    },
    async dislike () {
      try {
        await dislikeArticle(this.article.art_id)
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
