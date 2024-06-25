import { useQuery } from '@tanstack/react-query'
import { getNetworks } from '../services/api.service'

export const useQueryNetworks = () => {
  return useQuery({
    queryKey: ['Networks'],
    queryFn: async () => {
      const networks = await getNetworks()

      const host = window.location.host
      if (host === 'v2.n-hub.io') {
        return networks.filter((network) => (network.chainId !== 5 && network.chainId !== 11155111))
      }
      return networks
    },
    staleTime: 1000 * 60
  })
}
