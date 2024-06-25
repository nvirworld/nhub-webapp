import { useMutation } from '@tanstack/react-query'
import { stakeNft721AndToken } from '../services/web3.service'

export const useMutationStakeNft721AndToken = (onSuccess?: () => void, onError?: () => void) => {
  return useMutation({
    mutationFn: stakeNft721AndToken,
    onSuccess: () => {
      if (onSuccess) {
        onSuccess()
      }
    },
    onError: () => {
      if (onError) {
        onError()
      }
    }
  })
}
