<template>
  <div>Project</div>
</template>
<script type="text/javascript">
  export default {
    name: 'Projects',
    data: function() {
      return {};
    },
    created: function() {
      this.$store.commit('changeTransparentBGNavbar', false);
    }
  };
</script>
