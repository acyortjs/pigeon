<template>

<div class="post">
  <div class="top">
    <p>
      <template v-if="page.category">
        <router-link :to="`/categories/${page.category.id}`">{{ page.category.name }}</router-link>
      </template>
      / {{ page.updated | timeFormat }}
    </p>
    <h2>{{ page.title }}</h2>
    <div v-if="page.author" class="author">
      <p>{{ page.author.name }}</p>
      <img :src="page.author.avatar" />
    </div>
  </div>

  <div class="content markdown-body" v-html="page.content"></div>

  <div v-if="page.tags" class="post-tags content">
    <router-link
      v-for="tag in page.tags"
      :key="tag.id"
      :to="`/tags/${tag.id}`"
    >{{ tag.name }}</router-link>
  </div>
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

    ...mapGetters(['post', 'config'])
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
        config: { title },
        post
      } = this

      const _post = clone(post)

      if (post[id]) {
        return document.title = `${post[id].title} = ${title}`
      }

      this.$load(`posts/${id}`)
      .then((res) => {
        _post[id] = res
        this.setPost(_post)
        document.title = `${res.title} - ${title}`
      })
    },

    ...mapActions(['setPost'])
  }
}

</script>

<style lang="postcss">

@import "../components/content.css";
@import "../components/code.css";

.top {
  text-align: center;
  background: #f5f8fa;
  padding-top: 120px;
  color: #000;

  &> p {
    color: #a8a8a8;
    font-size: 12px;
    margin-bottom: 10px;
    letter-spacing: 2px;
  }

  & a {
    color: inherit;

    &:hover {
      color: #000;
    }
  }

  & h2 {
    font-size: 30px;
  }

  & h1 {
    font-size: 30px;
    padding-bottom: 120px;
  }
}
.author {
  margin-top: 70px;

  & p {
    font-size: 12px;
  }

  & img {
    display: inline-block;
    margin: 10px 0 -40px 0;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 2px solid #fff;
  }
}
.post-tags {
  margin: 40px auto 0;

  & a {
    color: #666;
    display: inline-block;
    margin: 5px 14px 5px 0;
    font-size: 13px;
    text-decoration: underline;

    &:hover {
      color: #333;
    }
  }
}

</style>