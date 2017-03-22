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
    const { archive_current, archives, $load, setArchives } = this
    if (!archives.length) {
      $load({ url: `archives/${archive_current}` })
      .then(res => setArchives(res))
      .catch(err => console.log(err))
    }
  },

  computed: {
    ...mapGetters(['config', 'archives', 'archive_current']),

    total() {
      const { config: { posts, archives_per_page } } = this
      if (posts && posts.length) {
        return Math.ceil(posts.length / archives_per_page)
      }
      return 1
    },

    items() {
      const { archives, archive_current, config: { archives_per_page } } = this
      if (!archives_per_page || !archives.length) {
        return []
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
    ...mapActions(['setArchives', 'setArchiveCurrent']),

    getArchives() {
      const { config: { archives_per_page }, archives, archive_current } = this

      if (archives.length <= (archive_current - 1) * archives_per_page) {
        this.disabled = true
        this.$load({ url: `archives/${this.archive_current}` })
        .then((res) => {
          this.disabled = false
          this.setArchives(archives.concat(res))
        })
        .catch(err => console.log(err))
      }
    }
  }
}

</script>

<style lang="postcss">
  
.archives {
}

</style>