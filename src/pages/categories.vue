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
  
import { mapGetters } from 'vuex'

export default {
  name: 'categories',

  computed: {
    ...mapGetters(['config'])
  }
}

</script>

<style lang="postcss">
  
.categories {
}

</style>