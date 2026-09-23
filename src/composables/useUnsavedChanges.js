import { onBeforeUnmount, onMounted, ref, toValue } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

export function useUnsavedChanges(isDirty, message = 'You have unsaved changes. Leave anyway?') {
  const showLeaveDialog = ref(false)
  let resolveLeave = null

  // The guard holds navigation by returning a pending promise; the dialog
  // settles it confirm lets the navigation through, cancel keeps us here.
  onBeforeRouteLeave(() => {
    if (toValue(isDirty)) {
      showLeaveDialog.value = true
      return new Promise((resolve) => {
        resolveLeave = resolve
      })
    }
  })

  function settleLeave(allowed) {
    showLeaveDialog.value = false
    resolveLeave?.(allowed)
    resolveLeave = null
  }

  // beforeunload can't show custom UI browsers only allow the native prompt.
  function warnOnUnload(event) {
    if (toValue(isDirty)) {
      event.preventDefault()
      event.returnValue = ''
    }
  }

  onMounted(() => window.addEventListener('beforeunload', warnOnUnload))
  onBeforeUnmount(() => window.removeEventListener('beforeunload', warnOnUnload))

  return {
    showLeaveDialog,
    leaveMessage: message,
    confirmLeave: () => settleLeave(true),
    cancelLeave: () => settleLeave(false),
  }
}
