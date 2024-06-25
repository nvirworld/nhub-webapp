import { useMutation, useQueryClient } from '@tanstack/react-query'
import { setWalletStatus } from '../services/localStorage.service'
import { useRecoilState } from 'recoil'
import { walletStatusState } from '../recoil/wallet'

export const useMutationDisconnectWallet = () => {
  const [, setWallet] = useRecoilState(walletStatusState)
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {},
    onSuccess: () => {
      setWalletStatus('disconnected')
      setWallet('disconnected')
      queryClient.invalidateQueries(['MyWallet'])
    }
  })
}
