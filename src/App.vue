<template>
    <v-app>
        <TopBar class="bar" />
        <v-main>
            <router-view class="view"/>
        </v-main>
    </v-app>
</template>

<script>
    import TopBar from './components/partials/menu/TopBar';
    export default {
        name: 'App',
        components: {
            TopBar,
        }

    };
</script>

<style scoped>
    .bar {
        position: fixed;
        z-index: 100;
        width: 100%;
    }

    .view{
        margin-top: 75px;
    }
</style>