<template>
  <div>
    <h1>RM表</h1>
    <div v-for="(items, index) in programsData" :key="index">
      <p>---------------------------</p>
      <p>{{ items.menuName }}</p>
      <div v-for="(item, index) in items.programs" :key="index">
        <p>{{ item.createDate }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  computed: {
    programsData() {
      return this.$store.state.result.programsData
    }
  },
  mounted: function () {
    this.$store.dispatch('result/setProgramsData', this.$store.state.user.userId)
  }
};
</script>