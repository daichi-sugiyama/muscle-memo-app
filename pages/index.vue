<template>
  <v-card max-width="400" class="mx-auto">
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
                  class="headline"
                  v-text="item.title"
                ></v-card-title>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {
  data: () => ({
    items: [
      {
        title: "【胸】2021/01/16",
      },
      {
        title: "【胸】2021/01/16",
      },
      {
        title: "【胸】2021/01/16",
      },
      {
        title: "【胸】2021/01/16",
      },
      {
        title: "【胸】2021/01/16",
      },
      {
        title: "【胸】2021/01/16",
      },
      {
        title: "【胸】2021/01/16",
      },
      {
        title: "【胸】2021/01/16",
      },
      {
        title: "【胸】2021/01/16",
      },
      {
        title: "【胸】2021/01/16",
      },
      {
        title: "【胸】2021/01/16",
      },
      {
        title: "【胸】2021/01/16",
      },
      {
        title: "【胸】2021/01/16",
      },
    ],
  }),
  async mounted() {
    // firestoreを使うためのサンプルコード
    // 参考：https://www.wakuwakubank.com/posts/721-firebase-firestore-introduction/
    firebase.auth().onAuthStateChanged(function (user) {console.log(user.uid)}); // 認証中のユーザー
    const db = firebase.firestore()
    const userDoc = await db.collection('users').doc('9OpHBAsAoNKUhTr9daJx').get() // firestoreから通信して取得しているため（非同期なので）awaitで待つ
    console.log(userDoc.exists)
  },
};
</script>