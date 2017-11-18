<template>
    <div class="app">
      <b-container fluid>
          <rm-TopMenu></rm-TopMenu>
    </b-container>
    <b-container class="bv-example-row">

    	<router-view></router-view>

  </b-container>
    </div>
</template>
<script>
    import rmTopMenu from './rm-topMenu.vue';

    export default {
      name: 'app',
      data() {
        return{

        }
      },
      components: {
        rmTopMenu
      },
      mounted(){

      }
    }
</script>

<style>
.app{
  background-color: #B0E0E6;
}
</style>
