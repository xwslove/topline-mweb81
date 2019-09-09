<template>
<van-dialog
  v-model="show"
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
  data () {
    return {
      show: true,
      hide: false
    }
  }
}
</script>

<style>

</style>
