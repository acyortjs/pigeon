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

.images {
  margin: 40px auto 0;
  max-width: none;
  text-align: center;

  & h2 {
    color: #333;
    font-size: 14px;
  }

  & a {
    display: inline-block;
    width: 270px;
    height: 374px;
    margin: 20px;
    box-shadow: 0 3px 5px 0 rgba(0,0,0,0.27);
    color: #fff;
    text-align: left;
    position: relative;
    background-color: #f7f7f7;

    &:after {
      content: '';
      box-sizing: border-box;
      border: 1px solid rgba(255, 255, 255, .6);
      position: absolute;
      top: 20px;
      bottom: 20px;
      left: 20px;
      right: 20px;
      transition: all .15s linear;
    }

    &:hover:after {
      border: 1px solid rgba(255, 255, 255, .8);
      top: 18px;
      bottom: 18px;
      left: 18px;
      right: 18px;
    }

    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .27);
      left: 0;
      top: 0;
    }

    & h4 {
      position: absolute;
      left: 40px;
      font-size: 16px;
      bottom: 60px;
      font-weight: 600;

      &:first-letter {
        text-transform: uppercase;
      }
    }

    & p {
      position: absolute;
      left: 40px;
      font-size: 12px;
      bottom: 40px;
    }
  }
}

</style>