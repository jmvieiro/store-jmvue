<template>
  <v-btn
    small
    outlined
    class="border-yellow text-yellow mb-8 mt-4"
    @click="
      () => {
        this.$router.replace(dest);
      }
    "
  >
    <v-icon>mdi-chevron-left</v-icon>
    <span>{{ text }}</span>
  </v-btn>
</template>

<script>
export default {
  name: "BackTo",
  props: {
    dest: {
      type: String,
      default: "/store",
    },
    text: {
      type: String,
      default: "Listado de productos",
    },
  },
};
</script>