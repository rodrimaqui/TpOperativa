<template>
  <div class='app'>
    <div v-if='situation'>
      <table class="table">
        <thead>
          <tr>
            <th>
              Alternatives / Scenaries
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
              <b>{{a}}</b> <!-- va renderizando las filas, aqui las alternativas (primer columna) -->
            </td>
            <td v-for='(s,j) in situation.situationsScenaries'> <!-- va renderizando el resto de la fila -->
              <b-form-input id="exampleInput1"
                            type="text"
                              v-model='arrayAux[i][j]'
              ></b-form-input>                                      <!-- i = fila, j = columna -->
              <td v-if='columnResult.length'> {{columnResult[i]}} </td>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="row">
        <div class="col-md-2">
          <div class="row">
            <b-dropdown id="ddown1" text="Choose criterion" class="m-md-2">
            <b-dropdown-item @click='getPesimist'>Pesimist</b-dropdown-item>
            <b-dropdown-item @click='getOptimist'>Optimist</b-dropdown-item>
            <b-dropdown-item @click='getLaplace'>Laplace</b-dropdown-item>
            <b-dropdown-item @click='changeTheStateOfInputHur'>Hurwicz</b-dropdown-item>
            <b-dropdown-item @click='getSavage'>Savage</b-dropdown-item></b-dropdown>
          </div>
        </div>
        <div class="col-md-8">

              <div v-if='inputHur'>
                <div class="row">
                  <div class="col-md-3">
                    <b-form-input  id="alphaId"
                                    type="number"
                                    v-model='alpha'
                                    placeholder= 'Put your criterion'>
                    </b-form-input>
                    </br>
                  </div>
                  <div class="col-md-3">
                    <b-button type="submit" :disabled="!control" variant="primary" @click='getHurwicz'>
                      Evaluate
                    </b-button>
                  </div>
                </div>
              </div>

          <br>
          <h3 v-if='bestAlternative'><b>{{bestAlternative}}</b> is the best alternative.</h3>
        </div>
      </div>
    </div>

    <div v-else>
      <h3 class="text-center" style="padding-top: 30px">No situations to display.</h3>
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
              this.arrayAux[j][i] = parseInt(this.arrayAux[j][i]);
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
        newArray(aux){
    				let copy = [];
    				for (let i=0;i<aux;i++) {
    					copy[i] = [];
    				    copy[i].push(...this.arrayAux[i]);
    				  }
    				return copy;

    		},
        getSavage() {
				this.convertToInt();
				 this.columnResult = [];

				let newArrayCopy = this.newArray(this.situation.situationsAlternatives.length);

        for(let i=0;i<this.situation.situationsScenaries.length;i++){
					let bigger = this.arrayAux[0][i];
					for(let j = 0;j < this.situation.situationsAlternatives.length;j++){
						if(this.arrayAux[j][i] > bigger){
							bigger = this.arrayAux[j][i];
						}
					}
					for(let j=0;j<this.situation.situationsAlternatives.length;j++){
						newArrayCopy[j][i] = bigger - newArrayCopy[j][i];
					}
				}
				for(let i=0;i<this.situation.situationsAlternatives.length;i++){
					let result = newArrayCopy[i][0];
					for(let j=0;j<this.situation.situationsScenaries.length;j++){
						if(newArrayCopy[i][j]>result){
							result = newArrayCopy[i][j];
						}
					}

					this.columnResult.push(result);
				}

				let result = this.columnResult[0];
				for(let i=0;i<this.columnResult.length;i++){
					if(this.columnResult[i]<result){
						result = this.columnResult[i];
					}
				}

          this.bestAlternative = this.getTheBestOption(result);

			},

        getPesimist(){
          this.convertToInt(); //j = fila, i = columna
          let result;
          this.columnResult = [];

          for(let i = 0; i < this.situation.situationsAlternatives.length; i++){
            result = this.arrayAux[i][0];

            for(let j = 0; j < this.situation.situationsScenaries.length; j++){
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
          for(let i = 0;i < this.situation.situationsAlternatives.length; i++){
             result = this.arrayAux[i][0];
            for(let j = 0;j < this.situation.situationsScenaries.length; j++){
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
          for(let i = 0; i < this.situation.situationsAlternatives.length; i++){
            let cant = 0;
            let sum = 0;
            let ave = 0;
            for(let j = 0; j < this.situation.situationsScenaries.length; j++){
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

          for(let i = 0; i < this.situation.situationsAlternatives.length; i++){
            let bigger = this.arrayAux[i][0];
            let smaller = this.arrayAux[i][0];

            for(let j = 0; j < this.situation.situationsScenaries.length; j++){
              if(bigger < this.arrayAux[i][j]){
                bigger = this.arrayAux[i][j];
              }
            }
            for(let j = 0; j < this.situation.situationsScenaries.length; j++){
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
