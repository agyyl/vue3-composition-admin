/*
 * @Description:
 * @Autor: WJM
 * @Date: 2021-01-18 14:46:51
 * @LastEditors: yyl
 * @LastEditTime: 2021-09-26 01:39:54
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

// 计划目录:歌单 我的歌单, 我收藏的歌单 / 本地音乐 / 我的云盘
const nestedRouter: Array<RouteRecordRaw> = [{
  path: '/net-easy',
  component: Layout,
  redirect: 'net-easy',
  name: 'netEasy',
  meta: {
    title: 'netEasy',
    icon: '#iconexample'
  },
  children: [
    // {
    //   path: '/login',
    //   component: 'views/login/index',
    //   meta: { hidden: true }
    // },
    {
      path: '/net-easy-login',
      component: () => import(/* webpackChunkName: "net-easy" */ '@/views/net-easy/login.vue'),
      name: 'netEasyLogin',
      meta: { title: 'netEasyLogin' }
    },
    {
      path: '/song-list',
      component: () => import(/* webpackChunkName: "net-easy" */ '@/views/net-easy/song-list/Index.vue'),
      name: 'songList',
      meta: {
        title: 'songList',
        noCache: true
      },
      children: [
        {
          path: 'mySongList',
          component: () => import(/* webpackChunkName: "menu1-1" */ '@/views/net-easy/song-list/my-song-list/Index.vue'),
          name: 'mySongList',
          meta: { title: 'mySongList' }
        },
        {
          path: 'menu1-2',
          component: () => import(/* webpackChunkName: "menu1-2" */ '@/views/nested/menu1/menu1-2/Index.vue'),
          name: 'Menu1-2',
          meta: { title: 'menu1-2' },
          children: [
            {
              path: 'menu1-2-1',
              component: () => import(/* webpackChunkName: "menu1-2-1" */ '@/views/nested/menu1/menu1-2/menu1-2-1/Index.vue'),
              name: 'Menu1-2-1',
              meta: { title: 'menu1-2-1' }
            },
            {
              path: 'menu1-2-2',
              component: () => import(/* webpackChunkName: "menu1-2-2" */ '@/views/nested/menu1/menu1-2/menu1-2-2/Index.vue'),
              name: 'Menu1-2-2',
              meta: { title: 'menu1-2-2' }
            }
          ]
        },
        {
          path: 'menu1-3',
          component: () => import(/* webpackChunkName: "menu1-3" */ '@/views/nested/menu1/menu1-3/Index.vue'),
          name: 'Menu1-3',
          meta: { title: 'menu1-3' }
        }
      ]
    },
    {
      path: 'menu2',
      component: () => import(/* webpackChunkName: "menu2" */ '@/views/nested/menu2/Index.vue'),
      name: 'Menu2',
      meta: { title: 'menu2' }
    }
  ]
}]

export default nestedRouter
