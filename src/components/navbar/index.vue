<script lang='tsx'>
import { NavElement } from '@/core/types'
import { PropType, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<NavElement[]>,
      required: true
    }
  },
  setup (props) {
    const route = useRoute()
    return () => (
      <div class='navbar pt-2 pb-2'>
        <div class='container'>
          <div class='flex-center'>
            { props.items.map(item =>
              <div class={{ 'navbar-item ml-2 mr-2': true, active: item.path === route.path }}>
                <router-link to={{ name: item.name, path: item.path }}>{item.title}</router-link>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
})
</script>

<style lang="sass" scoped>
@import '@/styles/vars'
.navbar
  background-color: $primary-color

.navbar-item
  transition: opacity .2s
  font-size: 20px
  a
    color: $gray
  &.active
    opacity: .6
    cursor: default
</style>
