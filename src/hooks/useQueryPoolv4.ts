import { getPoolv4 } from '../services/api.service'
import { getPoolv4Web3, getPoolv4MyWeb3 } from '../services/web3.service'
import { useQuery } from '@tanstack/react-query'
import { IMyWallet } from '../types/entity.type'

export const useQueryPoolv4 = (poolId: number, wallet: IMyWallet | null) => {
  return useQuery({
    queryKey: ['Poolv4', poolId, wallet?.networkChainId, wallet?.walletAddress],
    queryFn: async () => {
      const pool = await getPoolv4(poolId)
      if (!pool) {
        throw new Error('Not found pool')
      }

      return {
        ...pool,
        web3: await getPoolv4Web3(pool),
        myWeb3: wallet ? await getPoolv4MyWeb3(pool, wallet) : null
      }
    },
    staleTime: 1000 * 5
  })
}
