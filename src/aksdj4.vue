<template>

<div class="container">
  <AMenu></AMenu>
  <div class="main">
    <Aheader></Aheader>
    <transition v-if="config.title" name="slide-fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <Afooter></Afooter>
  </div>
  <Notice></Notice>
</div>

</template>

<script>

import Aheader from './components/header'
import Afooter from './components/footer'
import Notice from './components/notice'
import AMenu from './components/menu'
import { mapGetters } from 'vuex'

export default {
  name: 'aksdj4',

  components: {
    Aheader,
    Afooter,
    Notice,
    AMenu
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
  font-family: Helvetica Neue, Helvetica, Roboto, Arial, sans-serif;
}
.container {
  position: relative;
}
.main {
  position: relative;
  padding: 30px;
  transition: padding .3s ease;
}
h1, h2, h3, h4, h5 {
  margin: 0;
  font-weight: normal;
}
a {
  text-decoration: none;
}
ul {
  list-style: none;
}

</style>