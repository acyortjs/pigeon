<template>

<div class="notice" :class="className">
  <p>{{ message.text }}</p>
</div>

</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'notice',

  computed: {
    className() {
      const {
        type,
        text
      } = this.message

      if (!text) {
        return type
      }
      return `${type} active`
    },

    ...mapGetters(['message'])
  }
}

</script>

<style lang="postcss">

.notice {
}

</style>