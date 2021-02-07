<script>
import { Line, mixins } from "vue-chartjs";
import moment from "moment";

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ["chartData"],
  data() {
    return {
      createDate: [],
      rmData: [],
    };
  },
  methods: {
    setData() {
      this.chartData.programs.forEach((program) => {
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
            label: this.chartData.menuName,
            backgroundColor: "#f87979",
            data: this.rmData,
            lineTension: 0,
          },
        ],
      },
      {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              //y軸設定
              display: true, //表示設定
              scaleLabel: {
                //軸ラベル設定
                display: true, //表示設定
                labelString: "1RM", //ラベル
                fontSize: 12, //フォントサイズ
              },
            },
          ],
        },
        legend: {
          display: false,
          onClick: function () {
            return false;
          },
        },
      }
    );
  },
};
</script>