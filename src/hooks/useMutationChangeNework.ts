import { useMutation, useQueryClient } from '@tanstack/react-query'
import { changeNetwork } from '../services/web3.service'
import { IMyWallet, INetwork } from '../types/entity.type'
import { setLocalNetworkChainId } from '../services/localStorage.service'

export const useMutationChangeNework = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: mutateChangeNetwork,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['MyWallet'])
      await queryClient.invalidateQueries(['CurrentNetwork'])
      await queryClient.invalidateQueries(['Poolv4s'])
    }
  })
}
export interface IMutateChangeNetwork {
  network: INetwork
  wallet: IMyWallet | null
}

const mutateChangeNetwork = async (params: IMutateChangeNetwork) => {
  if (params.wallet) {
    await changeNetwork(params.network)
    window.location.reload()
  }
  setLocalNetworkChainId(params.network.chainId)
  window.location.reload()
}
