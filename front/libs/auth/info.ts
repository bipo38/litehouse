export const check = (): boolean => {
  return !!useCookie('jwt').value
}
