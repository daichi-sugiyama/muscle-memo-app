<template>
  <v-card v-if="isAuth()" max-width="400" class="mx-auto">
    <v-app-bar color="#BDBDBD">
      <nuxt-link tag="div" to="/memo">
        <v-btn color=""> RM </v-btn>
      </nuxt-link>
      <v-spacer></v-spacer>
      <nuxt-link tag="div" to="/memo">
        <v-btn color="" icon>
          <v-icon large>mdi-plus</v-icon>
        </v-btn>
      </nuxt-link>
    </v-app-bar>
    <v-container>
      <v-row dense>
        <v-col v-for="(item, i) in items" :key="i" cols="12">
          <v-card class="ma-1" color="#F5F5F5">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  style="font-size: 20px"
                  v-text="item.title"
                ></v-card-title>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <div v-else>
    TODO：isAuthがfalseの時、ログイン画面を表示
  </div>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    items() {
      return this.$store.state.memo.memo
    }
  },
  methods: {
    async isAuth() {
      console.log("ログイン状態:" + this.$store.state.user.isAuth)
      console.log("ユーザーID:" + this.$store.state.user.userId)
    }
  },
  mounted: function () {
    this.$store.dispatch('memo/getMemoData', this.$store.state.user.userId)
  }
}
</script>