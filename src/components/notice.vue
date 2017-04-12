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
  position: fixed;
  z-index: 20;
  width: 100%;
  text-align: center;
  height: 100%;
  top: 0;
  display: none;
  background: #fff;

  &.active {
    display: block;
  }

  &:before {
    content: '';
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }

  & p {
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.27);
    background: #fff;
    display: inline-block;
    width: 300px;
    padding: 30px 0;
    color: #333;
    border-radius: 3px;
  }
}

</style>