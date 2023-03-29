<template>

  <footer class="bg-primary " :class="{
    'brightness-50': this.$store.state.visualizacaoCarrinho,
    }">
    <div class="flex justify-between mx-auto w-full container p-4 sm:p-6 pt-10">
      <div class="md:flex md:justify-between">
        <router-link  to="/">
        <div class="flex items-center gap-2 ">
          <i class="fa-solid fa-store text-white fa-2x"></i>
          <h2 class="font-medium text-white bebas-style texto-logo mt-2">Dev Store</h2>
        </div>
        </router-link>
      </div>
      <a href="https://github.com/reinaldojunior96" class="">
        <i class="fa-brands fa-github text-white fa-2x"></i>
      </a>
    </div>
  </footer>

</template>

<script>
export default {
  props: ['fixed']
}
</script>