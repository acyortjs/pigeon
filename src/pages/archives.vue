<template>
<div>

<div class="top">
  <p>{{ config.posts.length }} posts in total</p>
  <h1>Archives</h1>
</div>

<div class="archives content">
  <ul>
    <li v-for="post in items">
      <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
      <span>{{ post.updated | timeFormat }}</span>
    </li>
  </ul>

  <div class="nav">
    <button
      @click="$router.push(page == 2 ? '/archives' : `/archives/${page - 1}`)"
      :disabled="page <= 1 || disabled"
    >Previous</button>
    <button
      @click="$router.push(`/archives/${page + 1}`)"
      :disabled="page >= total || disabled"
    >Next</button>
    <span>{{ page }} / {{ total }}</span>
  </div>
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

@import "../components/nav.css";

.archives {
  & h2 {
    color: #000;
    font-size: 24px;
  }

  & ul {
    margin-top: 40px;
    padding: 0;
  }

  & li {
    margin-bottom: 24px;
    font-size: 16px;
    line-height: 1.4;
  }

  & a {
    color: #333;

    &:hover {
      text-decoration: underline;
    }
  }

  & span {
    float: right;
    color: #666;
  }
}

@media screen and (max-width: 600px) {
  .archives {
    & li > span {
      display: block;
      margin-top: 10px;
      float: none;
      font-size: 13px;
    }
  }
}

</style>