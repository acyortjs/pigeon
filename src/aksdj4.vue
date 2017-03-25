<template>

<div class="main">
  <Aheader></Aheader>
  <transition v-if="config.title" name="slide-fade" mode="out-in">
    <router-view class="view"></router-view>
  </transition>
  <Notice></Notice>
</div>

</template>

<script>

import Aheader from './components/header'
import Notice from './components/notice'
import { mapGetters } from 'vuex'

export default {
  name: 'aksdj4',

  components: {
    Aheader,
    Notice
  },

  computed: {
    ...mapGetters(['config'])
  },

  watch: {
    config() {
      if (this.config.title) {
        setTimeout(() => {
          document.documentElement.classList.remove('loading')
        }, 1500)
      }
    }
  }
}

</script>

<style lang="postcss">

@import "../node_modules/normalize.css/normalize.css";

.main {
  position: relative;
}

</style>