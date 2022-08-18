import { computed, ComputedRef, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import SearchInput from '../../components/search-input/index.vue'
import ValuteCard from '@/components/valute-card'
import { Valute } from '@/core/types'

export default defineComponent({
  setup () {
    const searchValue = ref<string>('')
    const { valuteList, selectedValute } = (useStore()).state

    const currentValuteList: ComputedRef<Valute[]> = computed(() => {
      if (!searchValue.value.trim()) return valuteList
      return valuteList.filter(
        (v: Valute) =>
          v.name.toLowerCase().indexOf(searchValue.value.toLowerCase()) + 1 ||
          v.charCode.toLowerCase().indexOf(searchValue.value.toLowerCase()) + 1)
    })

    return () => (
      <div class='screen'>
        <div class='screen-top-panel'>
          <div class='container flexbar'>
            <h1>Список Валют</h1>
            <SearchInput
              placeholder='по названию валюты или её коду'
              onValueChange={(v: string) => { searchValue.value = v }}
            />
          </div>
        </div>
        <div class='container'>
          <div class='valute-card-list'>
            {currentValuteList.value.map(item =>
              <ValuteCard
                item={item}
                forComparison={selectedValute.value}
                selectable={true}
                key={item.id}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
})
