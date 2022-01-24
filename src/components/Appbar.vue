<template>
  <div>
    <v-app-bar app class="px-4 px-lg-16 py-0" dark>
      <v-toolbar-title>
        <router-link to="/">Store jmVUE</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="user[0]" class="text-yellow pr-2 span">
        {{ user[0].email }}
      </div>
      <v-app-bar-nav-icon
        @click="drawer = true"
        class="text-yellow"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      right
      dark
      absolute
      temporary
      style="color: #b2ebf2 !important"
    >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <router-link to="/">
            <v-list-item>
              <v-list-item-icon>
                <v-icon class="text-yellow">mdi-storefront</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="text-yellow">
                Productos
              </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link to="/cart">
            <v-list-item>
              <v-list-item-icon>
                <v-icon class="text-yellow">mdi-cart</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="text-yellow">
                Carrito
              </v-list-item-title>
            </v-list-item>
          </router-link>

          <div v-if="user[0]">
            <div v-if="user[0].admin">
              <router-link to="/admin/products">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon class="text-yellow">mdi-cog</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title class="text-yellow">
                    Panel de administración
                  </v-list-item-title>
                </v-list-item>
              </router-link>
            </div>
            <v-list-item @click="$store.dispatch('auth/logout')">
              <v-list-item-icon>
                <v-icon class="text-yellow">mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="text-yellow">
                Logout
              </v-list-item-title>
            </v-list-item>
          </div>
          <div v-else>
            <router-link to="/login">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon class="text-yellow">mdi-login</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="text-yellow">
                  Login
                </v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link to="/register">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon class="text-yellow">mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="text-yellow">
                  Registrarse
                </v-list-item-title>
              </v-list-item>
            </router-link>
          </div>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Appbar",
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  computed: {
    ...mapGetters("auth", ["user"]),
  },
  watch: {
    user() {
      if (this.user[0]) {
        if (!this.user[0].admin) {
          setTimeout(() => {
            this.$router.push("/store").catch(() => {});
          }, 5000);
        }
        // if (this.user[0].admin) this.$router.push("/admin/products").catch(() => {});
        // else this.$router.push("/store").catch(() => {});
      } else this.$router.push("/store").catch(() => {});
    },
  },
};
</script>