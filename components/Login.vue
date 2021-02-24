<template>
  <v-card class="mx-auto text-center">
    <div>
      <v-btn class="my-4" @click="signInGoogle">自分のGoogleアカウントでログイン</v-btn>
    </div>
    <div>
      <v-btn class="mb-4" @click="signInTest">テストユーザでログイン</v-btn>
    </div>
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