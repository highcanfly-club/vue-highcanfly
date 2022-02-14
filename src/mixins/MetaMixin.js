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

function getCanonical(vm) {
  const { canonical } = vm.$options
  if (canonical) {
    return typeof canonical === 'function'
      ? canonical.call(vm)
      : canonical
  }
}

export default {
  created() {
    const title = getTitle(this)
    const description = getDescription(this);
    const canonical = getCanonical(this);

    if (title) {
      document.title = title
    }
    if (description) {
      document.querySelector('meta[name="description"]')
        .setAttribute('content', description);
    }
    if (canonical) {
      document.querySelector('link[rel="canonical"]').href = canonical;
        
    }
  }
}