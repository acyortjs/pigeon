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
      @click="setTagCurrent(tag_current - 1)"
      :disabled="tag_current <= 1 || disabled"
    >上一页</button>
    <span>{{ tag_current }} / {{ total }}</span>
    <button
      @click="setTagCurrent(tag_current + 1)"
      :disabled="tag_current >= total || disabled"
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
      $route: {
        params: { id }
      }
    } = this
    const { name } = tags.filter(tag => tag.id == id)[0]

    document.title = `${name} - ${title}`
    this.getPosts()
  },

  watch: {
    tag_current() {
      this.getPosts()
    }
  },

  computed: {
    tag() {
      const {
        $route: {
          params: { id }
        },
        tags
      } = this

      return tags[id] || {}
    },

    posts() {
      const {
        tag,
        tag_current,
        config: { per_page }
      } = this

      if (!tag.posts) {
        return []
      }
      if (per_page === 0) {
        return tag.posts
      }
      return clone(tag.posts).splice((tag_current - 1) * per_page, per_page)
    },

    total() {
      const {
        config: {
          tags,
          per_page,
        },
        $route: {
          params: { id }
        }
      } = this

      if (per_page === 0) {
        return 1
      }

      const { count } = tags.filter(tag => tag.id == id)[0]
      return Math.ceil(count / per_page)
    },

    ...mapGetters(['config', 'tag_current', 'tags'])
  },

  methods: {
    getPosts() {
      const {
        $route: {
          params: { id }
        },
        config: { per_page },
        tags,
        tag_current
      } = this

      const _tags = clone(tags)

      if (!tags[id]) {
        return this.loadPosts()
        .then((res) => {
          _tags[id] = res
          this.setTags(_tags)
        })
      }

      if (tags[id].posts.length <= (tag_current - 1) * per_page) {
        this.loadPosts()
        .then((res) => {
          _tags[id].posts = _tags[id].posts.concat(res.posts)
          this.setTags(_tags)
        })
      }
    },

    loadPosts() {
      const {
        $route: {
          params: { id }
        },
        tag_current
      } = this

      this.disabled = true
      return this.$load(`tags/${id}/${tag_current}`)
      .then((res) => {
        this.disabled = false
        return res
      })
    },

    ...mapActions(['setTags', 'setTagCurrent'])
  }
}

</script>

<style lang="postcss">

.tag {
}

</style>