<template>
    <LineChartGenerator :chart-options="chartOptions"
                        :chart-data="chartData"
                        :chart-id="chartId"
                        :dataset-id-key="datasetIdKey"
                        :plugins="plugins"
                        :css-classes="cssClasses"
                        :styles="styles"
                        :width="width"
                        :height="height" 
                        v-if="loaded"/>
</template>

<script>
    import axios from 'axios';
    import Vue from 'vue';
    import { Line as LineChartGenerator } from 'vue-chartjs/legacy'
    import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement } from 'chart.js'

    Vue.use(axios)
    ChartJS.register( Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement)

export default {
  name: 'ChartView',
  components: {
    LineChartGenerator
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 300
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
      return {
        loaded: false,
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Training',
            backgroundColor: 'black',
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
    },
        mounted() {
            axios
                .get('https://localhost:44301/api/trainingsession/1')
                .then(response => {
                    response.data.impacts.forEach(element => this.chartData.labels.push(element.frame))
                    response.data.impacts.forEach(element2 => this.chartData.datasets[0].data.push(element2.impactForce))
                    this.loaded = true;
            })
        }
}
</script>