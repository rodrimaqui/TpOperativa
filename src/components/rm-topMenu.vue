<template>
  <div>
    <header>
     <b-navbar toggleable type="light" variant="secondary">
     <b-nav-toggle target="nav_text_collapse"></b-nav-toggle>
     <router-link to="/"><b-navbar-brand><b>ｄｅｃｉｓｉｏｎｓ ｔｏｏｌ</b></b-navbar-brand></router-link>
     <b-collapse  is-nav id="nav_text_collapse">
       <b-nav is-nav-bar>
          <router-link to="/add"><a class="nav-link culo" href="#"><b>Create matrix</b></a></router-link>
       </b-nav>
       <b-nav is-nav-bar>
          <router-link to="/situation"><a class="nav-link culo" href="#"><b>Situation</b></a></router-link>
       </b-nav>


    </b-collapse>
    </b-navbar>
    </header>
  </div>
</template>
<script>
    export default {
      name: 'rmTopMenu',
      data(){
        return{

        }
      }
    }
</script>
<style>

</style>
