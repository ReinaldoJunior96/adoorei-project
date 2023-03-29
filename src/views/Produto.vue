<template>
  <navbar></navbar>
  <Carrinho v-if="this.$store.state.visualizacaoCarrinho"></Carrinho>
  <main class=" relative h-full tablet:h-screen bg-white mb-5  " :class="{' brightness-50': this.$store.state.visualizacaoCarrinho }">


    <section class="flex pt-10  justify-center ">
      <div v-if="carregando" >
        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>

      </div>
      <div v-else v-for="p in produtoSelecionado" :key="p.id" class=" flex flex-col tablet:flex-row items-center gap-24 w-3/4 tablet:w-7/12">
        <div class="">
          <img :src=p.image alt="Imagem"
               class="w-full h-auto mx-auto block  ">
        </div>
        <div class="flex flex-col gap-5 ">
          <small class="text-primary text-sm font-light">Dev Store Company</small>
          <h2 class="text-start text-xl text-gray-600 font-bold leading-6 montserrat-style">{{ p.title }}</h2>
          <p class="text-start text-sm text-gray-700 font-bold leading-6 montserrat-style">{{p.description}}</p>
          <p class="font-medium text-xl text-primary ">
            {{ p.price.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) }}</p>
          <div class="flex  gap-5 items-center pb-10 ">
            <button @click="adicionarAoCarrinho(p)"
                    class="bg-primary hover:bg-orange-600 p-2 text-white font-medium w-8/12 rounded-lg">
              Adicionar ao carrinho
            </button>
          </div>

        </div>
      </div>
    </section>
    <div class="hidden toast bg-green-500 text-white py-3 px-4 rounded fixed bottom-10 right-0">
      <span class="font-bold">Sucesso!</span> Produto adicionado ao carrinho.
    </div>
  </main>
  <Footer :fixed="true" class=""></Footer>
</template>

<script>
import { defineComponent } from "vue";
import Navbar from "../components/NavBar.vue";
import axios from "axios";
import Carrinho from "../components/Carrinho.vue";
import Footer from "../components/Footer.vue";

export default defineComponent({
  components: { Carrinho, Navbar, Footer },
  data(){
    return{
      produtoSelecionado: [],
        carregando: true
    }
  },
  computed: {
    produto() {
      const produtoId = this.$route.params.produto;
      this.carregando = true; // define que a requisição está em andamento
      return axios
          .get(`https://fakestoreapi.com/products/${produtoId}`)
          .then(response => {
            this.carregando = false; // define que a requisição terminou
            return response.data;
          })
          .catch((error) => console.log(error));
    },
  },
  methods: {
    adicionarAoCarrinho(produto) {
      this.$store.commit("addAoCarrinho", produto);
      const toast = document.querySelector('.toast');
      toast.style.display = 'block';
      setTimeout(() => {
        toast.style.display = 'none';
      }, 1500);
    },
  },
  watch: {
    "$route.params.produto": {
      immediate: true,
      handler(produto) {
        this.produto.then(p => {
          this.produtoSelecionado = [p];
        });
      },
    },
  },
});
</script>