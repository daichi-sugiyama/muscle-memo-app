<template>
  <v-app v-if="isAuth">
    <v-card class="mx-auto" min-width="370">
      <v-app-bar v-if="$route.path == '/'" color="#BDBDBD">
        <nuxt-link tag="div" to="/result">
          <v-btn> RM </v-btn>
        </nuxt-link>
        <v-spacer></v-spacer>
        <nuxt-link tag="div" to="/memo">
          <v-btn>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </nuxt-link>
      </v-app-bar>
      <v-app-bar v-else color="#BDBDBD">
        <nuxt-link tag="div" to="/">
          <v-btn>
            <v-icon> mdi-arrow-left </v-icon>
          </v-btn>
        </nuxt-link>
      </v-app-bar>
      <nuxt />
    </v-card>
  </v-app>
  <v-app v-else>
    <Login />
  </v-app>
</template>

<script>
import Login from "~/components/Login.vue";
export default {
  components: {
    Login,
  },
  middleware: "loginCheck",
  computed: {
    isAuth: {
      get() {
        return this.$store.state.user.isAuth;
      },
    },
  },
};
</script>
