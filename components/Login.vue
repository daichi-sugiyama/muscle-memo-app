<template>
  <v-card class="mx-auto text-center">
    <v-card-subtitle>
      筋トレメモアプリです。<br>
      動作お試しの方は「テストユーザでログイン」をクリックください。<br>
      ※スマホ向けのため、スマホで閲覧することをおすすめします。<br>
      <p class="font-weight-bold">開発概要は<a href="https://github.com/daichi-sugiyama/muscle-memo-app">こちら</a></p>
    </v-card-subtitle>
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