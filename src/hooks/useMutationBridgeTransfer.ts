import { useMutation } from '@tanstack/react-query'
import { transferBridge } from '../services/web3.service'

export const useMutationBridgeTransfer = (onSuccess?: () => void, onError?: () => void) => {
  return useMutation({
    mutationFn: transferBridge,
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
