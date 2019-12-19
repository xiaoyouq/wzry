import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryLlist.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemLlist.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'
import ArticlesEdit from '../views/articlesEdit.vue'
import ArticlesList from '../views/articlesList.vue'
import AdsEdit from '../views/AdsEdit.vue'
import AdsList from '../views/AdsList.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      // {path:'/',component:CategoryEdit},
      { path: '/CategoryEdit/Create', name: 'CategoryEdit', component: CategoryEdit },
      { path: '/categories/edit/:id', name: 'CategoryEdit', component: CategoryEdit, props: true },
      { path: '/CategoryEdit/List', name: 'CategoryList', component: CategoryList },

      { path: '/ItemEdit/Create', name: 'ItemEdit', component: ItemEdit },
      { path: '/ItemEdit/Create/:id', name: 'ItemEdit', component: ItemEdit, props: true },
      { path: '/ItemEdit/List', name: 'ItemList', component: ItemList },

      
      { path: '/HeroEdit/Create', name: 'HeroEdit', component: HeroEdit },
      { path: '/Heroies/edit/:id', name: 'HeroEdit', component: HeroEdit, props: true },
      { path: '/HeroEdit/List', name: 'HeroList', component: HeroList },

      { path: '/ArticlesEdit/Create', name: 'ArticlesEdit', component: ArticlesEdit },
      { path: '/Articles/edit/:id', name: 'ArticlesEdit', component: ArticlesEdit, props: true },
      { path: '/ArticlesList/List', name: 'ArticlesList', component: ArticlesList },

      { path: '/AdsEdit/Create', name: 'ArticlesEdit', component: AdsEdit },
      { path: '/Ads/edit/:id', name: 'ArticlesEdit', component: AdsEdit, props: true },
      { path: '/AdsList/List', name: 'ArticlesList', component: AdsList },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
