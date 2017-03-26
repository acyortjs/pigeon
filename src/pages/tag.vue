<template>

<div>
  <div class="tag">
    <h2>{{ tag.name }}</h2>
    <router-link :key="post.id" :to="`/posts/${post.id}`" v-for="post in posts">
      <p>{{ post.title }}</p>
    </router-link>
  </div>

  <div class="nav">
    <button
      @click="$router.push(page == 2 ? `/tags/${id}` : `/tags/${id}/${page - 1}`)"
      :disabled="page <= 1 || disabled"
    >上一页</button>
    <span>{{ page }} / {{ total }}</span>
    <button
      @click="$router.push(`/tags/${id}/${page + 1}`)"
      :disabled="page >= total || disabled"
    >下一页</button>
  </div>
</div>

</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { clone } from '../utils'

export default {
  name: 'tag',

  data() {
    return {
      disabled: false
    }
  },

  created() {
    const {
      config: {
        title,
        tags
      },
      id
    } = this
    const { name } = tags.filter(tag => tag.id == id)[0]

    document.title = `${name} - ${title}`
    this.getPosts()
  },

  watch: {
    page() {
      this.getPosts()
    }
  },

  computed: {
    tag() {
      const {
        id,
        tags
      } = this

      return tags[id] || {}
    },

    id() {
      return this.$route.params.id
    },

    page() {
      return +this.$route.params.page || 1
    },

    posts() {
      const {
        tag,
        page,
        config: { per_page }
      } = this

      if (!tag.posts) {
        return []
      }
      if (per_page === 0) {
        return tag.posts
      }
      return clone(tag.posts).splice((page - 1) * per_page, per_page)
    },

    total() {
      const {
        config: {
          tags,
          per_page,
        },
        id,
      } = this

      if (per_page === 0) {
        return 1
      }

      const { count } = tags.filter(tag => tag.id == id)[0]
      return Math.ceil(count / per_page)
    },

    ...mapGetters(['config', 'tags'])
  },

  methods: {
    getPosts() {
      const {
        id,
        config: { per_page },
        tags,
        page
      } = this

      const _tags = clone(tags)

      if (!tags[id]) {
        return this.loadPosts()
        .then((res) => {
          _tags[id] = res
          this.setTags(_tags)
        })
      }

      if (tags[id].posts.length <= (page - 1) * per_page) {
        this.loadPosts()
        .then((res) => {
          _tags[id].posts = _tags[id].posts.concat(res.posts)
          this.setTags(_tags)
        })
      }
    },

    loadPosts() {
      const {
        id,
        page
      } = this

      this.disabled = true
      return this.$load(`tags/${id}/${page}`)
      .then((res) => {
        this.disabled = false
        return res
      })
    },

    ...mapActions(['setTags'])
  }
}

</script>

<style lang="postcss">

.tag {
}

</style>