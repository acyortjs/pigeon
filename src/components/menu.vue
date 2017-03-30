<template>

<div v-if="config.menu" class="menu" :class="menu ? 'active' : ''">
  <router-link
    v-for="(value, key) in config.menu"
    :key="value"
    :to="value"
  >{{ key }}</router-link>
</div>

</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'menu',

  computed: {
    ...mapGetters(['config', 'menu'])
  },

  watch: {
    $route() {
      this.setMenu(false)
    }
  },

  methods: {
    ...mapActions(['setMenu'])
  }
}

</script>

<style lang="postcss">

.menu {
  text-align: center;
  background: #3e3e3e;
  padding: 20px 0;
  position: absolute;
  z-index: 10;
  width: 100%;
  transition: transform .3s ease;
  transform: translateY(-100%);
  box-shadow: inset 0px -1px 2px 0px rgba(0,0,0,0.75);

  &.active {
    transform: translateY(0);

    &+ .main {
      padding-top: 100px;
    }
  }

  & a {
    color: #eee;
    margin: 5px;
    font-size: 15px;
    display: inline-block;

    &:first-letter {
      text-transform: uppercase;
    }

    &:hover {
      text-decoration: underline;
    }
  }
}

</style>