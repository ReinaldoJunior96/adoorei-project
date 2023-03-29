<template>
  <navbar></navbar>
  <main class="bg-gray-100 relative ">
    <section class="flex flex-col tablet:flex-row justify-center gap-5 items-center bg-white">
      <div class="flex  order-2 tablet:order-1 flex-col gap-5  ">
        <h1 class="text-[45px] max-w-[300px] leading-10">What is Lorem Ipsum?</h1>
        <p class="max-w-[300px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
      </div>
      <img class="img-sem-fundo ml-0 tablet:-ml-40 w-full phone:w-6/12 tablet:7/12 laptop:w-5/12" src="../assets/images/undraw_Online_shopping_re_k1sv.png" alt="">
    </section>

    <section class="flex justify-center flex-wrap px-5 py-10 gap-5">
      <div v-for="p in this.produtos.slice(0,qtdeListada)" :key="p"
           class="flex flex-col items-center w-[320px] bg-white shadow-2xl rounded-3xl gap-8 relative">
        <div class="flex flex-col h-full p-5 gap-10 ">
          <div class="max-w-md mx-auto">
            <img :src=p.image alt="Imagem"
                 class="w-full sha h-64 object-cover mx-auto block phone:h-32 tablet:h-48 laptop:h-36">
          </div>

          <h2 class="text-center text-md text-gray-600 font-bold leading-6">{{p.title}}</h2>

        </div>
        <p class="font-bold text-lg text-primary ">
          {{p.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL",})}}</p>


        <button @click="AdicionarAoCarrinho(p)" class="bg-primary hover:bg-orange-600 p-2 text-white font-medium w-full">
          Adicionar ao carrinho
        </button>
<!--        <span-->
<!--            class="bg-white absolute w-20 text-primary text-xs font-medium mr-2 px-2.5 py-0.5 rounded  border border-primary">-->
<!--               <i class="fas fa-star s1"></i>-->
<!--                {{p.rating.rate}} / 5-->
<!--          </span>-->
      </div>
    </section>
    <div class="flex justify-center ">
      <button @click="carregarMais"
              class="bg-primary hover:bg-orange-500 text-white font-semibold hover:text-white py-2 px-4 rounded">
        Carregar mais
      </button>
    </div>

  </main>
  <Carrinho v-if="this.$store.state.visualizacaoCarrinho"></Carrinho>
</template>
<script>
import {defineComponent} from "vue";
import Navbar from "../components/NavBar.vue";
import $ from 'jquery'
import axios from "axios";
import Carrinho from "../components/Carrinho.vue";

export default defineComponent({
  components: {Carrinho, Navbar, $},
  data() {
    return {
      produtos: [],
      qtdeListada: 8,
      slickOptions: {
        slidesToShow: 3,
        // Any other options that can be got from plugin documentation
      },
    }
  },
  methods: {
    carregarMais() {
      this.qtdeListada += 4
    },
    AdicionarAoCarrinho(produto){
      this.$store.commit('addAoCarrinho', produto)

    },

  },
  mounted() {
    self = this
    axios.get('https://fakestoreapi.com/products')
        .then(function (response) {
          self.produtos = self.produtos.concat(response.data)
        })
  },
})
</script>

<style scoped>
.img-sem-fundo{
  mix-blend-mode: multiply;
}

</style>