<template>

<div class="tags">
  <template v-if="config.tags">
    <router-link
      :key="tag.id"
      :to="`/tags/${tag.id}`"
      v-for="tag in config.tags"
    >
      {{ tag.name }} ({{ tag.count }})
    </router-link>
  </template>
</div>

</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'tags',

  computed: {
    ...mapGetters(['config'])
  },

  created() {
    this.setTagCurrent(1)
  },

  methods: {
    ...mapActions(['setTagCurrent'])
  }
}

</script>

<style lang="postcss">

.tags {
}

</style>