<template>

<div class="posts">
  <ol>
    <li v-for="post in items">
      <h2>{{ post.title }}</h2>
      <p>{{ post.updated }}</p>
    </li>
  </ol>

  <div class="nav">
    <button @click="current -= 1" :disabled="current <= 1 || disabled">上一页</button>
    <span>{{ current }} / {{ total }}</span>
    <button @click="current += 1" :disabled="current >= total || disabled">下一页</button>
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
      current: 1,
      disabled: false
    }
  },

  created() {
    this.getData(`page/${this.current}`, 'config')
      .then((res) => {
        this.setPosts(res[0])
        this.setConfig(res[1])
      })
  },

  computed: {
    ...mapGetters(['posts', 'config']),

    total() {
      const { config: { posts, per_page } } = this
      if (posts && posts.length) {
        return Math.ceil(posts.length / per_page)
      }
      return 1
    },

    items() {
      const { posts, current, config: { per_page } } = this
      if (!per_page) {
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
    ...mapActions(['setPosts', 'setConfig']),

    getData(...urls) {
      const args = urls.map(url => ({ url }))
      return this.$load(...args)
        .then(res => res)
        .catch(err => console.log(err))
    },

    getPosts() {
      const { config: { per_page }, posts, current } = this

      if (posts.length <= (current - 1) * per_page) {
        this.disabled = true
        this.getData(`page/${this.current}`)
          .then((res) => {
            this.disabled = false
            this.setPosts(clone(posts).concat(res))
          })
      }
    }
  }
}

</script>

<style lang="postcss">
  
.posts {
}

</style>