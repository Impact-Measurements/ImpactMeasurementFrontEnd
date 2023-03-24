<template>
    <div>
        <h1 style="margin: 3%;">
            Choose a training session
        </h1>

        <v-container>
            <v-row class="list">
                <v-col v-if="!traininglist || !traininglist.length">
                    <h2>No training sessions found</h2>
                </v-col>

                <v-col v-for="training in traininglist"
                       :key="training.title"
                       :cols="training.flex"
                       v-else class="items"
                       md="2">
                    <v-card class="cards">
                        <v-list-item three-line>
                            <v-list-item-content>
                                <v-list-item-title class="text-h5 mb-1" v-text="training.startingTime"></v-list-item-title>
                                <v-list-item-subtitle>Effectiveness score: {{training.effectivenessScore}}</v-list-item-subtitle>
                                <v-list-item-subtitle>Painfulness score: {{training.painfulnessScore}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-card-actions>
                            <router-link :to="'/summary/' + `${training.id}`">
                                <v-btn outlined
                                       rounded
                                       style="width:100px; background-color: white;">
                                    View
                                </v-btn>
                            </router-link>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios';
    import Vue from 'vue';
    Vue.use(axios)

    export default {
        name: 'ChooseTrainingView',
        data() {
            return ({
                traininglist: []
            })
        },
        mounted() {
            axios
                .get('http://localhost:44301/api/trainingsession/all')
                .then(response => {
                    this.traininglist = response.data
                    console.log(response.data)
                    console.log(this.traininglist)
                })
        }

    }
</script>

<style scoped>
    .training{
        margin-left: 5%;
    }

    .list{
       margin: 10px;
    }

    .items {
        margin-bottom: 0px;
    }

    .cards {
        background-color: #94C120ac;
    }
</style>