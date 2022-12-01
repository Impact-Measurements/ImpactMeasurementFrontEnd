<template lang="pug">
    div(ref='canvas')
</template>

<script>
    import axios from 'axios'
    import Vue from 'vue'
    import * as THREE from 'three'
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    //import TrackballControls from 'three-trackballcontrols'
    //import {
    //    BloomEffect,
    //    EffectComposer,
    //    EffectPass,
    //    RenderPass
    //} from 'postprocessing'
    Vue.use(axios)

    export default {
        name: 'OrientationView',
        data: function () {
            const scene = new THREE.Scene()
            const camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                1,
                1000
            )
            const renderer = new THREE.WebGLRenderer({ antialias: true })
            const light = new THREE.DirectionalLight('hsl(0, 100%, 100%)')

            const arrow = new THREE.ArrowHelper(
                new THREE.Vector3(1, 1, 0).normalize(),
                new THREE.Vector3(0, 0, 0),
                // length
                2.2,
                'yellow');
            const axes = new THREE.AxesHelper(3)

            var color = new THREE.Color();
            color.setRGB(255, 250, 250);

            return {
                scene: scene,
                camera: camera,
                controls: [],
                renderer: renderer,
                light: light,
                arrow: arrow,
                axes: axes
            }
        },
        created: function () {
            this.scene.add(this.camera)
            this.scene.add(this.light)
            this.scene.add(this.arrow)
            this.scene.add(this.axes)
            this.scene.add(this.text)
            this.renderer.setSize(1100, 450)
            this.light.position.set(0, 0, 8)
            this.camera.lookAt(0, 0, 0);
            this.camera.position.z = 5
            this.camera.position.x = 1
            this.camera.position.y = 1
            this.scene.background = new THREE.Color('grey')

            this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        },
        mounted: function () {
            this.emitInterface();
            this.$refs.canvas.appendChild(this.renderer.domElement)
            this.getValuesFromAPI()
        },
        methods: {
            animate: function () {
                requestAnimationFrame(this.animate)
                var valueX = JSON.parse(localStorage.getItem("valueX"));
                var valueY = JSON.parse(localStorage.getItem("valueY"));
                var valueZ = JSON.parse(localStorage.getItem("valueZ"));
                var dir = new THREE.Vector3(valueX, valueY, valueZ);
                this.arrow.setDirection(dir);
                this.renderer.render(this.scene, this.camera);
            },

            getValuesFromAPI: function (x) {
                localStorage.setItem("valueX", (x.impactDirectionX / -1000).toString());
                localStorage.setItem("valueY", (x.impactDirectionY / 1000).toString());
                localStorage.setItem("valueZ", (x.impactDirectionZ / 1000).toString());
                console.log(x)
                this.animate()
            },
            emitInterface() {
                this.$emit("interface", {
                    getValuesFromAPI: () => this.getValuesFromAPI()
                });
            },
        },
        watch: {
            impact(e) {
                console.log(e[0])
                this.getValuesFromAPI(e[0]);
            }
        },
        props: {
            impact: null
        }
    }
</script>

<style scoped>
    canvas {
        width: 100vw;
        height: 100vh;
    }
</style>
