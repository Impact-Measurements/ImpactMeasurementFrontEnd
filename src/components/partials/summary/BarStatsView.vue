<template>
    <div>
        <apexchart type="bar" height="350" :options="chartOptions" :series="series" class="bars"></apexchart>
    </div>
</template>

<script>
    import axios from 'axios'
    import Vue from 'vue'
    import VueApexCharts from 'vue-apexcharts'

    Vue.use(axios)
    export default {
        name: 'BarStatsView',
        components: {
            apexchart: VueApexCharts,
        },
        data() {
            return {
                shortData: [],
                shortX: [],
                serial: 0,
                id: parseInt(this.$route.params.id),

                series: [{
                    name: 'Impact',
                    data: []
                }],
                chartOptions: {
                    chart: {
                        type: 'bar',
                        height: 350,
                        toolbar: {
                            show: true
                        },
                        zoom: {
                            enabled: false
                        }
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '40%',
                            endingShape: 'rounded'
                        },
                    },
                    colors: ['#6CBD70'],
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ['transparent']
                    },
                    xaxis: {
                        categories: [],
                        type: 'numeric',
                        tickPlacement: 'on',
                        tickAmount: 'dataPoints',
                        decimalsInFloat: 0,
                    },
                    yaxis: {
                        title: {
                            text: 'Newton'
                        }
                    },
                    fill: {
                        opacity: 1,
                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return val + " newton"
                            }
                        }
                    },
                    annotations: {
                        yaxis: [
                            {
                                y: JSON.parse(localStorage.getItem("threshold")),
                                borderColor: "#FF0000",
                                label: {
                                    borderColor: "#FF0000",
                                    style: {
                                        color: "#fff",
                                        background: "#FF0000"
                                    },
                                    text: "Threshold"
                                }
                            }],
                    }
                }
            }
        },
        mounted() {
            axios
                .get('http://localhost:44301/api/impact/all/' + this.id)
                .then(response => {
                    response.data.forEach(element => this.shortData.push(element.impactForce))
                    this.shortData = this.shortData.map(function (each_num) {
                        return Number(each_num.toFixed(2))
                    });
                    this.updateChart()
                })
        },
        methods: {
            updateChart() {
                this.series = [{
                    data: this.shortData,
                },
                ];
            },
        }
    }
</script>

<style scoped> 
    .bars{
        margin-top: 7vh;
    }
</style>