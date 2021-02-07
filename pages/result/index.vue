<template>
  <div>
    <v-card-title>
      RM表
    </v-card-title>
    <v-card-subtitle>
      RMとはレペティション・マキシマム【repetition　maximum】の略で、頭文字からRMと呼ばれ、ある決まった重さに対して何回反復して関節運動を行うことができるかによって運動強度（重さ）を決める方法です。1回が限界の負荷を1RM、最高５回繰り返せる負荷を5RMというように表します。
      <br>本表では、横軸を最大挙上重量（1RM）とします。
    </v-card-subtitle>
    <div>
      <div v-for="(items, index) in programsData" :key="index" class="mb-4">
        <h3 class="title font-weight-bold pl-4">{{ items.menuName }}</h3>
        <div v-if="loaded" class="horizontal">
          <Chart
            :chartData="{ programs: items.programs, menuName: items.menuName }"
            :width="items.programs.length * 40"
          />
        </div>
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