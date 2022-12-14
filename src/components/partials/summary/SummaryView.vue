<template>
    <div>
        <v-container fluid="md">
            <v-row class="justify-content-md-center">

                <v-col col cols="5" class="left">
                    <v-row>
                        <v-col>
                            <v-row style="margin: 0px">
                                <h2>All impacts</h2>
                                <v-btn tile color="success" v-on:click="sortArrays" style="margin-left: 100px">
                                    Sort
                                </v-btn>
                            </v-row>
                            <hr /> 
                        </v-col>
                        <v-col>
                            <v-row style="margin: 0px">
                                <h2>High impact stats</h2>
                                <v-btn tile color="success" v-on:click="time=17" style="margin-left: 80px" v-model="time">
                                    View
                                </v-btn>
                            </v-row>
                            <hr />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col class="list">
                            <v-card class="mx-auto" v-for="impact in impacts" :key="impact.Count" style="margin-bottom: 5px;">
                                <v-card-text @click="reveal = true">
                                    {{impact.impactForce}} <strong>N</strong>
                                </v-card-text>

                                <v-expand-transition>
                                    <v-card v-if="reveal"
                                            class="transition-fast-in-fast-out v-card--reveal"
                                            style="height: 100%;">
                                        <v-card-text class="pb-0" @click="reveal = false">
                                            <strong>X: </strong>{{impact.impactDirectionX}}
                                        <strong>Y: </strong>{{impact.impactDirectionY}}
                                        <strong>Z: </strong>{{impact.impactDirectionZ}}
                                        </v-card-text>
                                    </v-card>
                                </v-expand-transition>
                            </v-card>
                        </v-col>
                        <v-col>
                            <StatsView/>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col col cols="7" class="right">
                    <img src="./settings.png" alt="Settings" class="settings" @click.stop="drawer = !drawer" />
                    <OrientationView class="orientation" v-bind:impact="this.impactNum" @interface="getChildInterface"/>
                </v-col>

            </v-row>

            <v-row>
                <v-col class="bottom">
                    <ChartView />
                </v-col>
            </v-row>

            <v-row>
                <v-col class="time">
                    <vue-slider v-model="time" :data="frames" v-on:change="getValuesFromAPI" :marks="true" class="slider-time"/>
                </v-col>
            </v-row>
        </v-container>

        <v-navigation-drawer v-model="drawer"
                             absolute
                             temporary
                             right>
            <v-list-item>
                <v-list-item-content class="settings-content">
                    <h1>Settings</h1>
                    <v-container fluid>
                        <v-text-field v-model="thresholdForm.impactForce"
                                      label="Threshold: "
                                      required></v-text-field>

                        <v-slider v-model="thresholdForm.impactForce"
                                  max="500"
                                  min="0"></v-slider>

                        <v-btn color="success"
                               dark
                               @click.stop="drawer = !drawer"
                               v-on:click="changeThreshold(), update()"> Save
                        </v-btn>
                    </v-container>
                </v-list-item-content>
            </v-list-item>
            </v-navigation-drawer>
    </div>
</template>

<script>
    import ChartView from './ChartView.vue';
    import StatsView from './StatsView.vue';
    import OrientationView from '../orientation/OrientationView.vue';
    import VueSlider from 'vue-slider-component';
    import 'vue-slider-component/theme/antd.css';

    import axios from 'axios';
    import Vue from 'vue';
    Vue.use(axios)

    export default {
        name: 'SummaryView',
        components: {
            ChartView,
            OrientationView,
            VueSlider,
            StatsView,
        },
        data() {
            return {
                drawer: null,
                time: 0,
                frames: [],
                impacts: [],
                highImpacts: null,
                reveal: false,
                sortMethod: "asc",
                impactNum: null,
                id: parseInt(this.$route.params.id),

                thresholdForm: {
                    userId: 0,
                    impactForce: 0,
                },
            }
        },
        methods: {
            sortArrays() {
                if (this.sortMethod == "asc") {
                    this.sortMethod = "desc";
                    this.impacts = this.impacts.sort((a, b) => {
                        return b.impactForce - a.impactForce
                    })
                }

                else if (this.sortMethod == "desc") {
                    this.sortMethod = "asc";
                    this.impacts = this.impacts.sort((a, b) => {
                        return a.impactForce - b.impactForce
                    })
                }

            },
            getChildInterface(childInterface) {
                this.$options.childInterface = childInterface;
            },

            async getValuesFromAPI() {
                this.$options.childInterface.getValuesFromAPI();
            },

            changeFrame() {
                this.time = 17;
            },

            changeThreshold() {
                axios({
                    method: 'put',
                    url: 'https://localhost:44301/api/users/minimum/threshold',
                    data: {
                        userId: this.thresholdForm.userId,
                        impactForce: this.thresholdForm.impactForce
                    }
                })
            },

            update() {
                this.impacts = [],
                this.frames = [],
                    axios
                        .get('https://localhost:44301/api/impact/all/with_threshold/' + this.id)
                        .then(response => {
                            response.data.impacts.forEach(impact => this.impacts.push(impact))
                            response.data.impacts.forEach(element => this.frames.push(element.frame))
                            this.thresholdForm.userId = response.data.userId

                            this.time = this.impacts[0].frame
                        })
            }

        },
        mounted() {
            axios
                .get('https://localhost:44301/api/impact/all/with_threshold/' + this.id)
                .then(response => {
                    response.data.impacts.forEach(impact => this.impacts.push(impact))
                    response.data.impacts.forEach(element => this.frames.push(element.frame))
                    this.thresholdForm.userId = response.data.userId

                    this.time = this.impacts[0].frame
                    console.log(this.thresholdForm.userId);
                })
        },
        watch: {
            time(e) {
                this.impactNum = this.impacts.filter(c => c.frame == e)
            }
        },
        childInterface: {
            getValuesFromAPI: () => { }
        },
    }
</script>

<style scoped>
    .left{
        max-height: 40%;
        border: 1px solid;
    }

    .right {
        max-height: 40%;
        border: 1px solid;
    }

    .bottom {
        max-height: 40%;
        border: 1px solid;
        height: 360px;
    }

    .time {
        max-height: 15%;
    }
    .slider-time {
        margin-left: 3.8%;
        position: center;
        top: 0;
        margin-top: -55px;
    }

    .orientation{
        max-height: 450px;
    }

    .list {
        border: 1px solid grey;
        max-height: 420px;
        overflow-y: scroll
    }
    .settings {
        max-height: 50px;
        margin: 5px;
        position: absolute;
        display: block;
        left: inherit;
        right: 10px;
        cursor: pointer;
    }

    .settings-content{
        margin-top: 75px;
    }

    .v-card--reveal {
        bottom: 0;
        opacity: 1 !important;
        position: absolute;
        width: 100%;
    }

</style>