import { getChannel } from '../service/newService'

export default {
  namespaced: true,
  state: {
    channelList: []
  },
  mutations: {
    setNewsChannel (state, channelList) {
      state.channelList = channelList
    }
  },
  actions: {
    async getNewsChannel (context) {
      const res = await getChannel()
      context.commit('setNewsChannel', res.showapi_res_body.channelList)
    }
  }
}
