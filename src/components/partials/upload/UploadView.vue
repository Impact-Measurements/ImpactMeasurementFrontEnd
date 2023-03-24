<template>
    <div>
        <v-main>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
                            <span>
                                Awesome! You just uploaded a training.
                            </span>
                            <v-btn flat color="blue">Close</v-btn>
                        </v-snackbar>
                        <v-toolbar dark color="green">
                            <v-toolbar-title>Upload training</v-toolbar-title>
                        </v-toolbar>
                        <!--<v-text-field v-model="title"
                        :counter="20"
                        label="Training name"
                        required
                        @input="$v.name.$touch()"
                        @blur="$v.name.$touch()"></v-text-field>-->
                        <v-slider v-model="form.Pain" thumb-label="always" label="Pain endured: " min="0" max="10" style="margin-bottom: 1vh; margin-top: 2vh;"></v-slider>
                        <v-slider v-model="form.Effect" thumb-label="always" label="Effectiveness: " min="0" max="10"> </v-slider>
                        <v-file-input label="file"
                                      accept=".csv"
                                      id="file"
                                      name="file"
                                      v-model="file"
                                      v-on:change="handleFileUpload()">
                        </v-file-input>
                        <v-btn v-on:click="submitFile()">Submit</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
    </div>
</template>


<script>
    import axios from 'axios'
    export default {
        name: 'UploadView',
        data() {
            return {
                file: '',
                form: {
                    UserId: 1,
                    Effect: null,
                    Pain: null
                },
                snackbar: false
            }
        },

        methods: {
            submitFile() {
                console.log(JSON.stringify(this.form))
                let formData = new FormData();
                formData.append('file', this.file);

                axios.post('http://localhost:44301/api/File/postTrainging' + JSON.stringify(this.form),
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(function () {
                    console.log('SUCCESS!!');
                    ;
                })
                    .catch(function () {
                        console.log('FAILURE!!');
                    });
            },
        }
    }
</script>

<style>
</style>