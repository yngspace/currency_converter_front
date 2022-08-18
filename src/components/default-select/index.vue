<script lang='tsx'>
import { defineComponent, PropType, Ref, ref, Transition } from 'vue'
import { useClickOutside } from '../../composables/use-click-outside'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    placeholder: {
      type: String
    },
    idKey: {
      type: String,
      default: 'id'
    },
    titleKey: {
      type: String,
      default: 'name'
    },
    onValueChange: {
      type: Function,
      required: true
    },
    items: {
      type: Array as PropType<any[]>,
      required: true
    }
  },
  setup (props) {
    const rootElement = ref(null) as unknown as Ref<HTMLElement>
    const isOpen = ref<boolean>(false)
    const toggle = () => {
      isOpen.value = !isOpen.value
    }

    useClickOutside(rootElement, () => { isOpen.value = false })

    return () => (
      <div class={{ 'default-select': true, open: isOpen.value }} ref={rootElement}>
        <div class='default-select-header flexbar' onClick={toggle}>
          <div class='default-select-placeholder'>{ props.modelValue[props.titleKey] ? props.modelValue[props.titleKey] : props.placeholder }</div>
          <div class='default-select-arrow' onClick={toggle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" class="ui-w0">
              <path d="M11.8 6.6l-3 4a1 1 0 01-1.6 0l-3-4A1 1 0 015 5h6a1 1 0 01.8 1.6z" fill="#001a34"/>
            </svg>
          </div>
        </div>
        <Transition
          enterToClass='dropdown-enter'
          enterActiveClass='dropdown-enter'
          leaveToClass='dropdown-out'
          leaveActiveClass='dropdown-out'
        >
          {isOpen.value && <div class='default-select-dropdown'>
            <div class='default-select-options-list'>
              {props.items.map(item =>
                <div
                  onClick={() => { props.onValueChange(item); toggle() }}
                  class={{ 'default-select-options-item': true, selected: props.modelValue[props.idKey] === item[props.idKey] }}
                >{item[props.titleKey]}</div>
              )}
            </div>
          </div>}
        </Transition>

      </div>
    )
  }
})
</script>

<style lang="sass" scoped>
@import @/styles/vars
.default-select-header
  padding: 8px 16px
  border: 1px solid $primary-color
  width: 300px
  box-sizing: border-box
  height: 38px
.default-select
  &.open
    .default-select-arrow
      transform: rotate(180deg)
.default-select-dropdown
  position: absolute
  max-height: 250px
  overflow: auto
  width: 300px
  border: 1px solid $primary-color
  background-color: #fff
  transform-origin: top
  transition: .3s
.default-select-options-item
  padding: 8px 16px
  &.selected
    background-color: $gray
.default-select-arrow
  transition: transform .3s

.dropdown-enter, .dropdown-out
  transform: scaleY(0)
</style>