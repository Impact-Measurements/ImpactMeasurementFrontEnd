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
                // first argument is the direction
                new THREE.Vector3(1, 1, 0).normalize(),
                // second argument is the origin
                new THREE.Vector3(0, 0, 0),
                // length
                2.2,
                // color
                'yellow');
            const axes = new THREE.AxesHelper(3)
            //const controls = new THREE.OrbitControls(camera, renderer.domElement)
            //this.controls.update()

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
            this.renderer.setSize(window.innerWidth, window.innerHeight)
            this.light.position.set(0, 0, 8)
            this.camera.lookAt(0, 0, 0);
            this.camera.position.z = 5
            this.camera.position.x = 1
            this.camera.position.y = 1
            this.scene.background = new THREE.Color('grey')

            this.controls = new OrbitControls(this.camera, this.renderer.domElement)

            //this.controls.target.set(0, 0, 0);
            //this.controls.update();

            //this.controls = new TrackballControls(this.camera)
            //this.controls.rotateSpeed = 5.0
            //this.controls.zoomSpeed = 5
            //this.controls.panSpeed = 0.8
            //this.controls.noZoom = false
            //this.controls.noPan = true
            //this.controls.staticMoving = true
            //this.controls.dynamicDampingFactor = 0.5
        },
        mounted: function () {
            this.$refs.canvas.appendChild(this.renderer.domElement)
            this.getValuesFromAPI()
            this.animate()
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

            getValuesFromAPI: function () {
                axios.get('https://localhost:44349/test2/Test2').then(
                    (response) => {
                        var values = {
                            X: response.data.impactDirectionX,
                            Y: response.data.impactDirectionY,
                            Z: response.data.impactDirectionZ
                        };
                        localStorage.setItem("valueX", values.X);
                        localStorage.setItem("valueY", values.Y);
                        localStorage.setItem("valueZ", values.Z);
                        console.log(values)
                        return values;
                    },
                    (error) => {
                        console.warn(error);
                    }
                );
            },
        },
        computed: {
        }
    }
</script>
<style scoped>
    canvas {
        width: 100vw;
        height: 100vh;
    }
</style>
