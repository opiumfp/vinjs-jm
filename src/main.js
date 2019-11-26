// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'

import '../assets/styles/bootstrap.scss'
// import '../node_modules/bootstrap/js/src/dropdown'
import '../node_modules/bootstrap/js/src/collapse'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
