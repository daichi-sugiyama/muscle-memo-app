<template>
  <v-app dark>
    <nuxt />
  </v-app>
</template>

<script>
export default {
  data () {
    return {}
  },
  middleware: 'loginCheck'
}
</script>
