<template>

<div class="categories">
  <div class="content images" v-if="config.categories">
    <h2>All Categories</h2>

    <router-link
      :key="category.id"
      :to="`/categories/${category.id}`"
      v-for="category in config.categories"
      :style="`background-image: url(https://unsplash.it/270/374/?gravity=east&random=${category.id})`"
    >
      <h4>{{ category.name }}</h4>
      <p>{{ category.count }} {{ category.count > 1 ? 'Posts' : 'Post' }}</p>
    </router-link>
  </div>
</div>

</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'categories',

  computed: {
    ...mapGetters(['config'])
  },

  created() {
    document.title = `All Categories - ${this.config.title}`
  }
}

</script>
