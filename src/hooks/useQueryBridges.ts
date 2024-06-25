import { getBridges } from '../services/api.service'
import { useQuery } from '@tanstack/react-query'
import { IMyWallet, INetwork } from '../types/entity.type'

export const useQueryBridges = (wallet: IMyWallet | null) => {
  return useQuery({
    queryKey: ['Bridges', wallet?.walletAddress ?? 'NoWallet'],
    queryFn: async () => {
      const bridges = await getBridges()
      return bridges
    },
    staleTime: 1000 * 20
  })
}
