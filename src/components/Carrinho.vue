<template>
  <article id="carrinho" class=" carrinho z-50  w-9/12 phone:w-8/12 tablet:w-1/2 laptop:w-4/12 top-0 right-0 bg-white shadow absolute">

    <div class="flex flex-col gap-5 mx-3 py-3">
      <div class="flex items-center">
        <i @click="this.$store.commit('verCarrinho')"  class="fa-solid fa-x  text-lg pt-3 text-primary flex-1 -mt-2 cursor-pointer"></i>
        <div class="text-center  w-full">
          <h2 class="text-gray-500 font-bold text-lg ">Seu Carrinho</h2>
        </div>

      </div>

      <h2 class="text-primary font-bold text-lg">Valor total: {{ this.$store.getters.calculaTotal }}</h2>
      <hr>
      <div v-if="$store.getters.listarCarrinho.length > 0" class="flex bg-white  p-3 gap-3 border-b border-primary"
           v-for="item in this.$store.getters.listarCarrinho" :key="item">
        <div class="">
          <img width="50" :src=item.image alt="">
        </div>
        <div class="flex flex-col justify-between gap-2">
          <p class="text-sm text-secondary font-light">{{ item.title }}</p>
          <p class=" font-medium text-gray-700 text-sm">Quantidade: {{ item.quantidade }}</p>
          <div class="flex  gap-5 items-center ">
            <div class="">
              <button @click="this.$store.commit('removerItemDoCarrinho', item)"
                      class="bg-primary text-gray-600 px-2  rounded-tl rounded-bl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out transform hover:scale-110">
                <i class="fa-solid fa-minus text-white"></i>
              </button>
              <button @click="this.$store.commit('addAoCarrinho', item)"
                      class="bg-primary text-gray-600 px-2 rounded-tr rounded-br focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out transform hover:scale-110">
                <i class="fa-solid fa-plus text-white"></i>
              </button>
            </div>


            <span @click="this.$store.commit('LimparItemDoCarrinho', item)"
                  class="text-sm cursor-pointer text-gray-700 font-medium">Excluir</span>
          </div>


        </div>


      </div>
      <div v-else class="">
        <p class="text-gray-700-300 font-medium text-sm">Carrinho vazio...</p>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'Carrinho',
}
</script>

<style scoped>
.carrinho {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
}
</style>