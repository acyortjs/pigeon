<template>

<div>
  <div class="nav">
    <button @click="$router.push(`/archives/${page - 1}`)" :disabled="page <= 1 || disabled">上一页</button>
    <span>{{ page }} / {{ total }}</span>
    <button @click="$router.push(`/archives/${page + 1}`)" :disabled="page >= total || disabled">下一页</button>
  </div>

  <div class="archives">
    <router-link :key="post.id" :to="`/posts/${post.id}`" v-for="post in items">
      <p>{{ post.title }}</p>
    </router-link>
  </div>
</div>

</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { clone } from '../utils'

export default {
  name: 'archives',

  data() {
    return {
      disabled: false
    }
  },

  created() {
    const {
      page,
      archives
    } = this

    if (!archives.length) {
      this.$load(`archives/${page}`)
      .then(res => this.setArchives(res))
    }

    document.title = `Archives - ${this.config.title}`
  },

  computed: {
    total() {
      const {
        posts,
        archives_per_page
      } = this.config

      if (archives_per_page === 0 || posts.length === 0) {
        return 1
      }
      return Math.ceil(posts.length / archives_per_page)
    },

    page() {
      return +this.$route.params.page
    },

    items() {
      const {
        archives,
        page,
        config: { archives_per_page }
      } = this

      if (!archives.length) {
        return []
      }
      if (archives_per_page === 0) {
        return archives
      }
      return clone(archives).splice((page - 1) * archives_per_page, archives_per_page)
    },

    ...mapGetters(['config', 'archives'])
  },

  watch: {
    page() {
      this.getArchives()
    }
  },

  methods: {
    getArchives() {
      const {
        config: { archives_per_page },
        page,
        archives
      } = this

      if (archives.length <= (page - 1) * archives_per_page) {
        this.disabled = true
        this.$load(`archives/${page}`)
        .then((res) => {
          this.disabled = false
          this.setArchives(archives.concat(res))
        })
      }
    },

    ...mapActions(['setArchives'])
  }
}

</script>

<style lang="postcss">

.archives {
}

</style>