<template>

<div class="notice" :class="message ? 'active' : ''">
  <p>{{ message }}</p>
</div>

</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'notice',

  computed: {
    ...mapGetters(['message'])
  }
}

</script>

<style lang="postcss">

.notice {
  position: absolute;
  width: 100%;
  text-align: center;
}

</style>