<template>
  <div class='app'>
    <b-row>
     <div class="col-md-5">
       <br>
       <h5>Insert scenaries</h5>
       <div class="row">
          <div class="col-md-10">
            <b-form-input id="exampleInput1"
                          type="text" v-model="scenary"
                          placeholder='Please set the scenary'
            ></b-form-input>
          </div>
          <div class="col-md-2">
            <b-button type="submit"  variant="primary" @click='addScnary'>Add</b-button>
          </div>
        </div>
        <label v-if="scenaries.length" style="padding-top: 10px"><b>Scenaries</b></label>
        <ul class="list-group">
          <li class="list-group-item" v-for='s in scenaries'>{{s}}</li>
        </ul>
    </div>
    <div class="col-md-7">
      <br>
        <h5>Insert alternatives</h5>
        <div class="row">
          <div class="col-md-7">
            <b-form-input id="exampleInput1"
                          type="text" v-model="alternative"
                          placeholder='Please set the alternative'>
            </b-form-input>
          </div>
          <div class="col-md-4">
            <b-button type="submit" variant="primary" @click='addAlternatives'>Add</b-button>

            <router-link to="/situation"><b-button type="submit" class="poronga" variant="primary" @click='addSituations'>Save</b-button></router-link>

          </div>
        </div>
        <label v-if="alternatives.length" style="padding-top: 10px"><b>Alternatives</b></label>
        <div class="row">
          <div class="col-md-9">
            <ul class="list-group">
              <li  class="list-group-item" v-for='a in alternatives'>{{a}}</li>
            </ul>
          </div>
        </div>
    </div>
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
