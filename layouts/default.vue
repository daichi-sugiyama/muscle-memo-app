<template>
  <v-app v-if="isAuth">
    <v-card class="mx-auto" min-width="370">
      <v-app-bar color="#BDBDBD">
        <nuxt-link tag="div" to="/result">
          <v-btn> RM </v-btn>
        </nuxt-link>
        <v-spacer></v-spacer>
        <nuxt-link tag="div" to="/memo">
          <v-btn color="" icon>
            <v-icon large>mdi-plus</v-icon>
          </v-btn>
        </nuxt-link>
      </v-app-bar>
      <nuxt />
    </v-card>
  </v-app>
  <div v-else>ログイン画面に遷移します</div>
</template>

<script>
export default {
  data() {
    return {};
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
