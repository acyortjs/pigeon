<template>

<Aheader></Aheader>

<transition name="slide-fade" mode="out-in">
  <router-view class="view"></router-view>
</transition>

</template>

<script>

import Aheader from './components/header'

export default {
  name: 'aksdj4',

  components: {
    Aheader
  }
}

</script>

<style lang='postcss'>

@import "../node_modules/normalize.css/normalize.css";

</style>