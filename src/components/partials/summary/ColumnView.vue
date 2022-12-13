<template>
    <apexchart type="bar" height="360" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
    import axios from 'axios'
    import Vue from 'vue'
    import VueApexCharts from 'vue-apexcharts'
    Vue.use(axios)

    export default {
        name: 'ColumnView',
        components: {
            apexchart: VueApexCharts,
        },
        data() {
            return {
                id: parseInt(this.$route.params.id),
                shortData: [],

                series: [{
                    name: 'Impact',
                    data: []
                }],
                chartOptions: {
                    chart: {
                        height: 350,
                        type: 'bar',
                    },
                    toolbar: {
                        show: false
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: 5,
                            dataLabels: {
                                position: 'top', // top, center, bottom
                                color: ["#FEFEFE"]
                            },
                        }
                    },
                    colors: ["#6CBD70"],
                    dataLabels: {
                        enabled: true,
                        formatter: function (val) {
                            return val + " newton";
                        },
                        offsetY: 20,
                        style: {
                            fontSize: '12px',
                            colors: ["#FEFEFE"]
                        }
                    },
                    xaxis: {
                        categories: ["Average", "Highest"],
                        position: 'bottom',
                        axisBorder: {
                            show: false
                        },
                        axisTicks: {
                            show: false
                        },
                        tooltip: {
                            enabled: false,
                        }
                    },
                    yaxis: {
                        axisBorder: {
                            show: false
                        },
                        axisTicks: {
                            show: false,
                        },
                        labels: {
                            show: true,
                            formatter: function (val) {
                                return val + " newton";
                            }
                        }

                    }
                },
            }


        },
        mounted() {
            axios
                .get('https://localhost:44301/api/impact/average/' + this.id)
                .then(response => {
                this.average = response.data
                    
                    this.average = Number(this.average.toFixed(2))
                    this.shortData.push(this.average)
            }),
            axios
            .get('https://localhost:44301/api/impact/highest/' + this.id)
                .then(responseHighest => {
                    this.highest = responseHighest.data.impactForce

                    this.highest = Number(this.highest.toFixed(2))
                    this.shortData.push(this.highest)

                    this.series = [{
                        data: this.shortData,
                    }];
                    console.log(this.shortData)
                })
        },
    }
</script>