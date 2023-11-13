// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtRouteMiddleware((to, from) => {
  if (useAuth().check()) {
    return navigateTo('/reports')
  }
})
