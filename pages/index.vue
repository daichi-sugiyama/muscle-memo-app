<template>
  <v-list two-line>
    <v-list-item-group>
      <template v-for="(item, index) in items">
        <nuxt-link
          tag="div"
          :to="`/memo/edit?memoId=${item.memoId}`"
          :key="index"
        >
          <v-list-item :key="item.title">
            <v-list-item-content>
              <v-list-item-title class="theme--light v-label" v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
        </nuxt-link>
      </template>
    </v-list-item-group>
    <div class="text-right">
      <v-btn class="ma-2" @click="checkAuth"> ログアウト </v-btn>
    </div>
  </v-list>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    items() {
      return this.$store.state.memos.memos;
    },
  },
  methods: {
    async isAuth() {
      console.log("ログイン状態:" + this.$store.state.user.isAuth);
      console.log("ユーザーID:" + this.$store.state.user.userId);
    },
    checkAuth() {
      this.$store.dispatch('user/signOut')
    }
  },
  mounted: function () {
    this.$store.dispatch("memos/getMemosData", this.$store.state.user.userId);
  },
};
</script>