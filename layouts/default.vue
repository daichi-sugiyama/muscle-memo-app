<template>
  <v-app v-if="isAuth">
    <nuxt />
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
      get() {return this.$store.state.user.isAuth}
    }
  }
};
</script>
