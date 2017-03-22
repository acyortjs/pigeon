<template>

<div>
  <div class="category">
    <h2>{{ category.name }}</h2>
    <router-link :key="post.id" :to="`/posts/${post.id}`" v-for="post in posts">
      <p>{{ post.title }}</p>
    </router-link>
  </div>

  <div class="nav">
    <button
      @click="setCategoryCurrent(category_current - 1)"
      :disabled="category_current <= 1 || disabled"
    >上一页</button>
    <span>{{ category_current }} / {{ total }}</span>
    <button
      @click="setCategoryCurrent(category_current + 1)"
      :disabled="category_current >= total || disabled"
    >下一页</button>
  </div>
</div>

</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { clone } from '../utils'

export default {
  name: 'category',

  data() {
    return {
      disabled: false
    }
  },

  created() {
    this.getPosts()
  },

  watch: {
    category_current() {
      this.getPosts()
    }
  },

  computed: {
    category() {
      const {
        $route: {
          params: { id }
        },
        categories
      } = this

      return categories[id] || {}
    },

    posts() {
      const {
        category,
        category_current,
        config: { per_page }
      } = this

      if (!category.posts) {
        return []
      }
      return clone(category.posts).splice((category_current - 1) * per_page, per_page)
    },

    total() {
      const {
        config: {
          categories,
          per_page,
        },
        $route: {
          params: { id }
        }
      } = this

      if (!categories) {
        return 1
      }

      const { count } = categories.filter(category => category.id == id)[0]
      return Math.ceil(count / per_page)
    },

    ...mapGetters(['config', 'category_current', 'categories'])
  },

  methods: {
    getPosts() {
      const {
        $route: {
          params: { id }
        },
        config: { per_page },
        categories,
        category_current
      } = this

      const _categories = clone(categories)

      if (!categories[id]) {
        return this.loadPosts()
        .then((res) => {
          _categories[id] = res
          this.setCategories(_categories)
        })
      }

      if (categories[id].posts.length <= (category_current - 1) * per_page) {
        this.loadPosts()
        .then((res) => {
          _categories[id].posts = _categories[id].posts.concat(res.posts)
          this.setCategories(_categories)
        })
      }
    },

    loadPosts() {
      const {
        $route: {
          params: { id }
        },
        category_current
      } = this

      this.disabled = true
      return this.$load(`categories/${id}/${category_current}`)
      .then((res) => {
        this.disabled = false
        return res
      })
    },

    ...mapActions(['setCategories', 'setCategoryCurrent'])
  }
}

</script>

<style lang="postcss">

.category {
}

</style>