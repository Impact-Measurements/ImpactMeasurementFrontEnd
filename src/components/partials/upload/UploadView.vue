<template>
    <div>
        <v-main>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-toolbar dark color="green">
                            <v-toolbar-title>Upload training</v-toolbar-title>
                        </v-toolbar>
                        <v-text-field v-model="title"
                                      :counter="10"
                                      label="Training name"
                                      required
                                      @input="$v.name.$touch()"
                                      @blur="$v.name.$touch()"></v-text-field>
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
                title: ''
            }
        },

        methods: {
            submitFile() {
                let formData = new FormData();
                formData.append('file', this.file);

                axios.post('https://localhost:44301/api/File/postTrainging',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(function () {
                    console.log('SUCCESS!!');
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