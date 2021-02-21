<template>
  <v-card class="mx-auto text-center" min-width="370">
    <v-btn class="my-4" @click="signInGoogle">自分のGoogleアカウントでログイン</v-btn>
    <v-btn class="mb-4" @click="signInTest">テストユーザでログイン</v-btn>
  </v-card>
</template>

<script>
export default {
  methods: {
    signInGoogle() {
      this.$store.dispatch('user/signInGoogle')
    },
    signInTest() {
      this.$store.dispatch('user/signInTestUser')
    }
  }
}
</script>