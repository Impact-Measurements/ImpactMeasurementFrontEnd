<template>
    <div>
        <div>
            <v-row>
                <div class="blocks">
                    <a href="/upload">
                        <v-img max-height="275"
                               max-width="275"
                               class="image"
                               src="./upload.png" border="0"></v-img>
                    </a>
                </div>
                <div class="blocks">
                    <a href="/account">
                        <v-img max-height="275"
                               max-width="275"
                               class="image"
                               src="./account.png" border="0"></v-img>
                    </a>
                </div>

                <div class="blocks">
                    <a href="/summary">
                        <v-img max-height="275"
                               max-width="275"
                               class="image"
                               src="./3d.png" border="0"></v-img>
                    </a>
                </div>

            </v-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HomeBlocks',
        components: {
        }

    };
</script>

<style scoped>

    .blocks {
        width: 25%;
        align-content: center;
        text-align: center;
        height: 300px;
        background-color: greenyellow;
        margin: 4%;
    }

    .image{
        align-content: center;
        text-align: center;
        margin-left: 20%;
        margin-top: 10px;
    }

    .blocks:hover {
        width: 26%;
        height: 310px;
        margin: 3.5%;
        -webkit-filter: brightness(95%);
        -webkit-transition: all 10ms ease;
        -moz-transition: all 10ms ease;
        -o-transition: all 10ms ease;
        transition: all 10ms ease;
        box-shadow: 0 0 15px;
        cursor: pointer;
    }

    .image:hover {
        -webkit-filter: brightness(120%);
        -webkit-transition: all 10ms ease;
        -moz-transition: all 10ms ease;
        -o-transition: all 10ms ease;
        transition: all 10ms ease;
    }
</style>