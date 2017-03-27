<template>

<div class="main">
  <Aheader></Aheader>
  <transition v-if="config.title" name="slide-fade" mode="out-in">
    <router-view class="view"></router-view>
  </transition>
  <Afooter></Afooter>
  <Notice></Notice>
</div>

</template>

<script>

import Aheader from './components/header'
import Afooter from './components/footer'
import Notice from './components/notice'
import { mapGetters } from 'vuex'

export default {
  name: 'aksdj4',

  components: {
    Aheader,
    Afooter,
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

html, body {
  background: #fff;
}
body {
  font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
  padding: 30px;
}
.main {
  position: relative;
}

</style>