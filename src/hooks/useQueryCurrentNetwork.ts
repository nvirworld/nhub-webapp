import { useQuery } from '@tanstack/react-query'
import { IMyWallet, INetwork } from '../types/entity.type'
import { getLocalNetworkChainId, setLocalNetworkChainId } from '../services/localStorage.service'

export const useQueryCurrentNetwork = (networks: INetwork[] | null, wallet: IMyWallet | null) => {
  const localNetworkChainId = getLocalNetworkChainId()
  return useQuery({
    queryKey: ['CurrentNetwork', networks?.length, localNetworkChainId, wallet?.networkChainId],
    queryFn: async () => {
      const network = getNetwork(networks, wallet)
      return network
    }
  })
}

const getNetwork = (networks: INetwork[] | null, wallet: IMyWallet | null): INetwork | null => {
  console.log('getNetwork', networks, ' ', wallet)
  if (networks === null || networks.length === 0) {
    return null
  }

  const walletNetwork = networks?.find((network) => network.chainId === wallet?.networkChainId ?? null)

  if (walletNetwork) {
    setLocalNetworkChainId(walletNetwork.chainId)
  }

  const localNetworkChainId = getLocalNetworkChainId()

  if (localNetworkChainId === null) {
    setLocalNetworkChainId(networks[0].chainId)
  }

  const localNetwork = networks?.find((network) => network.chainId === Number(localNetworkChainId))

  return localNetwork ?? null
}
