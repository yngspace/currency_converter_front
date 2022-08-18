<script lang='tsx'>
import { defineComponent, onMounted } from 'vue'
import { NavElement } from './core/types'
import { useStore } from 'vuex'
import Navbar from './components/navbar/index.vue'

export default defineComponent({
  setup () {
    const { dispatch } = useStore()
    const navElementList: NavElement[] = [
      { title: 'Список валют', path: '/', name: 'index' },
      { title: 'Конвертер', path: '/converter', name: 'converter' }
    ]

    onMounted(() => dispatch('fetchValute'))

    return () => (
      <div class='page-wrapper'>
        <header>
          <Navbar items={navElementList}/>
        </header>
        <router-view/>
      </div>
    )
  }
})
</script>

<style lang="sass">
@import './styles/main'
</style>
