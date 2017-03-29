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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter,
.slide-fade-leave-active {
    transform: translateX(10px);
    opacity: 0;
}

.container {
  position: relative;
}
.main {
  position: relative;
  padding: 30px;
  transition: padding .3s ease;
}
.view {
  min-height: 600px;
}
.content {
  width: 96%;
  max-width: 800px;
}
h1, h2, h3, h4, h5, p {
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