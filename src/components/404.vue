<template>
  <h1>Page not found</h1>
</template>
<script type="text/javascript">
  export default {
    name: 'NotFoundPage',
    data: function() {
      return {};
    },
    created: function() {
      this.$store.commit('changeTransparentBGNavbar', false);
    }
  };
</script>
