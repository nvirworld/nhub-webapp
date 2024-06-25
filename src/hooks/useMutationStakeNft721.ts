import { useMutation } from '@tanstack/react-query'
import { stakeNft721 } from '../services/web3.service'

export const useMutationStakeNft721 = (onSuccess?: () => void, onError?: () => void) => {
  return useMutation({
    mutationFn: stakeNft721,
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
