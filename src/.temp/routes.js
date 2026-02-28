const c1 = () => import(/* webpackChunkName: "page--src-pages-policy-vue" */ "C:\\Projects\\vinjs-jm\\src\\pages\\Policy.vue")
const c2 = () => import(/* webpackChunkName: "page--src-pages-about-vue" */ "C:\\Projects\\vinjs-jm\\src\\pages\\About.vue")
const c3 = () => import(/* webpackChunkName: "page--node-modules-gridsome-app-pages-404-vue" */ "C:\\Projects\\vinjs-jm\\node_modules\\gridsome\\app\\pages\\404.vue")
const c4 = () => import(/* webpackChunkName: "page--src-pages-index-vue" */ "C:\\Projects\\vinjs-jm\\src\\pages\\Index.vue")

export default [
  {
    path: "/policy/",
    component: c1
  },
  {
    path: "/about/",
    component: c2
  },
  {
    name: "404",
    path: "/404/",
    component: c3
  },
  {
    name: "home",
    path: "/",
    component: c4
  },
  {
    name: "*",
    path: "*",
    component: c3
  }
]
