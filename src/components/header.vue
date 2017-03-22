<template>

<div class="header">
  <router-link :to="'/'">{{ config.title }}</router-link>
  <div v-if="config.menu" class="menu">
    <router-link
      v-for="(value, key) in config.menu"
      :key="value"
      :to="value"
    >
    {{ key }}
    </router-link>
  </div>
</div>

</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'header',

  computed: {
    ...mapGetters(['config'])
  },

  created() {
    const {
      config: { title },
      setConfig,
      $load
    } = this

    if (title) {
      return document.title = title
    }

    $load('config').then((res) => {
      setConfig(res)
      document.title = res.title
    })
  },

  methods: {
    ...mapActions(['setConfig'])
  }
}

</script>

<style lang="postcss">

.header {
  flex: 1;

  & p {
    color: #444;
  }
}

</style>