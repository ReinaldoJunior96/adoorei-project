import {createRouter, createWebHistory} from 'vue-router'
import Home from "./views/Home.vue";
import Categoria from "./views/Categoria.vue";
import Produto from "./views/Produto.vue";


const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/categorias',
        name: 'categoria',
        component: Categoria
    },
    {
        path: '/produto',
        name: 'produto',
        component: Produto
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;