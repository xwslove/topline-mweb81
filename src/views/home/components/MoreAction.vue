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
  <van-cell title="拉黑作者" icon="location-o"/>
  <van-cell title="防窥内容" icon="location-o" is-link @click="hide=true"/>
  <van-cell title="不感兴趣" icon="location-o"/>
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
export default {
  name: 'MoreAction',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      hide: false
    }
  }
}
</script>

<style>

</style>
