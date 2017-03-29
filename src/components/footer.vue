<template>

<div class="footer">
  <h4>&copy; {{ (new Date()).getFullYear() }} {{ config.title }}</h4>
  <p>Powered by
    <a target="_blank" href="https://github.com/acyortjs/acyort">AcyOrt</a> &amp;
    <a target="_blank" href="https://github.com">GitHub</a> &amp;
    <a target="_blank" href="https://vuejs.org">Vue.js</a> &amp;
    <a target="_blank" href="https://unsplash.it">Unsplash It</a>
  </p>
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
  background: #f5f4f2;
  padding: 30px;
  color: #000;
  margin-top: 50px;
  letter-spacing: 1.5px;

  & h4 {
    font-size: 15px;
    margin-bottom: 20px;
  }

  & p {
    color: #9b9b9b;
    font-size: 13px;
  }

  & a {
    color: #000;

    &:hover {
      text-decoration: underline;
    }
  }
}

</style>