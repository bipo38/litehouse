export default defineNuxtRouteMiddleware((_to, _from) => {
  if (!useCookie('jwt').value) {
    return navigateTo('/signin')
  }

  return navigateTo('/reports')
})
