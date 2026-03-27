import { computed } from 'vue'
import { useRoute } from 'vue-router'

export const EXPERIENCE_QUERY_KEY = 'experience'

export const EXPERIENCE_VARIANTS = Object.freeze({
  'orientation-hub': Object.freeze({
    slug: 'orientation-hub',
    previewLabel: 'Orientation'
  }),
  'career-journey': Object.freeze({
    slug: 'career-journey',
    previewLabel: 'Parcours'
  }),
  'program-first-marketplace': Object.freeze({
    slug: 'program-first-marketplace',
    previewLabel: 'Programme'
  })
})

export function normalizeExperienceVariant(value) {
  const normalizedValue = Array.isArray(value) ? value[0] : value

  if (typeof normalizedValue !== 'string') {
    return null
  }

  return EXPERIENCE_VARIANTS[normalizedValue]?.slug ?? null
}

function withExperienceVariantInPath(target, variant) {
  if (!target || target.startsWith('#') || /^[a-z]+:/i.test(target)) {
    return target
  }

  const hashIndex = target.indexOf('#')
  const hash = hashIndex >= 0 ? target.slice(hashIndex) : ''
  const pathAndSearch = hashIndex >= 0 ? target.slice(0, hashIndex) : target
  const queryIndex = pathAndSearch.indexOf('?')
  const path = queryIndex >= 0 ? pathAndSearch.slice(0, queryIndex) : pathAndSearch
  const search = queryIndex >= 0 ? pathAndSearch.slice(queryIndex + 1) : ''
  const params = new URLSearchParams(search)

  if (variant) {
    params.set(EXPERIENCE_QUERY_KEY, variant)
  } else {
    params.delete(EXPERIENCE_QUERY_KEY)
  }

  const nextQuery = params.toString()

  return `${path}${nextQuery ? `?${nextQuery}` : ''}${hash}`
}

export function withExperienceVariant(target, variant) {
  const normalizedVariant = normalizeExperienceVariant(variant)

  if (typeof target === 'string') {
    return withExperienceVariantInPath(target, normalizedVariant)
  }

  if (!target || typeof target !== 'object') {
    return target
  }

  const nextTarget = { ...target }
  const nextQuery = { ...(target.query ?? {}) }

  if (normalizedVariant) {
    nextQuery[EXPERIENCE_QUERY_KEY] = normalizedVariant
  } else {
    delete nextQuery[EXPERIENCE_QUERY_KEY]
  }

  if (Object.keys(nextQuery).length > 0) {
    nextTarget.query = nextQuery
  } else {
    delete nextTarget.query
  }

  return nextTarget
}

export function useExperienceVariant() {
  const route = useRoute()

  const experienceVariant = computed(() =>
    normalizeExperienceVariant(route.query[EXPERIENCE_QUERY_KEY])
  )
  const experienceVariantMeta = computed(() =>
    experienceVariant.value ? EXPERIENCE_VARIANTS[experienceVariant.value] : null
  )
  const hasExperienceVariant = computed(() => Boolean(experienceVariant.value))
  const experiencePreviewLabel = computed(
    () => experienceVariantMeta.value?.previewLabel ?? ''
  )

  // Legacy query support remains readable on incoming URLs, but the public
  // site no longer propagates preview variants through navigation.
  const toWithExperience = (target) => target

  return {
    experienceVariant,
    experienceVariantMeta,
    hasExperienceVariant,
    experiencePreviewLabel,
    toWithExperience
  }
}
