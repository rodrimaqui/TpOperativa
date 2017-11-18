import VueRouter from 'vue-router';

import rmAdd from '../components/rm-add.vue';
import rmSituation from '../components/rm-situation.vue';
/*import rmSchedule from '../components/rm-schedule.vue';
import rmResults from '../components/rm-results.vue';
import rmDetailResult from '../components/rm-detailResult.vue';
import rmAllNews from '../components/rm-allNews.vue';
import rmOneNews from '../components/rm-oneNews.vue';
import rmCategoryNews from '../components/rm-categoryNews.vue';*/

export default new VueRouter({
  routes: [

    {path: '/add', component: rmAdd},
    {path: '/', component: rmAdd},
    {path: '/situation', component: rmSituation}
    /*{path: '/results', component: rmResults},
    {path: '/results/:season/:stage/:position', component: rmDetailResult},
    {path: '/:name/:id', component: rmOneNews}*/
	]
});
