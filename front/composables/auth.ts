import { ping } from '~/libs/auth/ping'
import { check } from '~/libs/auth/info'

export const useAuth = () => {
  return {
    ping,
    check
  }
}
