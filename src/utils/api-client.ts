interface Options {
  data?: any
  token?: any
  configHeader?: any
  options?: any
}

async function client(endpoint: string, { data, token, configHeader, options }: Options) {
  const config: any = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...configHeader
    },
    ...options
  }

  return window.fetch(endpoint, config).then(async response => {
    const data = await response.json()
    return data
  })
}

export { client }