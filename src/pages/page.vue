<template>

<div class="page">
  <h2>{{ post.name }}</h2>
  <div v-html="post.content"></div>
</div>

</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import { clone } from '../utils'

export default {
  name: 'page',

  data() {
    return {
      post: {}
    }
  },

  computed: {
    ...mapGetters(['config', 'page'])
  },

  methods: {
    ...mapActions(['setMessage', 'setPage'])
  },

  created() {
    const {
      page,
      config: {
        pages,
        title
      },
      $route: {
        params: { name }
      }
    } = this

    if (page[name]) {
      return this.post = page[name]
    }

    const currentPage = pages.find(p => p.name == name)

    if (!currentPage) {
      return this.setMessage('No This Page')
    }

    document.title = `${name} - ${title}`

    const { id } = currentPage
    const _page = clone(page)

    this.$load(`/pages/${id}`)
    .then((res) => {
      this.post = res
      _page[name] = res
      this.setPage(_page)
    })
  }
}

</script>

<style lang="postcss">



</style>