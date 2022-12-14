<template>

    <apexchart type="line" height="300" :options="chartOptions" :series="series"></apexchart>

</template>

<script>
    import axios from 'axios'
    import Vue from 'vue'
    import VueApexCharts from 'vue-apexcharts'

    Vue.use(axios)

export default {
  name: 'ChartView',
  components: {
      apexchart: VueApexCharts,
  },
        data() {
            return {
                id: parseInt(this.$route.params.id),
                shortData: [],
                shortFrames: [],

                series: [
                    {
                        name: "Impact",
                        data: []
                    }
                ],
                chartOptions: {
                    chart: {
                        height: 300,
                        type: 'line',
                        dropShadow: {
                            enabled: true,
                            color: '#000',
                            top: 18,
                            left: 7,
                            blur: 10,
                            opacity: 0.2
                        },
                        toolbar: {
                            show: true
                        },
                        zoom: {
                            enabled: false
                        }
                    },
                    colors: ['#5AB55E'],
                    dataLabels: {
                        enabled: false,
                        formatter: function (val) {
                            return val + " newton";
                        },
                    },
                    stroke: {
                        curve: 'smooth'
                    },
                    title: {
                        text: 'Amount of force instances',
                        align: 'left'
                    },
                    noData: {
                        text: 'Loading...'
                    },
                    grid: {
                        borderColor: '#e7e7e7',
                        row: {
                            colors: ['#f3f3f3', 'transparent'],
                            opacity: 0.5
                        },
                    },
                    markers: {
                        size: 6,
                        colors: ["FEFEFE"],
                    },
                    xaxis: {
                        categories: [],
                        type: 'category',
                        labels: {
                            show: false,
                        }
                    },
                    yaxis: {
                        title: {
                            text: 'Newton'
                        },
                    },
                    legend: {
                        position: 'top',
                        horizontalAlign: 'right',
                        floating: true,
                        offsetY: -25,
                        offsetX: -5
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shade: 'light',
                            gradientToColors: ['#ff0000'],
                            shadeIntensity: 10,
                            type: 'vertical',
                            opacityFrom: 1,
                            opacityTo: 1,
                            stops: [0, 1000]
                        },
                    }
                }
            }
        },
        mounted() {
            //this.series.data = [],
            //    this.chartOptions.xaxis.categories = [],
            axios
                .get('https://localhost:44301/api/impact/all/with_threshold/' + this.id)
                .then(response => {
                    response.data.impacts.forEach(element => this.chartOptions.xaxis.categories.push(element.frame))
                    response.data.impacts.forEach(element2 => this.shortData.push(element2.impactForce))

                    this.shortData = this.shortData.map(function (each_num) {
                        return Number(each_num.toFixed(2))
                    });
                    this.series = [{
                        data: this.shortData,
                        },
                    ];
            })
        }
}
</script>