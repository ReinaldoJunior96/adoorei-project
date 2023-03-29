<template>

  <navbar></navbar>
  <Carrinho v-if="this.$store.state.visualizacaoCarrinho"></Carrinho>
  <div class="bg-white h-full tablet:h-screen" :class="{' brightness-50': this.$store.state.visualizacaoCarrinho }" >
    <section class="flex justify-between px-20 flex-wrap px-5 py-10 gap-5 " >
      <h2 class="text-3xl font-medium bebas-style ">
        {{ this.$route.params.categoria.charAt(0).toUpperCase() + this.$route.params.categoria.slice(1) }}</h2>
      <div class="flex gap-3">
        <button class="bg-primary hover:bg-orange-600 px-5  rounded-lg text-white" @click="sortBy('title')">Nome
          <i
              class="ml-3 fa-solid fa-arrow-up-z-a"></i></button>
        <button class="bg-primary hover:bg-orange-600 px-5 rounded-lg text-white" @click="sortBy('price')">Preço
          <i class="ml-3 fa-solid fa-filter-circle-dollar"></i></button>
        <button class="bg-primary hover:bg-orange-600 px-5 rounded-lg text-white" @click="sortBy('rating')">
          Classificação
          <i
              class="ml-3 fa-solid fa-arrow-up-9-1"></i></button>
      </div>

    </section>
    <hr>
    <section class="flex justify-around flex-wrap px-5 py-10 gap-5 ">
      <div v-if="isLoading">
        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
      <div v-else v-for="p in sortProducts(order.column, order.type)"
           class="flex flex-col items-center w-[320px] bg-white shadow-2xl rounded-3xl gap-8 relative">
        <div class="flex flex-col h-full p-5 gap-2  ">
          <div class="max-w-md mx-auto mb-3">
            <router-link :to="`/produto/${p.id}`">
              <img :src=p.image alt="Imagem"
                   class="w-full h-64 object-cover mx-auto block phone:h-32 tablet:h-48 laptop:h-36">
            </router-link>
          </div>
          <div class="flex flex-col justify-between gap-5 h-full">
            <p class="text-center text-md text-gray-600 font-bold leading-6 montserrat-style">{{ p.title }}</p>
            <p class="text-center text-md text-gray-600 font-bold leading-6 montserrat-style ">
              {{ p.price.toLocaleString("pt-BR", {style: "currency", currency: "BRL",}) }}</p>
            <small class="text-center text-md text-gray-600 font-bold leading-6 montserrat-style ">
              no PIX <span class="text-primary">(10% de desconto)</span>
            </small>
          </div>

        </div>


        <button @click="adicionarAoCarrinho(p)"
                class="bg-primary hover:bg-orange-600 p-2 text-white font-medium w-full montserrat-style">
          Adicionar ao carrinho
        </button>
      </div>

    </section>
  </div>
  <Footer :fixed="true"></Footer>

</template>

<script>
import {defineComponent} from "vue";
import Navbar from "../components/NavBar.vue";
import Footer from "../components/Footer.vue";
import $ from 'jquery'
import axios from "axios";
import Carrinho from "../components/Carrinho.vue";

export default defineComponent({
  components: {Carrinho, Navbar, $, Footer},
  data() {
    return {
      order: {column: 'name', type: 'asc'},
      produtos: [],
      isLoading: true,
    }
  },
  methods: {
    sortBy(column) {
      if (this.order.column === column) {
        this.order.type = this.order.type === 'asc' ? 'desc' : 'asc';
      } else {
        this.order.column = column;
        this.order.type = 'asc';
      }
    },
    sortProducts(column, type) {
      return this.produtos.sort((a, b) => {
        if (column === 'rating') {
          if (type === 'asc') {
            return a.rating.rate > b.rating.rate ? 1 : -1;
          } else {
            return a.rating.rate < b.rating.rate ? 1 : -1;
          }
        } else {
          if (type === 'asc') {
            return a[column] > b[column] ? 1 : -1;
          } else {
            return a[column] < b[column] ? 1 : -1;
          }
        }
      });
    },
    adicionarAoCarrinho(produto) {
      this.$store.commit('addAoCarrinho', produto)
      const toast = document.querySelector('.toast');
      toast.style.display = 'block';
      setTimeout(() => {
        toast.style.display = 'none';
      }, 1500);
    },
  },
  computed: {
    produtosCategoria() {
      const categoria = this.$route.params.categoria;
      this.isLoading = true; // adicionando a variável isLoading

      return axios.get(`https://fakestoreapi.com/products/category/${categoria}`)
          .then(response => {
            this.isLoading = false; // removendo a variável isLoading
            return response.data;
          })
          .catch(error => console.log(error));
    },
  },
  watch: {
    '$route.params.categoria': {
      immediate: true,
      handler(categoria) {
        this.produtosCategoria.then(produtos => {
          this.produtos = produtos;
        });
      },
    },
  },
  mounted() {
    this.produtosCategoria.then(produtos => {
      this.produtos = produtos;
    });

  },
})
</script>