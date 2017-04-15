<template>
  <div>
    <img :src="zionUrl" alt="Zion National Park" class="half-page-image">
    <div>Hello</div>
  </div>
</template>
<script type="text/javascript">
  import zionUrl from 'images/Zion.jpg';
  export default {
    name: 'HomePage',
    data: function() {
      return {
        zionUrl
      }
    },
    created: function() {
      this.$store.commit('changeTransparentBGNavbar', true);
    }
  };
</script>
