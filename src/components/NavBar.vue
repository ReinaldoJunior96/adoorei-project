<template>
  <nav class=" shadow z-10 relative relative ">
    <article class="py-5 px-3 tablet:px-0 bg-white " :class="{' brightness-50': this.$store.state.visualizacaoCarrinho }">
      <section class="flex justify-between tablet:justify-center gap-3 items-center  w-full">
        <div class="flex justify-center order-2 items-center gap-14">
          <router-link  to="/">
            <div class="flex items-center gap-2 ">

              <i class="fa-solid fa-store text-primary fa-2x"></i>
              <h2 class="font-medium bebas-style texto-logo text-gray-600 mt-2">Dev Store</h2>


            </div>
          </router-link>
          <ul class="itens-menu hidden items-center tablet:flex gap-10 text-secondary font-medium">
            <li class="cursor-pointer text-gray-600" v-for="c in this.categoriasArr" :key="c">
              <router-link :to="`/categorias/${c}`">{{ c }}</router-link>
            </li>
            <li class="hidden tablet:block">
              <div class="relative">
                <label for="search"
                       class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                         stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                  <input type="search" v-model="inputBusca"
                         class="search-input block w-full p-2 pl-10 text-sm text-secondary border border-primary rounded-lg bg-white"
                         placeholder="Buscar produto..." required>
                </div>
                <div v-if="this.inputBusca !== '' " class="absolute top-10 bg-white w-full shadow-2xl"
                     style="z-index: 999">
                  <ul class="flex flex-col gap-2  pt-3 ">

                    <li class="border-b border-primary px-3 cursor-pointer hover:bg-primary hover:text-white"
                        v-for="search in this.buscarProdutos">
                      <router-link :to="`/produto/${search.id}`">
                        {{ search.title }}
                      </router-link>
                    </li>


                  </ul>

                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class=" order-1 ">
          <i @click="menuMobile()" class="block tablet:hidden fa-solid fa-bars text-primary text-lg"></i>
        </div>
        <div class="order-3 ml-3">
          <i @click="verCarrinho()" class="fa-solid fa-cart-shopping text-primary text-lg cursor-pointer"></i>
        </div>
      </section>
      <section class="block tablet:hidden w-full ">
        <div class="relative">
          <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor"
                   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input type="search" v-model="inputBusca"
                   class="search-input block w-full p-2 pl-10 text-sm text-secondary border border-primary rounded-lg bg-white"
                   placeholder="Buscar produto..." required>
          </div>
          <div v-if="this.inputBusca !== '' " class="absolute top-10 bg-white w-full shadow-2xl"
               style="z-index: 999">
            <ul class="flex flex-col gap-2  pt-3 ">

              <li class="border-b border-primary px-3 cursor-pointer hover:bg-primary hover:text-white"
                  v-for="search in this.buscarProdutos">
                <router-link :to="`/produto/${search.id}`">
                  {{ search.title }}
                </router-link>
              </li>


            </ul>

          </div>
        </div>
      </section>
    </article>
    <aside id="sidemenu" class="sidemenu h-screen w-9/12 top-0 left-0 bg-primary fixed shadow fixed z-50">
      <div class="absolute -right-[10%]">
        <i @click="menuMobile" class="fa-solid fa-x text-lg pt-3 text-secondary"></i>
      </div>
      <ul class="flex flex-col gap-3 px-5 text-white">
        <li class="bebas-style  text-xl  flex gap-3 items-center pt-10">
          <i class="fa-solid fa-user"></i> Olá, visitante!
        </li>
        <li class="font-medium border-b text-lg" v-for="c in this.categorias" :key="c">
          <router-link :to="`/categorias/${c}`">
            {{ c }}
          </router-link>


        </li>
      </ul>
    </aside>
  </nav>
</template>


<script>
import axios from 'axios'
import $ from 'jquery'

export default {
  name: 'navbar',
  data() {
    return {
      categorias: null,
      inputBusca: '',
    }
  },
  methods: {
    menuMobile() {
      const isCarrinhoVisible = this.$store.state.visualizacaoCarrinho;
      const sideMenu = $('#sidemenu');

      if (isCarrinhoVisible) {
        this.$store.commit('verCarrinho');
      }

      sideMenu.slideToggle("fast", function () {
        $(this).animate({}, 500);
      });
    },
    verCarrinho() {
      const sideMenu = $('#sidemenu')
      if (sideMenu.is(':visible')) {
        sideMenu.hide()
      }
      this.$store.commit('verCarrinho')
    }
  },
  computed: {
    categoriasArr() {
      return this.categorias
    },
    buscarProdutos() {
      const termosBusca = this.inputBusca.toLowerCase().split(' ');
      if (termosBusca.length === 0 || termosBusca[0] === '') {
        return this.$store.state.produtos;
      }

      return this.$store.state.produtos.filter((produto) => {
        const tituloProduto = produto.title.toLowerCase();
        return termosBusca.every(termo => tituloProduto.includes(termo));
      });
    },
  },
  mounted: async function () {
    $('#sidemenu').hide()
    try {
      const response = await axios.get('https://fakestoreapi.com/products/categories')
      this.categorias = this.categorias || response.data
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped>
.texto-logo {
  font-size: 25px;
}

.search-input {
  outline: none;
}

.itens-menu > li:hover:not(:last-child) {
  border-bottom: solid 4px theme('colors.primary');
}


</style>