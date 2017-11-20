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
            {{a}} <!-- va renderizando las filas, aqui las alternativas (primer columna) -->
          </td>
          <td v-for='(s,j) in situation.situationsScenaries'> <!-- va renderizando el resto de la fila -->
            <b-form-input id="exampleInput1"
                          type="text"
                            v-model='arrayAux[i][j]' 
            ></b-form-input>                                      <!-- i = fila, j = columna -->
            <td v-if='columnResult.length'> {{columnResult[i]}}
          </td>
        </tr>
      </tbody>

    </table>

    <b-dropdown id="ddown1" text="Choose the criterion" class="m-md-2">
    <b-dropdown-item @click='getPesimist'>Pesimist</b-dropdown-item>
    <b-dropdown-item @click='getOptimist'>Optimist</b-dropdown-item>
    <b-dropdown-item @click='getLaplace'>Laplace</b-dropdown-item>
    <b-dropdown-item @click='changeTheStateOfInputHur'>Hurwicz</b-dropdown-item>
    <b-dropdown-item @click='getSavage'>Savage</b-dropdown-item>
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
        arrayAux: [], //array cargado con arrays vacios por cada alternativa que hay
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
        getSavage(){
          this.convertToInt(); //j = fila, i = columna
          let result;
          let greater_of_columns = []; //aca almaceno el mayor de cada columna
          this.columnResult = [];

          //primer paso, obtengo el mayor de cada columna
          for(let i = 0; i < this.situation.situationsScenaries.length; i++){
            result = this.arrayAux[0][i];

            for(let j = 0; j < this.situation.situationsAlternatives.length; j++){
              if(this.arrayAux[j][i] > result){
                result =  this.arrayAux[j][i];
              }
            }
            greater_of_columns.push(result);
          }

          //segundo paso, le resto el a cada elemento el mayor de cada columna jajaja
          let arrayAux_savage = this.arrayAux;
          for(let i = 0; i < this.situation.situationsScenaries.length; i++)
          {
            for(let j = 0; j < this.situation.situationsAlternatives.length; j++)
            {
              arrayAux_savage[j][i] = greater_of_columns[i] - arrayAux_savage[j][i];
            }
          }

          //tercer paso, recorro para obtener el mayor de cada fila aj jaj ajj ajajaj
          let greater_of_rows = [];
          for(let i = 0; i < this.situation.situationsScenaries.length; i++){
            result = 0;

            for(let j = 0; j < this.situation.situationsAlternatives.length; j++)
            {
              if(arrayAux_savage[i][j] > result){
                result = arrayAux_savage[i][j];
              }
            }
            greater_of_rows.push(result);
          }
          this.columnResult = greater_of_rows;

          //por ultimo, selecciono el menor del mayor de cada fila
          let no_doy_mas = greater_of_rows[0]; //numero de fila

          for (let i = 0; greater_of_rows.length > i; i++) {
            if(greater_of_rows[i] < no_doy_mas) {
              no_doy_mas = greater_of_rows[i];
            }
          }
          console.log(no_doy_mas);
          this.bestAlternative = this.getTheBestOption(no_doy_mas);
        },
        getPesimist(){
          this.convertToInt(); //j = fila, i = columna
          let result;
          this.columnResult = [];
          for(let i = 0; i < this.situation.situationsScenaries.length; i++){
            result = this.arrayAux[i][0];

            for(let j = 0; j < this.situation.situationsAlternatives.length; j++){
              if(this.arrayAux[i][j] < result){
                result =  this.arrayAux[i][j];
              }
            }
            this.columnResult.push(result);
          }
          let pesimist = this.columnResult[0];
          pesimist = this.getTheMaxValue(pesimist);
          //console.log(pesimist);
          this.bestAlternative = this.getTheBestOption(pesimist);
          //console.log(this.bestAlternative);
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
          //console.log(optimist);
          this.bestAlternative = this.getTheBestOption(optimist);
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
          //console.log(laplace);
          this.bestAlternative = this.getTheBestOption(laplace);
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
          //console.log(hurwicz);
          this.bestAlternative = this.getTheBestOption(hurwicz);
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
