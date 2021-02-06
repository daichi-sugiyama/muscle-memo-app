<template>
  <Form v-if="loaded" :menuData="menuData" :bodyTarget="bodyTarget" />
</template>

<script>
import Form from "~/components/Form.vue";
export default {
  components: {
    Form,
  },
  data() {
    return {
      loaded: false,
    };
  },
  computed: {
    menuData: {
      get() {
        return this.$store.state.memo.menuData;
      },
      set(val) {
        return console.log(val);
      },
    },
    bodyTarget: {
      get() {
        return this.$store.state.memo.bodyTarget;
      },
      set(val) {
        return console.log(val);
      },
    },
  },
  mounted: async function () {
    this.loaded = false;
    await this.$store.dispatch("memo/initMemo");
    this.loaded = true;
  },
};
</script>