<template>

<div class="tags">
  <div class="content images" v-if="config.tags">
    <h2>All Tags</h2>

    <router-link
      :key="tag.id"
      :to="`/tags/${tag.id}`"
      v-for="tag in config.tags"
      :style="`background-image: url(https://unsplash.it/270/374/?gravity=east&random=${tag.id})`"
    >
      <h4>{{ tag.name }}</h4>
      <p>{{ tag.count }} {{ tag.count > 1 ? 'Posts' : 'Post' }}</p>
    </router-link>
  </div>
</div>

</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'tags',

  computed: {
    ...mapGetters(['config'])
  },

  created() {
    document.title = `All Tags - ${this.config.title}`
  }
}

</script>

<style lang="postcss">

@import "../components/images.css";

</style>