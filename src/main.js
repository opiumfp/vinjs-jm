// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import '../assets/styles/main.scss'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // Add inline CSS
  // head.style.push({
  //   type: 'text/css',
  //   cssText: '.some-custom-css {color: red}'
  // })

  // Add an external CSS file
  // head.link.push({
  //   rel: 'stylesheet',
  //   href: 'https://some-server.com/external-styleheet.css'
  // })

  // Add an external Javascript before the closing </body> tag
  // head.script.push({
  //   src: 'https://some-server.com/external-script.js',
  //   body: true
  // })

  // Add a meta tag
  // head.meta.push({
  //   name: 'keywords',
  //   content: 'HTML,CSS,XML,JavaScript',
  //   charset: 'utf-8',
  // })



}


