// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!useAuth().check()) {
    if (to.path !== '/signin') {
      return navigateTo('/signin', { replace: true })
    }
  }

  const logged = await useAuth().ping()

  if (!logged) {
    if (to.path !== '/signin') {
      useCookie('jwt').value = null
      useState('authUser').value = {}

      return navigateTo('/signin')
    }
  }
})
