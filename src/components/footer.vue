<template>

<div class="footer">
  <h4>&copy; {{ (new Date()).getFullYear() }} {{ config.title }}</h4>
  <p>Powered by <a target="_blank" href="https://github.com/acyortjs/acyort">AcyOrt</a> &amp; <a target="_blank" href="https://github.com">GitHub</a></p>
</div>

</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'footer',

  computed: {
    ...mapGetters(['config'])
  }
}

</script>

<style lang="postcss">

.footer {
}

</style>