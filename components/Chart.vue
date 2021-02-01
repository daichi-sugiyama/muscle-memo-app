<script>
import { Line } from "vue-chartjs";
import moment from "moment";
export default {
  extends: Line,
  data() {
    return {
      createDate: [],
      rmData: [],
    };
  },
  props: ["programs"],
  methods: {
    setData() {
      this.programs.forEach((program) => {
        this.createDate.push(moment(program.createDate).format("MM/DD"));
        this.rmData.push(program.rm);
      });
    },
  },
  mounted() {
    this.setData();
    this.renderChart(
      {
        labels: this.createDate,
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: this.rmData,
            lineTension: 0,
          },
        ],
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          onClick: function () {
            return false;
          },
        },
      }
    );
  },
};
</script>