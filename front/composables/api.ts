export interface res {
  data?: any;
  ok: boolean;
}
export type response = res | null;

export const useApi = () => {
  return {
    request: (
      method: string,
      path: string,
      options: any = {}
    ): Promise<response> => {
      return api(path, method, options)
    },

    get: (path: string, options: any = {}): Promise<response> => {
      return api(path, 'GET', options)
    },

    post: (path: string, options: any = {}): Promise<response> => {
      return api(path, 'POST', options)
    },

    delete: (path: string, options: any = {}): Promise<response> => {
      return api(path, 'DELETE', options)
    }
  }
}

const api = async (
  path: string,
  method: string,
  options: any
): Promise<response> => {
  const url = fullUrl(path)

  if (options.headers === undefined) {
    options.headers = {}
  }

  options.credentials = 'include'

  if (process.server) {
    options.headers = useRequestHeaders(['cookie', 'user-agent'])
  }

  options.headers.accept = 'application/json'

  options.method = method

  return (await $fetch(url, options).catch(error => error.data)) as response
}
const fullUrl = (path: string) => {
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl

  if (path.startsWith('http://') || path.startsWith('http://')) {
    return path
  } else if (path.startsWith('/')) {
    return apiUrl + path
  }

  return apiUrl + '/' + path
}
