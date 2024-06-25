import { useMutation } from '@tanstack/react-query'
import { unstake } from '../services/web3.service'

export const useMutationUnstake = (onSuccess?: () => void, onError?: () => void) => {
  return useMutation({
    mutationFn: unstake,
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
