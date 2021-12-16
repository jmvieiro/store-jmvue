<template>
  <div>
    <v-app-bar app color="deep-purple accent-4" dense dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" style="color: #34495e !important"
          >Store jmVUE</router-link
        >
      </v-toolbar-title>
    
      <router-link to="/register" class="ml-4" style="color: white !important"
        >Registro
      </router-link>
      <router-link to="/" class="ml-4" style="color: white !important"
        >Login
      </router-link>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <router-link to="/register">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Registro </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link to="/">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Login </v-list-item-title>
            </v-list-item>
          </router-link>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
};
</script>