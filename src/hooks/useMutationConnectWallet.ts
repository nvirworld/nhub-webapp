import { useMutation, useQueryClient } from '@tanstack/react-query'
import { connectWallet } from '../services/web3.service'
import { setWalletStatus } from '../services/localStorage.service'
import { useRecoilState } from 'recoil'
import { walletStatusState } from '../recoil/wallet'

export const useMutationConnectWallet = () => {
  const [, setWallet] = useRecoilState(walletStatusState)
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: connectWallet,
    onSuccess: () => {
      setWalletStatus('connected')
      setWallet('connected')
      queryClient.invalidateQueries(['MyWallet'])
    }
  })
}
