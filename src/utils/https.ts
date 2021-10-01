/*
 * @Description: axios 封装网络请求
 * @Author: ZY
 * @Date: 2020-12-28 14:45:32
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-25 20:01:32
 */

import { useStore } from '@/store'
import HttpClient, { HttpClientConfig } from 'axios-mapper'
import networkConfig from '@/config/default/net.config'
const https = (hasToken: Boolean = true) => {
  const config: HttpClientConfig = {
    baseURL: networkConfig.host,
    headers: {
      token: hasToken ? useStore().state.user.token : ''
      // withCredentials: hasToken ? !useStore().state.user.token || true : ''
    }
  }
  return new HttpClient(config)
}

export default https

export const nHttps = (hasToken: Boolean = true) => {
  const config: HttpClientConfig = {
    baseURL: networkConfig.nHost,
    headers: {
      // token: hasToken ? useStore().state.user.token : '',
      withCredentials: true
      // withCredentials: hasToken ? !useStore().state.user.token || true : ''
    }
  }
  if (hasToken) {
    console.log(hasToken, 'hasToken')
  }
  return new HttpClient(config)
}
