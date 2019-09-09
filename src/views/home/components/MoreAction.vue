<template>
<van-dialog
  v-model="show"
 :show-confirm-button="false"
 close-on-click-overlay
>
hellow
</van-dialog>
</template>

<script>
export default {
  name: 'MoreAction',
  data () {
    return {
      show: true
    }
  }
}
</script>

<style>

</style>
