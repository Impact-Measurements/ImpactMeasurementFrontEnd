<template>
    <div>
        <v-toolbar app class="black accent-1 menu" dark>
            <span class="hidden-sm-and-up">
            </span>
            <v-toolbar-title>
                <v-img max-height="150"
                       max-width="175"
                       class="logo"
                       src='./logo.png'></v-img>
            </v-toolbar-title>
            <v-toolbar-items class="hidden-xs-only menu-items">
                <v-btn flat
                       v-for="item in menuItems"
                       :key="item.title"
                       :to="item.path"
                       style="margin-left:30px;">
                    {{ item.title }}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </div>
</template>

<script>
    export default {
        name: "TopBar",
        data() {
            return {
                sidebar: false,
                menuItems: [
                    { title: 'Home', path: '/' },
                    { title: 'Upload', path: '/upload' },
                    { title: 'Account', path: '/account' }
                ]
            }
        },
    };
</script>
<style scoped>
    .logo {
        margin-left: 25px;
        margin-top: 20px;
    }

    .menu {
        height: 75px !important;
    }

    .menu-items {
        margin-left: 50px;
        vertical-align: central;
        margin-top: 10px;
    }
</style>