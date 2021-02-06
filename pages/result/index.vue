<template>
  <div>
    <h1>RM表</h1>
    <div v-for="(items, index) in programsData" :key="index">
      <p>---------------------------</p>
      <p>{{ items.menuName }}</p>
      <div v-if="loaded" class="horizontal">
        <Chart
          :chartData="{ programs: items.programs, menuName: items.menuName }"
          :width="items.programs.length * 40"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "~/components/Chart.vue";

export default {
  components: {
    Chart,
  },
  data() {
    return {
      loaded: false
    };
  },
  computed: {
    programsData: {
      get() {
        return this.$store.state.result.programsData;
      },
    },
  },
  mounted: async function () {
    this.loaded = false
    await this.$store.dispatch(
      "result/setProgramsData",
      this.$store.state.user.userId
    );
    this.loaded = true
  },
};
</script>
<style lang="css" scoped>
.horizontal {
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
</style>