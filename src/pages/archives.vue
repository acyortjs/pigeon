<template>

<div>
  <div class="nav">
    <button @click="$router.push(page == 2 ? '/archives' : `/archives/${page - 1}`)" :disabled="page <= 1 || disabled">上一页</button>
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
      archives,
      total,
      config: { title }
    } = this

    document.title = `Archives - ${title}`

    if (page > total) {
      return this.$router.replace('/archives')
    }

    const _archives = clone(archives)

    if (archives[page]) {
      return
    }

    this.$load(`archives/${page}`)
    .then((res) => {
      _archives[page] = res
      this.setArchives(_archives)
    })
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
      return +this.$route.params.page || 1
    },

    items() {
      const {
        archives,
        page,
        config: { archives_per_page }
      } = this

      return archives[page] || []
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

      const _archives = clone(archives)

      if (archives[page]) {
        return
      }

      this.disabled = true
      this.$load(`archives/${page}`)
      .then((res) => {
        this.disabled = false
        _archives[page] = res
        this.setArchives(_archives)
      })
    },

    ...mapActions(['setArchives'])
  }
}

</script>

<style lang="postcss">

.archives {
}

</style>