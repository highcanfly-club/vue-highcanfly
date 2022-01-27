function getDescription(vm) {
  const { description, } = vm.$options
  if (description) {
    return typeof description === 'function'
      ? description.call(vm)
      : description
  }
}

function getTitle(vm) {
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title
  }
}

export default {
  created() {
    const title = getTitle(this)
    const description = getDescription(this);

    if (title) {
      document.title = title
    }
    if (description) {
      document.querySelector('meta[name="description"]')
        .setAttribute('content', description);
    }
  }
}