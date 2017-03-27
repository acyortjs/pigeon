<template>

<div>
  <ul class="posts">
    <li v-for="post in items">
      <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
      <p>{{ post.updated | timeFormat }}</p>
      <div v-html="post.summary"></div>
      <img :src="post.thumb || `https://unsplash.it/200/300/?random=${post.id}&gravity=center`" />
    </li>
  </ul>

  <div class="nav">
    <button
      @click="$router.push(page == 2 ? '/' : `/page/${page - 1}`)"
      :disabled="page <= 1 || disabled"
    >上一页</button>
    <span>{{ page }} / {{ total }}</span>
    <button
      @click="$router.push(`/page/${page + 1}`)"
      :disabled="page >= total || disabled"
    >下一页</button>
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

  filters: {
    timeFormat(time) {
      return new Date(time)
      .toString()
      .split(' ')
      .filter((t, i) => i >= 1 && i <= 3)
      .map((t, i) => i == 1 ? `${t},` : t)
      .join(' ')
    }
  },

  created() {
    const {
      posts,
      page,
      total,
      config: { title }
    } = this

    document.title = title

    if (page > total) {
      return this.$router.replace('/')
    }

    const _posts = clone(posts)

    if (posts[page]) {
      return
    }

    this.$load(`page/${page}`)
    .then((res) => {
      _posts[page] = res
      this.setPosts(_posts)
    })
  },

  computed: {
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

      return posts[page] || []
    },

    page() {
      return +this.$route.params.page || 1
    },

    ...mapGetters(['posts', 'config'])
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

      const _posts = clone(posts)

      if (posts[page]) {
        return
      }

      this.disabled = true
      this.$load(`page/${page}`)
      .then((res) => {
        this.disabled = false
        _posts[page] = res
        this.setPosts(_posts)
      })
    },

    ...mapActions(['setPosts'])
  }
}

</script>

<style lang="postcss">

.posts {
}

</style>