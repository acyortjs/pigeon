<template>

<div class="post">
  <div v-if="page.prev">
    <router-link :to="`/posts/${page.prev.id}`">{{ page.prev.title }}</router-link>
  </div>
  <div v-if="page.next">
    <router-link :to="`/posts/${page.next.id}`">{{ page.next.title }}</router-link>
  </div>
  <h2>{{ page.title }}</h2>
  <div v-html="page.content"></div>
</div>

</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { clone } from '../utils'

export default {
  name: 'post',

  computed: {
    page() {
      const {
        post,
        $route: {
          params: { id }
        }
      } = this

      return post[id] || {}
    },

    ...mapGetters(['post'])
  },

  watch: {
    $route() {
      this.getPost()
    }
  },

  created() {
    this.getPost()
  },

  methods: {
    getPost() {
      const {
        $route: {
          params: { id }
        },
        setPost,
        $store: {
          state: { post }
        },
        $load
      } = this

      const _post = clone(post)

      if (!post[id]) {
        $load(`posts/${id}`).then((res) => {
          _post[id] = res
          setPost(_post)
        })
      }
    },

    ...mapActions(['setPost'])
  }
}

</script>

<style lang="postcss">

.post {
}

</style>