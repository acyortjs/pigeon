<template>

<div class="header" :class="className">
  <div v-if="config.menu" class="menu">
    <router-link
      v-for="(value, key) in config.menu"
      :key="value"
      :to="value"
    >{{ key }}</router-link>
  </div>
  <h1>{{ config.title }}</h1>
  <button class="spin" :disable="loading"></button>
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
    ...mapGetters(['config', 'loading'])
  },

  created() {
    this.$load('config')
    .then(res => this.setConfig(res))
  },

  watch: {
    $route() {
      const { name } = this.$route
      if (name == 'post' || name == 'page') {
        return this.className = ''
      }
      this.className = 'list'
    }
  },

  methods: {
    ...mapActions(['setConfig'])
  }
}

</script>

<style lang="postcss">

.header {
  text-align: center;
  background: #f5f4f2;
  color: #0f0f0f;
}
.menu {
}

</style>