const fallbackApi = import.meta.env.DEV ? 'http://127.0.0.1:3100' : ''
const apiRoot = (import.meta.env.VITE_API_URL ?? fallbackApi).replace(/\/$/, '')

function buildUrl(path) {
  if (!apiRoot) return path
  if (apiRoot.endsWith('/api') && path.startsWith('/api/')) {
    return `${apiRoot}${path.slice(4)}`
  }
  return `${apiRoot}${path}`
}

async function request(path, options = {}) {
  const response = await fetch(buildUrl(path), {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {})
    },
    ...options
  })

  if (!response.ok) {
    let message = `Erreur ${response.status}`
    try {
      const payload = await response.json()
      if (payload?.error) {
        message = payload.error
      }
    } catch {
      // keep fallback message
    }
    throw new Error(message)
  }

  return response.json()
}

export const api = {
  async getPrograms() {
    const payload = await request('/api/programs')
    return payload.items ?? []
  },
  async getProgram(slug) {
    const payload = await request(`/api/programs/${encodeURIComponent(slug)}`)
    return payload.item
  },
  async getFaq() {
    const payload = await request('/api/faq')
    return payload.items ?? []
  },
  async getSite() {
    const payload = await request('/api/site')
    return payload.item ?? {}
  },
  async submitLead(data) {
    return request('/api/leads', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
}
