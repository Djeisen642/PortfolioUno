<template>
  <div class="uk-container-expand">
    <div class="uk-card uk-card-default uk-card-body uk-position-center">
      <h3 class="uk-card-title">Contact Info</h3>
      <div>
        <!-- TODO: change this email to be a contact form -->
        <p>Email: <a href="mailto:jasonssuttles@gmail.com" target="_blank">jasonssuttles@gmail.com</a></p>
        <p>Twitter: <a href="https://twitter.com/JSSuttles" target="_blank">@JSSuttles</a></p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/jssuttles" target="_blank">www.linkedin.com/in/jssuttles</a></p>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'Contact',
    data: function() {
      return {};
    },
    created: function() {
      this.$store.commit('changeTransparentBGNavbar', false);
    }
  };
</script>
