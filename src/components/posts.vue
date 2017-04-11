<template>

<ul class="posts">
  <li v-for="post in posts">
    <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
    <div class="summary" v-html="post.summary"></div>
    <p>
      {{ post.updated | timeFormat }} /
      <span v-if="post.category">{{ post.category.name }}</span>
    </p>
  </li>
</ul>

</template>

<script>

export default {
  name: 'posts',
  props: ['posts']
}

</script>

<style lang="postcss">

.posts {
  margin: 0;
  padding: 0;

  & li {
    margin-bottom: 30px;
    position: relative;
    padding: 30px 0 60px;
    border-bottom: 1px solid #f5f5f5;

    & > a {
      color: #333;
      font-size: 30px;
    }

    & > p {
      color: #999;
      font-size: 13px;
      margin-top: 20px;
    }
  }
}

.summary {
  margin-top: 20px;
  line-height: 1.8;
  font-size: 14px;
  color: #666;

  & img {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .posts li {
    margin-bottom: 15px;
    padding: 15px 0 30px;

    & > a {
      font-size: 24px;
    }
  }
}

</style>