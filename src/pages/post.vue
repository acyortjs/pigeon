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

export default {
  name: 'post',

  data() {
    return {
      page: {}
    }
  },

  computed: {
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

      if (post[id]) {
        return this.page = post[id]
      }

      $load(`posts/${id}`).then((res) => {
        this.page = res
        post[res.id] = res
        setPost(post)
      })
    },

    ...mapActions(['setPost'])
  }
}

</script>

<style lang="postcss">

.post {
}

</style>