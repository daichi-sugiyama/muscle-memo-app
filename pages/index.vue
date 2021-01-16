<template>
  <v-card
    max-width="400"
    class="mx-auto"
  >
    <v-app-bar
      color="#BDBDBD"
    >
      <nuxt-link tag="div" to="/memo">
        <v-btn
          color=""
        >
          RM
        </v-btn>
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
        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
        >
          <v-card
            class="ma-1"
            color="#F5F5F5"
          >
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
  export default {
    data: () => ({
      items: [
        {
          title: '【胸】2021/01/16',
        },
        {
          title: '【胸】2021/01/16',
        },
        {
          title: '【胸】2021/01/16',
        },
        {
          title: '【胸】2021/01/16',
        },
        {
          title: '【胸】2021/01/16',
        },
        {
          title: '【胸】2021/01/16',
        },
        {
          title: '【胸】2021/01/16',
        },
        {
          title: '【胸】2021/01/16',
        },
        {
          title: '【胸】2021/01/16',
        },
        {
          title: '【胸】2021/01/16',
        },
        {
          title: '【胸】2021/01/16',
        },
        {
          title: '【胸】2021/01/16',
        },
        {
          title: '【胸】2021/01/16',
        }
      ],
    }),
  }
</script>