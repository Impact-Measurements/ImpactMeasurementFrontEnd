<template>
    <div>
        <h1 style="margin: 3%;">
            Choose a training session
        </h1>

        <v-container fluid>
            <v-row dense>
                <v-col v-for="training in traininglist"
                       :key="training.title"
                       :cols="training.flex">
                    <v-card>
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
                                   style="width:100px">
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
                .get('https://localhost:44301/api/training/all')
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
</style>