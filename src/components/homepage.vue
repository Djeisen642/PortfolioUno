<template>
  <div v-cloak>
    <img :src="zionUrl" alt="Zion National Park">
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
    }
  }
</script>
