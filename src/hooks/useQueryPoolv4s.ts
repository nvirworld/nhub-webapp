import { getPoolv4s } from '../services/api.service'
import { getPoolv4MyWeb3, getPoolv4Web3 } from '../services/web3.service'
import { useQuery } from '@tanstack/react-query'
import { IMyWallet, INetwork } from '../types/entity.type'

export const useQueryPoolv4s = (network: INetwork | null, wallet: IMyWallet | null) => {
  return useQuery({
    queryKey: ['Poolv4s', network?.chainId ?? 0, wallet?.walletAddress ?? 'NoWallet'],
    queryFn: async () => {
      const pools = await getPoolv4s(network?.chainId ?? 0)

      return Promise.all(
        pools.map(async (pool) => ({
          ...pool,
          web3: await getPoolv4Web3(pool),
          myWeb3: wallet ? await getPoolv4MyWeb3(pool, wallet) : null
        }))
      )
    },
    staleTime: 1000 * 20
  })
}
