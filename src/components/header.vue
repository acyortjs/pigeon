<template>
  
<div class="header">
  <p>header</p>
</div>

</template>

<script>
  
export default {
  name: 'header',

  data() {
    return {}
  }
}

</script>

<style lang="postcss">
  
.header {
  flex: 1;

  & p {
    color: #333;
  }
}

</style>