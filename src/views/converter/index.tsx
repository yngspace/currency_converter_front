import ValuteCard from '@/components/valute-card'
import { Valute } from '@/core/types'
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import DefaultSelect from '../../components/default-select/index.vue'

export default defineComponent({
  setup () {
    const { valuteList } = (useStore()).state
    const baseValute = ref<Valute>(new Valute())
    const targetValute = ref<Valute>(new Valute())
    const isEachSelected = computed(() => baseValute.value.id !== '' && targetValute.value.id !== '')
    const nominal = ref<number>(baseValute.value.nominal || 0)
    const exchangePrice = computed(() => Number((baseValute.value.value / targetValute.value.value) * nominal.value).toFixed(3))
    const replace = (base: Valute, target: Valute) => {
      baseValute.value = target
      targetValute.value = base
    }

    return () => (
      <div class='screen'>
        <div class='screen-top-panel'>
          <div class='container flexbar'>
            <h1>Конвертер</h1>
          </div>
        </div>
        <div class='container'>
          <div class='flex-center'>
            <div>
              <span>У меня есть</span>
              <DefaultSelect
                items={valuteList}
                modelValue={baseValute.value}
                titleKey='name'
                onValueChange={(v: Valute) => { baseValute.value = v }}
                placeholder='Выберите валюту'
              />
            </div>
            <div>
              <span>Хочу приобрести</span>
              <DefaultSelect
                items={valuteList}
                modelValue={targetValute.value}
                titleKey='name'
                onValueChange={(v: Valute) => { targetValute.value = v }}
                placeholder='Выберите валюту'
              />
            </div>
          </div>
          {isEachSelected.value && <div class='valute-card-list mt-3'>
            <ValuteCard item={baseValute.value} forComparison={targetValute.value} key={baseValute.value.id}>
              <div class='mt-2'>
                <div>Количество:</div>
                <input
                  class='valute-card-exchange-value input'
                  type='number'
                  value={nominal.value}
                  onInput={(e: Event) => { nominal.value = +(e.target as HTMLInputElement).value }}/>
              </div>
            </ValuteCard>
            <ValuteCard item={targetValute.value} forComparison={baseValute.value} key={targetValute.value.id}>
              <div class='mt-2'>
                <div>Стоимость:</div>
                <span class='valute-card-exchange-value'>{exchangePrice.value}</span>
              </div>
            </ValuteCard>
          </div>}
          {isEachSelected.value && <div class='flex-center mt-1'>
            <button class='primary-button' onClick={() => { replace(baseValute.value, targetValute.value) }}>Поменять</button>
          </div>}
          {!isEachSelected.value && <p class='mt-3'>Выберите обе валюты</p>}
        </div>
      </div>
    )
  }
})
