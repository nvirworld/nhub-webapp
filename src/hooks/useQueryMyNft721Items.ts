import { getMyNft721Items } from '../services/api.service'
import { useQuery } from '@tanstack/react-query'
import { IMyNft721Items, IMyWallet, IPoolv4 } from '../types/entity.type'

export const useQueryMyNft721Items = (pool: IPoolv4 | null, wallet: IMyWallet | null) => {
  return useQuery({
    queryKey: ['MyNft721Items', pool?.id, pool?.stakingNft721?.address, wallet?.networkChainId, wallet?.walletAddress],
    queryFn: async (): Promise<IMyNft721Items> => {
      const nft721 = pool?.stakingNft721
      if (!pool || !nft721 || !wallet) {
        return {
          stakedNft721s: [],
          nft721s: []
        }
      }
      const items = await getMyNft721Items(pool, nft721, wallet)
      return items
    },
    staleTime: 1000 * 5
  })
}
