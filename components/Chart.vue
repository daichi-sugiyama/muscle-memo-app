<script>
import { Line } from "vue-chartjs";
export default {
  extends: Line,
  data() {
    return {
      createDate: [],
      rmData: []
    }
  },
  props: ["programs"],
  methods: {
    setData() {
      this.programs.forEach((program) => {
        this.createDate.push(program.createDate)
        this.rmData.push(program.rm)
      })
    }
  },
  mounted() {
    this.setData()
    this.renderChart(
      {
        labels: this.createDate,
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: this.rmData,
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },
};
</script>