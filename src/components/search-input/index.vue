<script lang='tsx'>
import { defineComponent, PropType, ref, watch } from 'vue'
import { useDebounce } from '../../composables/use-debounce'

export default defineComponent({
  props: {
    placeholder: {
      type: String,
      default: 'Поиск'
    },
    onValueChange: {
      type: Function as PropType<(v: string) => void>,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const modelValue = ref<string>('')
    watch(modelValue, useDebounce(() => {
      props.onValueChange(modelValue.value)
    }, 400))

    return () => (
      <label class='search-input'>
        <span class='search-input-placeholder'>{props.placeholder}</span>
        <input type='text' disabled={props.disabled} onInput={(e: Event) => { modelValue.value = (e.target as HTMLInputElement).value }}/>
        <div class='search-input-icon flex-center'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" type="submit" aria-label="Поиск">
            <path fill="#fff" d="M11 5a6 6 0 1 0 0 12c1.619 0 3.169-.639 4.24-1.656a1.101 1.101 0 0 1 1.537.019l4.93 4.93a1 1 0 0 1-1.414 1.414l-4.346-4.346A8.298 8.298 0 0 1 11 19a8 8 0 1 1 7.875-6.587 1 1 0 0 1-1.968-.351A6 6 0 0 0 11 5Z"/>
          </svg>
        </div>
      </label>
    )
  }
})
</script>

<style lang="sass" scoped>
@import @/styles/main

.search-input
  position: relative
  width: 300px
  border: 1px solid $primary-color
  display: flex
  flex-direction: column
  padding: 6px
  .search-input-placeholder
    font-size: 12px
  input
    background: transparent
    border: none
    outline: none
    padding: 0
  .search-input-icon
    position: absolute
    right: 0
    top: 0
    width: 40px
    height: 100%
    background-color: $primary-color
</style>