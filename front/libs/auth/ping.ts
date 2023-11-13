export const ping = async (): Promise<boolean> => {
  const loggedIn = useCookie('jwt')

  if (!loggedIn.value) {
    return false
  }

  const user = useState('authUser')

  const result = await useApi().get('/api/user')

  if (result && result.ok) {
    user.value = result.data

    return result.ok
  }

  return false
}
