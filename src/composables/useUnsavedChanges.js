import { onBeforeUnmount, onMounted, toValue } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

export function useUnsavedChanges(isDirty, message = 'You have unsaved changes. Leave anyway?') {
  onBeforeRouteLeave(() => {
    if (toValue(isDirty)) {
      return window.confirm(message)
    }
  })

  function warnOnUnload(event) {
    if (toValue(isDirty)) {
      event.preventDefault()
      event.returnValue = ''
    }
  }

  onMounted(() => window.addEventListener('beforeunload', warnOnUnload))
  onBeforeUnmount(() => window.removeEventListener('beforeunload', warnOnUnload))
}
