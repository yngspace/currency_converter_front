import { defaultValute, Valute, ValuteDeserialized } from '../core/types'
import axios from 'axios'
import { createStore } from 'vuex'
import { Ref, ref } from 'vue'

const endpoint = 'https://www.cbr-xml-daily.ru/daily_json.js'

interface State {
  valuteList: Valute[],
  selectedValute: Ref<Valute>
}

export const Store = createStore<State>({
  state () {
    return {
      valuteList: [],
      selectedValute: ref(new Valute())
    }
  },
  mutations: {
    setValuteList (state: State, items: Valute[]) {
      console.log(items)
      state.valuteList = items
    },
    setSelectedValute (state: State, item: Valute) {
      state.selectedValute.value = item
    }
  },
  actions: {
    async fetchValute ({ commit }) {
      try {
        const { data } = await axios.get(endpoint)
        commit('setValuteList', Object.values(data.Valute).map(item => new Valute((item as ValuteDeserialized))))
        commit('setSelectedValute', defaultValute)
      } catch (e) {
        alert('Ошибка загрузки валюты')
      }
    }
  }
})
