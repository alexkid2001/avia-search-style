<template>
  <div id="app">
    <router-view/>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import Footer from './views/Footer'

  export default {
      name: 'app',
      components: {
          'my-footer': Footer
      },
      // data() {
      //     return {
      //         requestData: '';
      //     }
      // },
      // methods: {
      //
      // }
  }

</script>

<style lang="scss">
  @import '/css/etm-default.css';
  @import './assets/style';


</style>
