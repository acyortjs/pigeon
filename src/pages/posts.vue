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
      current,
      posts,
      config: { title }
    } = this

    if (!posts.length) {
      this.$load(`page/${current}`)
      .then(res => {
        this.setPosts(res)
      })
    }

    document.title = title
  },

  computed: {
    ...mapGetters(['posts', 'config', 'current']),

    total() {
      const {
        posts,
        per_page
      } = this.config

      if (per_page === 0 || posts.length === 0) {
        return 1
      }
      return Math.ceil(posts.length / per_page)
    },

    items() {
      const {
        posts,
        current,
        config: { per_page }
      } = this

      if (!posts.length) {
        return []
      }
      if (per_page === 0) {
        return posts
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
        current
      } = this

      if (posts.length <= (current - 1) * per_page) {
        this.disabled = true
        this.$load(`page/${current}`)
        .then((res) => {
          this.disabled = false
          this.setPosts(posts.concat(res))
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