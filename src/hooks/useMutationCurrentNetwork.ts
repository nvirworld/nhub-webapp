import { useMutation, useQueryClient } from '@tanstack/react-query'
import { INetwork } from '../types/entity.type'

export const useMutationCurrentNetwork = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: changeLocalNetwork,
    onSuccess: () => {
      queryClient.invalidateQueries(['CurrentNetwork'])
    }
  })
}

const changeLocalNetwork = async (network: INetwork) => {
  await localStorage.setItem('networkChainId', String(network.chainId))
}
