<template>

<div>
  <div class="posts">
    <router-link :key="post.id" :to="`/posts/${post.id}`" v-for="post in items">
      <h2>{{ post.title }}</h2>
      <p>{{ post.updated }}</p>
    </router-link>
  </div>

  <div class="nav">
    <button @click="setCurrent(current - 1)" :disabled="current <= 1 || disabled">上一页</button>
    <span>{{ current }} / {{ total }}</span>
    <button @click="setCurrent(current + 1)" :disabled="current >= total || disabled">下一页</button>
  </div>
</div>

</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { clone } from '../utils'

export default {
  name: 'posts',

  data() {
    return {
      disabled: false
    }
  },

  created() {
    const {
      $load,
      current,
      posts,
      setPosts
    } = this

    if (!posts.length) {
      $load(`page/${current}`).then(res => setPosts(res))
    }
  },

  computed: {
    ...mapGetters(['posts', 'config', 'current']),

    total() {
      const {
        posts,
        per_page
      } = this.config

      if (posts && posts.length) {
        return Math.ceil(posts.length / per_page)
      }
      return 1
    },

    items() {
      const {
        posts,
        current,
        config: { per_page }
      } = this

      if (!per_page || !posts.length) {
        return []
      }
      return clone(posts).splice((current - 1) * per_page, per_page)
    }
  },

  watch: {
    current() {
      this.getPosts()
    }
  },

  methods: {
    getPosts() {
      const {
        config: { per_page },
        posts,
        current,
        $load,
        setPosts
      } = this

      if (posts.length <= (current - 1) * per_page) {
        this.disabled = true
        $load(`page/${current}`).then((res) => {
          this.disabled = false
          setPosts(posts.concat(res))
        })
      }
    },

    ...mapActions(['setPosts', 'setCurrent'])
  }
}

</script>

<style lang="postcss">

.posts {
}

</style>