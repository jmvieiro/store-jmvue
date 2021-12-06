<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="8">
        <h2 class="mb-0 mb-lg-8">{{ title }}</h2>
      </v-col>
      <v-col lg="4">
        <v-btn dark color="primary lighten-1 mt-0 mb-2" @click="showItem(item)">
          {{ toTitle }}
          <v-icon class="ml-2">{{ icon }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-divider class="mt-0 mb-12"></v-divider>
  </v-container>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: {
      type: String,
      default: "",
    },
    toTitle: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    item: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    showItem(id) {
      this.$emit("showItem", id);
    },
  },
};
</script>