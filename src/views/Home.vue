<template>
  <navbar></navbar>
  <Carrinho v-if="this.$store.state.visualizacaoCarrinho"></Carrinho>
  <main class="bg-gray-100 relative " :class="{' brightness-50': this.$store.state.visualizacaoCarrinho }">
    <section class="flex flex-col tablet:flex-row justify-center gap-5 items-center bg-white">
      <div class="flex  order-2 tablet:order-1 flex-col gap-5 -mt-5  ">
        <h1 class="text-[45px] max-w-[300px] text-primary font-medium bebas-style leading-10">What is Lorem Ipsum?</h1>
        <p class="max-w-[300px] montserrat-style">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
      </div>
      <img class="img-sem-fundo ml-0 tablet:-ml-40 w-full phone:w-6/12 tablet:7/12 laptop:w-4/12"
           src="../assets/images/undraw_Online_shopping_re_k1sv.png" alt="">
    </section>

    <section class="flex justify-center flex-wrap px-5 py-10 gap-5">
      <div v-if="this.carregando" class="">
        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
      <div v-else v-for="p in this.produtos.slice(0,qtdeListada)" :key="p" class="flex flex-col items-center w-[320px] bg-white shadow-2xl rounded-3xl relative">
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

    <div v-if="this.qtdeListada < this.produtos.length" class="flex justify-center pb-10 ">
      <button @click="carregarMais"
              class="bg-primary hover:bg-orange-500 text-white font-semibold hover:text-white py-2 px-4 rounded">
        Carregar mais
      </button>
    </div>
    <div class="hidden toast bg-green-500 text-white py-3 px-4 rounded fixed bottom-10 right-0">
      <span class="font-bold">Sucesso!</span> Produto adicionado ao carrinho.
    </div>
  </main>
  <Footer ></Footer>

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
      produtos: [],
      qtdeListada: 8,
      carregando: true // adiciona uma variável para controlar o estado de carregamento
    }
  },
  methods: {
    carregarMais() {
      this.qtdeListada += 4
      console.log(this.$store.state.produtos)
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
  mounted() {
    const self = this
    axios.get('https://fakestoreapi.com/products')
        .then(function (response) {
          self.produtos = self.produtos.concat(response.data)
          self.$store.commit('guardarProdutos', response.data)
          self.carregando = false; // define que a requisição terminou
        })
        .catch((error) => {
          console.log(error);
          self.carregando = false; // trata erros e define que a requisição terminou
        })
  },
})

</script>

<style scoped>
.img-sem-fundo {
  mix-blend-mode: multiply;
}

</style>