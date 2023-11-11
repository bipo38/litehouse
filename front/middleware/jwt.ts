export default defineNuxtRouteMiddleware((to, from) => {
    if(!useCookie('jwt').value){
        return navigateTo("/signin")
    }

    return navigateTo("/reports")
})