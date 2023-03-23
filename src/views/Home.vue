<template>
  <navbar></navbar>
  <h1>pagina home</h1>
</template>
<script>

import {defineComponent} from "vue";
import Navbar from "../components/NavBar.vue";

export default defineComponent({
  components: {Navbar}
})
</script>