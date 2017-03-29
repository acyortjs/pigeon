<template>

<ul class="posts">
  <li v-for="post in posts">
    <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
    <p>{{ post.updated | timeFormat }}</p>
    <img :src="post.thumb || `https://unsplash.it/200/300/?random=${post.id}&gravity=center`" />
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
}

</style>