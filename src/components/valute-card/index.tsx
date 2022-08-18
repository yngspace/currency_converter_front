import { defaultValute, Valute } from '@/core/types'
import { computed, ComputedRef, defineComponent, PropType } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Valute>,
      required: true
    },
    forComparison: {
      type: Object as PropType<Valute>,
      default: defaultValute
    },
    selectable: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { slots }) {
    const diffPrices: ComputedRef<string> = computed(() => Number(props.item.value - props.item.previous).toFixed(3))
    const isIncreased: ComputedRef<boolean> = computed(() => props.item.value >= props.item.previous)
    const priceValue: ComputedRef<string> = computed(() => Number((props.item.value / props.forComparison.value) * props.forComparison.nominal).toFixed(3))
    const { commit } = useStore()

    return () => (
      <div class='valute-card'>
        <div class='valute-card-header flex'>
          <h3>{props.item.name}</h3>
          <span>({props.item.charCode})</span>
        </div>
        <div class='valute-card-body'>
          <div>
            <span>{props.item.nominal} {props.item.charCode} = {priceValue.value} {props.forComparison.charCode}</span>
          </div>
          <div class='mt-2'>
          </div>
          <div class='mt-2'>
            <span>От предыдущего значения: </span>
            <span class={
              { 'valute-card-diff-price': true, increased: isIncreased.value }
            }>{ diffPrices.value }</span>
          </div>
        </div>
        {props.selectable && <div class='mt-2'>
          <button class='primary-button' onClick={() => commit('setSelectedValute', props.item)}>
            Выбрать как основную валюту
          </button>
        </div>}
        {slots.default && slots.default()}
      </div>
    )
  }
})
