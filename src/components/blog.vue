<template>
  <div>Blog</div>
</template>
<script type="text/javascript">
  export default {
    name: 'Blog',
    data: function() {
      return {};
    },
    created: function() {
      this.$store.commit('changeTransparentBGNavbar', false);
    }
  };
</script>
