<template>
    <div>
        <div>
            <HomeTop />
        </div>
        <div>
            <HomeBlocks />
        </div>
    </div>
</template>

<script>
    import HomeTop from '../components/partials/home/HomeTop';
    import HomeBlocks from '../components/partials/home/HomeBlocks';

  export default {
    name: 'HomeView',

        components: {
            HomeTop,
            HomeBlocks,
    },
  }
</script>
<style scoped>
</style>
