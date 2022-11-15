<template>
        <div>
            <v-img max-height="400"
                   max-width="1920"
                   src="./header.jpg" border="0"
                   class="image"></v-img>
            <span class="text-header font">
                Kennis - Innovatie - technologie voor Urban Sports
            </span>
        </div>
</template>

<script>
    export default {
        name: 'HomeTop',
        components: {
        }

    };
</script>

<style>
    .image{
        position: relative;
        width: 100%;
    }
    .text-header{
        color: black;
        font-weight: bolder;
        font-size: 48px;
        font: Arial;
        align-content: center;
        margin-left: 25%;
        position: absolute;
        top: 220px;
    }

    .font {
        font-family: dovetail-mvb, serif;
        font-weight: 700;
        font-style: normal;
    }
</style>