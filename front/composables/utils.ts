export const useUtils = () => {
  return {
    parseDate: (date: any): string => {
      return new Date(date).toLocaleDateString('en-US')
    }
  }
}
