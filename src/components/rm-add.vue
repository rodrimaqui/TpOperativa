<template>
  <div class='app'>
    <b-row>
     <b-col>
       <br>
        <b-form-input id="exampleInput1"
                      type="text" v-model="scenary"
                      placeholder='Please set the scenary'
        ></b-form-input>
        <br>
        <b-button type="submit"  variant="primary" @click='addScnary' >Search</b-button>
        <br>
        <label><b>Scenaries</b></label>
        <ul class="list-group">
          <li class="list-group-item" v-for='s in scenaries'>{{s}}</li>
        </ul>
    </b-col>
    <b-col>
      <br>
        <b-form-input id="exampleInput1"
                      type="text" v-model="alternative"
                      placeholder='Please set the alternative'
        ></b-form-input>
        <br>
        <b-button type="submit" variant="primary" @click='addAlternatives' >Search</b-button>
        <br>
        <label><b>Alternatives</b></label>
        <ul class="list-group">
          <li  class="list-group-item" v-for='a in alternatives'>{{a}}</li>
        </ul>
    </b-col>
    </b-row>
    <b-row>
      <b-col>
        <router-link to="/situation"><b-button type="submit"  variant="primary" @click='addSituations' >Save</b-button></router-link>
      </b-col>
    </b-row>
  </div>
</template>
<script>
  export default{
    name: 'rmAdd',
    data(){
      return{
        alternatives:[],
        scenaries:[],
        scenary:'',
        alternative:'',

        situations:{
          situationsScenaries:[],
          situationsAlternatives:[],
          id:''
        }
      }
    },
    methods:{
      addAlternatives(){
        this.alternatives.push(this.alternative);
        this.alternative = '';
      },
      addScnary(){
        this.scenaries.push(this.scenary);
        this.scenary = '';
      },

      addSituations(){
        this.situations.situationsAlternatives = this.alternatives;
        this.situations.situationsScenaries = this.scenaries;
        this.situations.id = this.$store.getters.getId;
        this.$store.commit('addSituations',this.situations);
      }
    }
  }
</script>
<style>

</style>
