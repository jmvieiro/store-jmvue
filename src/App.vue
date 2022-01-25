<template>
  <v-app>
    <Appbar />
    <v-main class="black">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import Appbar from "./components/Appbar";
import Toast from "vue2-toast";
import "vue2-toast/lib/toast.css";

Vue.filter("capitalize", (value) => {
  if (!value) return "";
  return value.toUpperCase();
});

Vue.filter("money", (value) => {
  if (!value) return 0;
  return `$${value.toFixed(2)}`;
});

Vue.use(Toast, {
  defaultType: "bottom",
  duration: 4000,
  wordWrap: false,
  width: "auto",
});

export default {
  name: "App",
  components: {
    Appbar,
  },
};
</script>

<style lang="scss">
a {
  font-weight: bold !important;
  color: #d4e069 !important;
  text-decoration: none !important;
}

.border-main {
  border: 1px solid #d4e069 !important;
  border-radius: 3px !important;
}
.v-card__subtitle,
.v-card__title {
  color: #d4e069 !important;
  text-transform: uppercase;
}
.border-yellow {
  border: 1px solid #d4e069 !important;
}
.text-yellow,
.v-label,
input {
  color: #d4e069 !important;
}
input {
  border-bottom: 1px solid #d4e069 !important;
  margin-bottom: 10px;
}
.v-data-table__wrapper > table > thead > tr > th {
  color: hsl(66, 66%, 65%) !important;
  font-size: 16px !important;
}

.lx-toast {
  font-family: "Roboto", sans-serif !important;
  font-size: 16px;
  font-weight: 600;
  color: #d4e069;
  background: rgb(21, 48, 26);
  border: 1px solid #d4e069 !important;
}
</style>
