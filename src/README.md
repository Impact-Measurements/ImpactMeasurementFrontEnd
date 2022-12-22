# Impact measurement Front-end
<img src="https://uspc.nl/wp-content/uploads/2021/10/USPC-logo-wit-PNG.png" width="300">

### Content

- Npm packages
- API call's
- Vuetify

## Npm packages

### Apexcharts
Apexcharts is used to create all the diagrams and graphs, for further information on how to use them go to their <a href="https://apexcharts.com/docs/vue-charts">site </a>
**Installation:**
`npm install --save apexcharts`
`npm install --save vue-apexcharts`

### Axios
Axios is the package we used to call our API's, for further information on how to use it go to their site <a href="https://axios-http.com/docs/intro">site </a>
**Installation:**
`npm install axios`

### Three.js
Three.js is the package we used to form and render our three dimensional arrow, wich is used to show the direction of the impact, for further information on how to use it go to their site <a href="https://threejs.org/docs/#manual/en/introduction/Installation">site </a>
**Installation:**
`npm install three`

## API call's ##
All the API call's in this project can be found in the following files:

- [/components/partials/orientation/OrientationView.vue](https://github.com/Impact-Measurements/ImpactMeasurementFrontEnd/blob/Dashboard/src/components/partials/orientation/OrientationView.vue)
- [/components/partials/summary/BarStatsView.vue](https://github.com/Impact-Measurements/ImpactMeasurementFrontEnd/blob/Dashboard/src/components/partials/summary/BarStatsView.vue)
- [/components/partials/summary/ChartView.vue](https://github.com/Impact-Measurements/ImpactMeasurementFrontEnd/blob/Dashboard/src/components/partials/summary/ChartView.vue)
- [/components/partials/summary/ChooseTrainingView.vue](https://github.com/Impact-Measurements/ImpactMeasurementFrontEnd/blob/Dashboard/src/components/partials/summary/ChooseTrainingView.vue)
- [/components/partials/summary/ColumnView.vue](https://github.com/Impact-Measurements/ImpactMeasurementFrontEnd/blob/Dashboard/src/components/partials/summary/ColumnView.vue)
- [/components/partials/summary/SummaryView.vue](https://github.com/Impact-Measurements/ImpactMeasurementFrontEnd/blob/Dashboard/src/components/partials/summary/SummaryView.vue)
- [/components/partials/upload/UploadView.vue](https://github.com/Impact-Measurements/ImpactMeasurementFrontEnd/blob/Dashboard/src/components/partials/upload/UploadView.vue)

## Vuetify ##
### What is Vuetify?
Vuetify is a complete UI framework that is based on Vue.js and complies with the Material Design (MD) specification. This means that the core 
functions of both Vue and Material are available by default and can be improved by both communities. The goal is to provide 
developers with tools to create rich and engaging designs and user experiences. Vuetify is easy to learn and provides hundreds of 
carefully crafted components from the MD specification. It supports all modern browsers and is compatible with Vue CLI-3. It also 
provides basic templates for Simple HTML, Webpack, NUXT, PWA, Electron, A La Carte, Apache Cordova.

### Installation:
When setting up a new project you can add Vuetify with the following command:
`vue add vuetify`
