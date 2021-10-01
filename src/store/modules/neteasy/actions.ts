/*
 * @Description: app actions
 * @Author: ZY
 * @Date: 2020-12-23 10:25:37
 * @LastEditors: scy😊
 * @LastEditTime: 2021-01-29 08:46:37
 */
import { ActionTree, ActionContext } from 'vuex'
import { RootState, useStore } from '@/store'
import { state, NetEasyState } from './state'
import { Mutations } from './mutations'
import { UserMutationTypes } from './mutation-types'
import { NetEasyActionTypes } from './action-types'
import { loginRequest, userInfoRequest } from '@/apis/netEasy'
import { removeToken, setToken } from '@/utils/cookies'
import { PermissionActionType } from '../permission/action-types'
import router, { resetRouter } from '@/router'
import { RouteRecordRaw } from 'vue-router'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<NetEasyState, RootState>, 'commit'>

export interface Actions {
  [NetEasyActionTypes.ACTION_NET_EASY_LOGIN](
    { commit }: AugmentedActionContext,
    userInfo: { email: string, password: string }
  ): void

  [NetEasyActionTypes.ACTION_RESET_TOKEN](
    { commit }: AugmentedActionContext
  ): void

  [NetEasyActionTypes.ACTION_GET_NE_USER_INFO](
    { commit }: AugmentedActionContext
  ): void

  [NetEasyActionTypes.ACTION_CHANGE_ROLES](
    { commit }: AugmentedActionContext, role: string
  ): void

  [NetEasyActionTypes.ACTION_LOGIN_OUT](
    { commit }: AugmentedActionContext,
  ): void
}

export const actions: ActionTree<NetEasyState, RootState> & Actions = {
  async [NetEasyActionTypes.ACTION_NET_EASY_LOGIN](
    { commit }: AugmentedActionContext,
    userInfo: { email: string, password: string }
  ) {
    let {
      email,
      password
    } = userInfo
    console.log(userInfo, 'userInfo')
    const a = 0
    if (a > 3) {
      commit(UserMutationTypes.SET_TOKEN, 'res.data.accessToken')
    }
    email = email.trim()
    await loginRequest({
      email,
      password
    }).then(async(res) => {
      console.log(res, 'res')
      if (res?.code === 0 && res.data.accessToken) {
        // setToken(res.data.accessToken)
        // commit(UserMutationTypes.SET_TOKEN, res.data.accessToken)
      }
    }).catch((err) => {
      console.log(err)
    })
  },

  [NetEasyActionTypes.ACTION_RESET_TOKEN](
    { commit }: AugmentedActionContext) {
    removeToken()
    commit(UserMutationTypes.SET_TOKEN, '')
    commit(UserMutationTypes.SET_ROLES, [])
  },

  async [NetEasyActionTypes.ACTION_GET_NE_USER_INFO](
    { commit }: AugmentedActionContext
  ) {
    if (state.token === '') {
      throw Error('token is undefined!')
    }
    const a = 0
    if (a > 3) {
      commit(UserMutationTypes.SET_TOKEN, 'res.data.accessToken')
      await userInfoRequest()
    }
    // await userInfoRequest().then((res) => {
    //   if (res?.code === 0) {
    //     commit(UserMutationTypes.SET_ROLES, res.data.roles)
    //     commit(UserMutationTypes.SET_NAME, res.data.name)
    //     commit(UserMutationTypes.SET_AVATAR, res.data.avatar)
    //     commit(UserMutationTypes.SET_INTRODUCTION, res.data.introduction)
    //     commit(UserMutationTypes.SET_EMAIL, res.data.email)
    //     return res
    //   } else {
    //     throw Error('Verification failed, please Login again.')
    //   }
    // })
  },

  async [NetEasyActionTypes.ACTION_CHANGE_ROLES](
    { commit }: AugmentedActionContext,
    role: string
  ) {
    const token = role + '-token'
    const store = useStore()
    commit(UserMutationTypes.SET_TOKEN, token)
    setToken(token)
    await store.dispatch(NetEasyActionTypes.ACTION_GET_NE_USER_INFO, undefined)
    store.dispatch(PermissionActionType.ACTION_SET_ROUTES, state.roles)
    store.state.permission.dynamicRoutes.forEach((item: RouteRecordRaw) => {
      router.addRoute(item)
    })
  },

  [NetEasyActionTypes.ACTION_LOGIN_OUT](
    { commit }: AugmentedActionContext
  ) {
    console.log(commit)
    removeToken()
    commit(UserMutationTypes.SET_TOKEN, '')
    commit(UserMutationTypes.SET_ROLES, [])
    resetRouter()
  }
}
