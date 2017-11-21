
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

    state:{

      situationsArray:''
    },
    getters:{
      getSituationsArray: (state,getters) => () => {
        return state.situationsArray;
      },

      getId:(state,getters) => {
        if(!state.situationsArray.length){
          return 0;
        }
        else{
          return state.situationsArray.length;
        }
      }
    },

    mutations:{
      addSituations(state,alternatives){
        state.situationsArray = alternatives;
      }
    }
});
