<template>

<div>
  <div class="posts">
    <router-link :key="post.id" :to="`/posts/${post.id}`" v-for="post in items">
      <h2>{{ post.title }}</h2>
      <p>{{ post.updated }}</p>
    </router-link>
  </div>

  <div class="nav">
    <button @click="$router.push(page == 2 ? '/' : `/page/${page - 1}`)" :disabled="page <= 1 || disabled">上一页</button>
    <span>{{ page }} / {{ total }}</span>
    <button @click="$router.push(`/page/${page + 1}`)" :disabled="page >= total || disabled">下一页</button>
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
      posts,
      page,
      config: { title }
    } = this

    if (!posts.length) {
      this.$load(`page/${page}`)
      .then(res => {
        this.setPosts(res)
      })
    }

    document.title = title
  },

  computed: {
    ...mapGetters(['posts', 'config']),

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
        page,
        config: { per_page }
      } = this

      if (!posts.length) {
        return []
      }
      if (per_page === 0) {
        return posts
      }
      return clone(posts).splice((page - 1) * per_page, per_page)
    },

    page() {
      return +this.$route.params.page || 1
    }
  },

  watch: {
    page() {
      this.getPosts()
    }
  },

  methods: {
    getPosts() {
      const {
        config: { per_page },
        posts,
        page
      } = this

      if (posts.length <= (page - 1) * per_page) {
        this.disabled = true
        this.$load(`page/${page}`)
        .then((res) => {
          this.disabled = false
          this.setPosts(posts.concat(res))
        })
      }
    },

    ...mapActions(['setPosts'])
  }
}

</script>

<style lang="postcss">

.posts {
}

</style>