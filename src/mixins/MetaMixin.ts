import type { ComponentPublicInstance } from 'vue'

function getDescription (vm:ComponentPublicInstance) {
  const { description } = vm.$options
  if (description) {
    return typeof description === 'function'
      ? description.call(vm)
      : description
  }
}

function getTitle (vm:ComponentPublicInstance) {
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title
  }
}

function getCanonical (vm:ComponentPublicInstance) {
  const { canonical } = vm.$options
  if (canonical) {
    return typeof canonical === 'function'
      ? canonical.call(vm)
      : canonical
  }
}

export default {
  created () {
    const title = getTitle(this) as string
    const description = getDescription(this) as string
    const canonical = getCanonical(this) as string

    if (title) {
      document.title = title
    }
    if (description) {
      document.querySelector('meta[name="description"]')
        .setAttribute('content', description)
    }
    if (canonical) {
      (document.querySelector('link[rel="canonical"]') as HTMLLinkElement).href = canonical
    }
  }
}

export function setMeta(canonical: string, title: string, description: string) {
  const link = !!document.querySelector("link[rel='canonical']") ? document.querySelector("link[rel='canonical']") as HTMLLinkElement : document.createElement('link') as HTMLLinkElement;
  link.setAttribute('rel', 'canonical');
  link.setAttribute('href', canonical);
  document.head.appendChild(link);
  const titleTag = !!document.querySelector("title") ? document.querySelector("title") as HTMLTitleElement : document.createElement('title') as HTMLTitleElement;
  titleTag.innerHTML = title
  document.head.appendChild(titleTag);
  const metaDescription = !!document.querySelector("meta[name='description']") ? document.querySelector("meta[name='description']") as HTMLMetaElement : document.createElement('meta') as HTMLMetaElement;
  metaDescription.setAttribute('content', description);
  document.head.appendChild(metaDescription);
}