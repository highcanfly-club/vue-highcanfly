function getTitle(vm) {
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title
  }
}
function getAppendToTitle(vm) {
  const { append_to_title } = vm.$options
  if (append_to_title) {
    return typeof append_to_title === 'function'
      ? append_to_title.call(vm)
      : append_to_title
  }
}
export default {
  created() {
    const title = getTitle(this)
    const append_to_title = getAppendToTitle(this);
    if (append_to_title) {
      document.title += append_to_title
    } else
      if (title) {
        document.title = title
      }
  }
}