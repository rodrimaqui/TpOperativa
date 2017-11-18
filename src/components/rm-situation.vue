<template>
  <div class='app'>
    <div v-if='situation'>
    <table class="table">
      <thead>
        <tr>
          <th>
            Alternatives/Scenaries
          </th>
          <th scope="col" v-for='s in situation.situationsScenaries'>
            {{s}}
          </th>
          <th v-if='columnResult.length'>Result</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='(a,i) in situation.situationsAlternatives'>
          <td>
            {{a}}
          </td>
          <td v-for='(s,j) in situation.situationsScenaries'>
            <b-form-input id="exampleInput1"
                          type="text"
                            v-model='arrayAux[i][j]'
            ></b-form-input>
            <td v-if='columnResult.length'> {{columnResult[i]}}
          </td>
        </tr>
      </tbody>

    </table>

    <b-dropdown id="ddown1" text="Choose the criterion" class="m-md-2">
    <b-dropdown-item @click='getPesimist'>pesimist</b-dropdown-item>
    <b-dropdown-item @click='getOptimist'>Optimist</b-dropdown-item>
    <b-dropdown-item @click='getLaplace'>Laplace</b-dropdown-item>
    <b-dropdown-item @click='changeTheStateOfInputHur'>Hurwicz</b-dropdown-item>
    <b-dropdown-item disabled>Savage</b-dropdown-item>
  </b-dropdown>
        <div v-if='inputHur'>
          <b-form-input  id="alphaId"
                        type="number"
                        v-model='alpha'
                        placeholder= 'Put your criterion'
          ></b-form-input>
        </br>
        <b-button type="submit" :disabled="!control" variant="primary" @click='getHurwicz' >Evaluate</b-button>
      </div>
      <br>
      <label v-if='bestAlternative'>The best alternative it is <b>{{bestAlternative}}</b></label>
  </div>
  <div v-else>
    <label>No situations</label>
  </div>


  </div>
</template>
<script>
  export default{
    name:'rmSituation',
    data(){
      return{
        situation: '',
        arrayAux: [],
        columnResult: [],
        alpha: 0.5,
        inputHur: false,
        bestAlternative:''
      }
    },
    computed:{

        control(){
          return  this.alpha >=0 && this.alpha <= 1;
        }
    },
    methods:{
      getSituation(){
        this.situation = this.$store.getters.getSituationsArray();
      },
      createArrayAux(){
        if(this.situation){
          for(let i = 0; i < this.situation.situationsAlternatives.length; i++){
              this.arrayAux[i] = [];
          }
        }
      },
        convertToInt(){
          for(let i = 0; i < this.situation.situationsScenaries.length; i++){
            for(let j=0; j < this.situation.situationsAlternatives.length; j++){
              this.arrayAux[i][j] = parseInt(this.arrayAux[i][j]);
            }
          }
        },
        getTheMaxValue(value){
          for(let i = 0; i < this.columnResult.length; i++){
            if(value < this.columnResult[i])
            {
              value = this.columnResult[i];
            }
          }
          return value;
        },

        changeTheStateOfInputHur(){
          if(!this.inputHur){
            this.inputHur = true;
          }
          else{
            this.inputHur = false;
          }
        },
        getTheBestOption(value){

          return this.situation.situationsAlternatives[this.columnResult.indexOf(value)];
        },
        getPesimist(){
          this.convertToInt();
          let result;
          this.columnResult = [];
          for(let i = 0;i < this.situation.situationsScenaries.length; i++){
             result = this.arrayAux[i][0];
            for(let j = 0;j < this.situation.situationsAlternatives.length; j++){
              if(this.arrayAux[i][j] < result){
                result =  this.arrayAux[i][j];
              }
            }
            this.columnResult.push(result);
          }
          let pesimist = this.columnResult[0];
          pesimist = this.getTheMaxValue(pesimist);
          console.log(pesimist);
          this.bestAlternative = this.getTheBestOption(pesimist);
          console.log(this.bestAlternative);
        },

        getOptimist(){
          this.convertToInt();
          this.columnResult = [];
          let result;
          for(let i = 0;i < this.situation.situationsScenaries.length; i++){
             result = this.arrayAux[i][0];
            for(let j = 0;j < this.situation.situationsAlternatives.length; j++){
              if(this.arrayAux[i][j] > result){
                result =  this.arrayAux[i][j];
              }
            }
            this.columnResult.push(result);
          }
          let optimist = this.columnResult[0];
          optimist = this.getTheMaxValue(optimist);
          console.log(optimist);
        },
        getLaplace(){
          this.convertToInt();
          this.columnResult = [];
          for(let i = 0; i < this.situation.situationsScenaries.length; i++){
            let cant = 0;
            let sum = 0;
            let ave = 0;
            for(let j = 0; j < this.situation.situationsAlternatives.length; j++){
              sum += this.arrayAux[i][j];
              cant++;
            }
            ave = sum/cant;
            this.columnResult.push(ave);
          }
          let laplace = this.columnResult[0];
          laplace = this.getTheMaxValue(laplace);
          console.log(laplace);
        },
        getHurwicz(){
          this.convertToInt();
          this.changeTheStateOfInputHur();
          this.alpha = parseFloat(this.alpha);
          let result;
          this.columnResult = [];

          for(let i = 0; i < this.situation.situationsScenaries.length; i++){
            let bigger = this.arrayAux[i][0];
            let smaller = this.arrayAux[i][0];

            for(let j = 0; j < this.situation.situationsAlternatives.length; j++){
              if(bigger < this.arrayAux[i][j]){
                bigger = this.arrayAux[i][j];
              }
            }
            for(let j = 0; j < this.situation.situationsAlternatives.length; j++){
                if(smaller > this.arrayAux[i][j]){
                  smaller = this.arrayAux[i][j];
                }
            }

            result = (bigger * (this.alpha) + (1 - this.alpha) * smaller);
            this.columnResult.push(result);
          }
          let hurwicz = this.columnResult[0];
          hurwicz = this.getTheMaxValue(hurwicz);
          console.log(hurwicz);
        }

    },
    mounted(){
      this.getSituation();
      this.createArrayAux();
    }
  }
</script>
<style>


</style>
