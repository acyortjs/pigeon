<template>

<div>
  <Posts :posts="items"></Posts>

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
import Posts from '../components/posts'
import { clone } from '../utils'

export default {
  name: 'home',

  components: {
    Posts
  },

  data() {
    return {
      disabled: false
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

</style>