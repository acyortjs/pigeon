<template>

<div class="categories">
  <template v-if="config.categories">
    <router-link
      :key="category.id"
      :to="`/categories/${category.id}`"
      v-for="category in config.categories"
    >
      {{ category.name }} ({{ category.count }})
    </router-link>
  </template>
</div>

</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'categories',

  computed: {
    ...mapGetters(['config'])
  },

  created() {
    this.setCategoryCurrent(1)
  },

  methods: {
    ...mapActions(['setCategoryCurrent'])
  }
}

</script>

<style lang="postcss">

.categories {
}

</style>