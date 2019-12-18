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
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
