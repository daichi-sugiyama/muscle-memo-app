<template>
  <Form />
</template>

<script>
import Form from '~/components/Form.vue'
export default {
  components: {
    Form
  },
  created: function () {
    this.$store.dispatch("memo/setEditFrom", this.$route.query.memoId);
  },
};
</script>