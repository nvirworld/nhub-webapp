import { useMutation } from '@tanstack/react-query'
import { stakeToken } from '../services/web3.service'

export const useMutationStakeToken = (onSuccess?: () => void, onError?: () => void) => {
  return useMutation({
    mutationFn: stakeToken,
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
