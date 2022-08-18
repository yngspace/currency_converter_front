import { onMounted, onBeforeUnmount, Ref } from 'vue'

export function useClickOutside (element: Ref<HTMLElement|null>|Ref<HTMLElement|null>[], callback: () => void, root?: Ref<HTMLElement|null>): void {
  const clickOutside = (event: any) => {
    const targets = []

    if (Array.isArray(element)) {
      targets.push(...element)
    } else {
      targets.push(element)
    }

    const path = event.path || (event.composedPath && event.composedPath())
    let isClickOutside = true

    targets.forEach(target => {
      isClickOutside = isClickOutside && (
        path
          ? path.indexOf(target.value) < 0
          : !target.value?.contains(event.target)
      )
    })

    if (isClickOutside) callback()
  }

  onMounted(() => {
    const clickRoot = root?.value ?? document
    clickRoot.addEventListener('click', clickOutside)
  })

  onBeforeUnmount(() => {
    const clickRoot = root?.value ?? document
    clickRoot.removeEventListener('click', clickOutside)
  })
}
