export const useUtils = () => {
  return {
    parseDate: (date: any): string => {
      return new Date(date).toLocaleDateString('en-US')
    },

    deepClone: (element: any): any => {
      return structuredClone(toRaw(element))
    },
    parseUrl: (url: string): string => {
      if (!url.startsWith('https://') || !url.startsWith('http://')) {
        return 'https://'.concat(url)
      }
      return url
    },

    removeElements: (filtered: Array<any>, values: Array<any>) : Array<any> => {
      return filtered.filter((_, i) => !values.includes(i))
    }
  }
}
