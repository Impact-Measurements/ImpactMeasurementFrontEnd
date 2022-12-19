<template>
    <div>
        <apexchart type="bar" height="350" :options="chartOptions" :series="series" class="bars" ></apexchart>
    </div>
</template>

<script>
    //import VueApexCharts from 'vue-apexcharts'
    export default {
        name: 'BarStatsView',
        components: {
            //VueApexCharts
        },
        data() {
            return {
                series: [{
                    name: 'Impact',
                    data: [257, 186, 224, 293]
                }],
                chartOptions: {
                    chart: {
                        type: 'bar',
                        height: 350
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
                        categories: ['1', '2', '3', '4'],
                    },
                    yaxis: {
                        title: {
                            text: '$ (Newton)'
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
                                y: 200,
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
                    },
                    toolbar: {
                        show: false
                    },
                }
            }
        }
    }
</script>

<style scoped> 
    .bars{
        margin-top: 7vh;
    }
</style>