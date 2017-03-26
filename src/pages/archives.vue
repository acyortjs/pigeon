<template>

<div>
  <div class="nav">
    <button @click="setArchiveCurrent(archive_current - 1)" :disabled="archive_current <= 1 || disabled">上一页</button>
    <span>{{ archive_current }} / {{ total }}</span>
    <button @click="setArchiveCurrent(archive_current + 1)" :disabled="archive_current >= total || disabled">下一页</button>
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
      archive_current,
      archives
    } = this

    if (!archives.length) {
      this.$load(`archives/${archive_current}`)
      .then(res => this.setArchives(res))
    }

    document.title = `Archives - ${this.config.title}`
  },

  computed: {
    ...mapGetters(['config', 'archives', 'archive_current']),

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

    items() {
      const {
        archives,
        config: { archives_per_page },
        archive_current
      } = this

      if (!archives.length) {
        return []
      }
      if (archives_per_page === 0) {
        return archives
      }
      return clone(archives).splice((archive_current - 1) * archives_per_page, archives_per_page)
    }
  },

  watch: {
    archive_current() {
      this.getArchives()
    }
  },

  methods: {
    getArchives() {
      const {
        config: { archives_per_page },
        archives,
        archive_current
      } = this

      if (archives.length <= (archive_current - 1) * archives_per_page) {
        this.disabled = true
        this.$load(`archives/${archive_current}`)
        .then((res) => {
          this.disabled = false
          this.setArchives(archives.concat(res))
        })
      }
    },

    ...mapActions(['setArchives', 'setArchiveCurrent'])
  }
}

</script>

<style lang="postcss">

.archives {
}

</style>