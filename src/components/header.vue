<template>
  
<div class="header">
  <a href="/">{{ config.title }}</a>
  <div v-if="config.menu" class="menu">
    <a v-for="(value, key) in config.menu" :href="value">{{ key }}</a>
  </div>
  <div class="tags" v-if="config.tags">
    <router-link 
      :key="tag.id" 
      :to="`/tag/${tag.id}`" 
      v-for="tag in config.tags"
    >
      {{ tag.name }} ({{ tag.count }})
    </router-link>
  </div>
  <div class="categories" v-if="config.categories">
    <router-link 
      :key="category.id" 
      :to="`/category/${category.id}`" 
      v-for="category in config.categories"
    >
      {{ category.name }} ({{ category.count }})
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
    const { config: { title }, $load } = this

    if (title) {
      return document.title = title
    }

    $load({ url: 'config' })
    .then((res) => {
      this.setConfig(res)
      document.title = res.title
    })
    .catch(err => console.log(err))
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