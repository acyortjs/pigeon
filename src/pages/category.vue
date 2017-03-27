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
      @click="$router.push(page == 2 ? `/categories/${id}` : `/categories/${id}/${page - 1}`)"
      :disabled="page <= 1 || disabled"
    >上一页</button>
    <span>{{ page }} / {{ total }}</span>
    <button
      @click="$router.push(`/categories/${id}/${page + 1}`)"
      :disabled="page >= total || disabled"
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
    const {
      config: {
        title,
        categories
      },
      id,
      page,
      total
    } = this

    const { name } = categories.filter(category => category.id == id)[0]
    document.title = `${name} - ${title}`

    if (page > total) {
      return this.$router.replace(`/categories/${id}`)
    }

    this.getPosts()
  },

  watch: {
    page() {
      this.getPosts()
    }
  },

  computed: {
    category() {
      const {
        id,
        categories
      } = this

      return categories[id] || {}
    },

    id() {
      return this.$route.params.id
    },

    page() {
      return +this.$route.params.page || 1
    },

    posts() {
      const {
        category,
        page,
        config: { per_page }
      } = this

      if (!category.posts) {
        return []
      }
      return category.posts[page] || []
    },

    total() {
      const {
        config: {
          categories,
          per_page,
        },
        id
      } = this

      if (per_page === 0) {
        return 1
      }

      const { count } = categories.filter(category => category.id == id)[0]
      return Math.ceil(count / per_page)
    },

    ...mapGetters(['config', 'categories'])
  },

  methods: {
    getPosts() {
      const {
        id,
        config: { per_page },
        categories,
        page
      } = this

      const _categories = clone(categories)

      if (!categories[id]) {
        return this.loadPosts()
        .then((res) => {
          const { name, posts } = res
          _categories[id] = { id, name, posts: {} }
          _categories[id].posts[page] = posts
          this.setCategories(_categories)
        })
      }

      if (!categories[id].posts[page]) {
        this.loadPosts()
        .then((res) => {
          _categories[id].posts[page] = res.posts
          this.setCategories(_categories)
        })
      }
    },

    loadPosts() {
      const {
        id,
        page
      } = this

      this.disabled = true
      return this.$load(`categories/${id}/${page}`)
      .then((res) => {
        this.disabled = false
        return res
      })
    },

    ...mapActions(['setCategories'])
  }
}

</script>

<style lang="postcss">

.category {
}

</style>