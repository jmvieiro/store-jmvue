<template>
  <v-btn
    small
    outlined
    class="border-yellow text-yellow mb-8 mt-4"
    @click="
      () => {
        this.$router.replace('/store');
      }
    "
  >
    <v-icon>mdi-chevron-left</v-icon>
    <span>Listado de productos</span>
  </v-btn>
</template>

<script>
export default {
  name: "BackToStore",
};
</script>