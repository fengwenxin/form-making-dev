import Vue from 'vue'
import Router from 'vue-router'

import Home from '../demo/Home.vue'
import LanguageView from './LanguageView.vue'
<<<<<<< HEAD
import preview from '../demo/preView.vue'
=======
import renderform from '../demo/renderForm.vue'
>>>>>>> 65e2240164023ddc2fda7c53f97948ab8e096da8

Vue.use(Router)

const language = localStorage.getItem('language') || (navigator.language == 'zh-CN' ? 'zh-CN' : 'en-US')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: to => ({name: 'index', params: {lang: language}})
    },
    {
      path: '/preview',
<<<<<<< HEAD
      redirect: to => ({name: 'preview', params: {lang: language}})
=======
      redirect: to => ({name: 'renderform', params: {lang: language}})
>>>>>>> 65e2240164023ddc2fda7c53f97948ab8e096da8
    },
    {
      path: '/:lang',
      // name: 'lang',
      component: LanguageView,
      children: [
        {
          path: '',
          name: 'index',
          component: Home
        },
        {
          path: '/preview',
<<<<<<< HEAD
          name: 'preview',
          component: preview
=======
          name: 'renderform',
          component: renderform
>>>>>>> 65e2240164023ddc2fda7c53f97948ab8e096da8
        }
      ]
    }
  ]
})