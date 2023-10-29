import {createRouter, createWebHistory} from 'vue-router'
import Home from "./views/Home.vue";
import Categoria from "./views/Categoria.vue";
import Produto from "./views/Produto.vue";


const routes = [
    {
        path: '/adorei',
        name: 'home',
        component: Home
    },
    {
        path: '/adorei/categorias/:categoria',
        name: 'categoria',
        component: Categoria
    },
    {
        path: '/adorei/produto/:produto',
        name: 'produto',
        component: Produto
    },
    {
        path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./views/NotFound.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    mode: 'history',
    routes: routes
})

export default router;
