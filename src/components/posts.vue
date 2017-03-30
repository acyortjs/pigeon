<template>

<ul class="posts">
  <li v-for="(post, index) in posts">
    <div
      class="feature-image"
      :style="`
        background-image: url(${post.thumb || `https://unsplash.it/240/300/?random=${post.id}&gravity=center`});
        order: ${index % 2 ? 0 : -1};
      `"
      @click="$router.push(`/posts/${post.id}`)"
    ></div>

    <div class="feature-content" :style="`order: ${index % 2 ? -1 : 0}`">
      <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
      <p>
        {{ post.updated | timeFormat }} /
        <span v-if="post.category">{{ post.category.name }}</span>
      </p>
      <div class="summary" v-html="post.summary"></div>
    </div>
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
  padding: 100px 0 0 0;
  margin: 0;

  & li {
    margin-bottom: 30px;
    position: relative;
    background: #f7f7f7;
    padding: 30px;
    display: flex;
  }
}

.feature-image {
  width: 240px;
  height: 300px;
  margin: -80px 20px 10px;
  box-shadow: 0 3px 8px 0 rgba(0,0,0,0.27);
  background-size: cover;
  background-position: center;
  cursor: pointer;
}

.feature-content {
  flex: 1;
  margin: 0 10px;

  & a {
    color: #000;
    font-size: 20px;
    margin: 20px 0 10px 0;
    display: block;
  }

  &> p {
    color: #999;
    font-size: 13px;
  }
}

.summary {
  margin-top: 20px;
  line-height: 1.6;
  font-size: 14px;
  color: #444;

  & img {
    display: none;
  }
}

</style>