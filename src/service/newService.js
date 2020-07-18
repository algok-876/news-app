import axios from 'axios'
import { AppCode } from './config'

const $http = axios.create({
  baseURL: 'http://ali-news.showapi.com',
  headers: {
    Authorization: `APPCODE ${AppCode}`
  }
})

export const getChannel = async () => {
  const res = await $http.get('/channelList')
  return res.data
}
