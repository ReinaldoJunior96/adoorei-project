<template>
  <nav class=" shadow relative ">
    <article class="py-5 px-3 tablet:px-0 bg-white ">
      <section class="flex justify-between tablet:justify-center gap-3 items-center  w-full">
        <div class="flex justify-center order-2 items-center gap-14">
          <div class="flex items-center gap-2 ">
            <i class="fa-solid fa-store text-primary fa-2x"></i>
            <h2 class="font-medium bebas-style texto-logo mt-2">Dev Store</h2>
          </div>
          <ul class="itens-menu hidden items-center tablet:flex gap-10 text-secondary font-medium">
            <li class="cursor-pointer" v-for="c in this.categoriasArr" :key="c">{{ c }}</li>
            <li class="hidden tablet:block">
              <div>
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
                  <input type="search"
                         class="search-input block w-full p-2 pl-10 text-sm text-secondary border border-primary rounded-lg bg-white"
                         placeholder="Buscar produto..." required>
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
        <div>
          <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor"
                   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input type="search"
                   class="search-input block w-full p-2 pl-10 text-sm text-secondary border border-primary rounded-lg bg-white"
                   placeholder="Buscar produto..." required>
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
          <a href="">
            {{ c }}
          </a>


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
      categorias: null
    }
  },
  methods: {
    menuMobile() {
      //this.$store.commit('verCarrinho')
      if (this.$store.state.visualizacaoCarrinho) {
        this.$store.commit('verCarrinho')
      }
      $('#sidemenu').slideToggle("fast", function () {

        $(this).animate({}, 500);
      })
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
    }
  },
  mounted() {
    $('#sidemenu').hide()
    const self = this
    axios.get('https://fakestoreapi.com/products/categories')
        .then(function (response) {
          if (self.categorias === null) {
            self.categorias = response.data
          } else {
            self.categorias = self.categorias.concat(response.data)
          }
        })
  },
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
  border-bottom: solid 2px theme('colors.primary');
}


</style>