<template>
  
<div class="post">
  <h2>{{ page.title }}</h2>
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

  created() {
    const { $load, $route: { params: { id } }, setPost, $store: { state: { post } } } = this

    if (post[id]) {
      return this.page = post[id]
    }

    $load({ url: `posts/${id}` })
    .then((res) => {
      this.page = res
      post[res.id] = res
      setPost(post)
    })
  },

  methods: {
    ...mapActions(['setPost'])
  }
}

</script>

<style lang="postcss">
  
.post {
}

</style>