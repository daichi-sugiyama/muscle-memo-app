<template>
  <div>
    <h1>RM表</h1>
    <div v-for="(items, index) in programsData" :key="index">
      <p>---------------------------</p>
      <p>{{ items.menuName }}</p>
      <Chart :programs="items.programs"/>
    </div>
  </div>
</template>

<script>
import Chart from "~/components/Chart.vue"

export default {
  components: {
    Chart
  },
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