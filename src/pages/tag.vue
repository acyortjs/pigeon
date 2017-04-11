<template>
<div>

<div class="top">
  <p>{{ sum }} posts in total</p>
  <h1>{{ tag.name }}</h1>
</div>

<div class="tag content">
  <Posts :posts="posts"></Posts>

  <div class="nav">
    <button
      @click="$router.push(page == 2 ? `/tags/${id}` : `/tags/${id}/${page - 1}`)"
      :disabled="page <= 1 || disabled"
    >Previous</button>
    <button
      @click="$router.push(`/tags/${id}/${page + 1}`)"
      :disabled="page >= total || disabled"
    >Next</button>
    <span>{{ page }} / {{ total }}</span>
  </div>
</div>

</div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import Posts from '../components/posts'
import { clone } from '../utils'

export default {
  name: 'tag',

  components: {
    Posts
  },

  data() {
    return {
      disabled: false,
      sum: ''
    }
  },

  created() {
    const {
      config: {
        title,
        tags
      },
      id,
      page,
      total
    } = this

    const { name, count } = tags.find(tag => tag.id == id)
    document.title = `${name} - ${title}`

    if (page > total) {
      return this.$router.replace(`/tags/${id}`)
    }

    this.sum = count
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
      return tag.posts[page] || []
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
          const { name, posts } = res
          _tags[id] = { id, name, posts: {} }
          _tags[id].posts[page] = posts
          this.setTags(_tags)
        })
      }

      if (!tags[id].posts[page]) {
        this.loadPosts()
        .then((res) => {
          _tags[id].posts[page] = res.posts
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
  max-width: 900px;
}

</style>