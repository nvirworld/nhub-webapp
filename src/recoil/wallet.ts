import { atom } from 'recoil'

export const walletStatusState = atom<String>({
  key: 'wallet',
  default: 'disconnected'
})
