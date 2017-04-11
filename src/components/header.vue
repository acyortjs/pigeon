<template>

<div class="header" :class="className">
  <div @click="toggle" class="btns">
    <button :disabled="loading"></button>
    <router-link v-if="className != 'index'" to="/">{{ config.title }}</router-link>
  </div>
</div>

</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'header',

  data() {
    return {
      className: ''
    }
  },

  computed: {
    ...mapGetters(['config', 'loading', 'menu'])
  },

  created() {
    this.setClass()
    this.$load('config')
    .then(res => this.setConfig(res))
  },

  watch: {
    $route() {
      this.setClass()
    }
  },

  methods: {
    toggle(e) {
      if (e.target.tagName != 'A') {
        this.setMenu(!this.menu)
      }
    },

    setClass() {
      const { name } = this.$route
      if (name == 'home') {
        return this.className = 'index'
      }
      this.className = ''
    },

    ...mapActions(['setConfig', 'setMenu'])
  }
}

</script>

<style lang="postcss">

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.header {
  z-index: 10;
  position: relative;
  text-align: center;
}

.btns {
  position: absolute;
  left: 20px;
  top: 20px;
  background: #000;
  font-size: 0;
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.27);

  & button {
    background: transparent;
    outline: none;
    cursor: pointer;
    width: 17px;
    height: 13px;
    margin: 10px 9px;
    border: none;
    display: inline-block;
    vertical-align: top;
    box-sizing: border-box;
    border-top: 1px solid #d7d7d7;
    border-bottom: 1px solid #d7d7d7;
    position: relative;
    padding: 0;

    &:before {
      content: '';
      height: 1px;
      width: 100%;
      background: #d7d7d7;
      position: absolute;
      top: 5px;
      left: 0;
    }

    &:disabled {
      border: none;

      &:before {
        background: transparent;
        width: 17px;
        height: 17px;
        border-radius: 50%;
        box-sizing: border-box;
        border: 2px solid transparent;
        border-top-color: #fff;
        border-bottom-color: #fff;
        top: -2px;
        left: 0;
        animation: spinner 1s ease infinite;
      }
    }
  }

  & a {
    color: #fff;
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
    padding: 0 14px;
    letter-spacing: .5px;
    border-left: 1px solid #4c4c4c;
    height: 33px;
    line-height: 33px;
    font-family: serif;
  }
}

</style>