<template>

<div class="header">
  <router-link :to="'/'">{{ config.title }}</router-link>
  <div v-if="config.menu" class="menu">
    <router-link
      v-for="(value, key) in config.menu"
      :key="value"
      :to="value"
    >{{ key }}</router-link>
  </div>
  <div class="spin" :class="loading ? 'active' : ''"></div>
</div>

</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'header',

  computed: {
    ...mapGetters(['config', 'loading'])
  },

  created() {
    this.$load('config')
    .then(res => this.setConfig(res))
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

</style>