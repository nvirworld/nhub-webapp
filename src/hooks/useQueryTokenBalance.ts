import { useQuery } from '@tanstack/react-query'
import { getTokenBalance } from '../services/web3.service'
import { IMyWallet, INetwork, IToken, IBridgeToken } from '../types/entity.type'

export const useQueryTokenBalance = (network: INetwork | null, token: IToken | IBridgeToken | null, wallet: IMyWallet | null) => {
  return useQuery({
    queryKey: ['TokenBalance', wallet?.networkChainId, token?.address, wallet?.walletAddress],
    queryFn: async () => {
      if (!network || !token || !wallet) {
        return 0
      }
      return getTokenBalance(network, token, wallet)
    },
    staleTime: 1000 * 1
  })
}
