import { useQuery } from '@tanstack/react-query'
import { getMyWallet } from '../services/web3.service'

export const useQueryMyWallet = (onSuccess?: () => void, onError?: () => void) => {
  return useQuery({
    queryKey: ['MyWallet'],
    queryFn: async () => getMyWallet(),
    staleTime: 1000 * 3,
    retry: 1,
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
