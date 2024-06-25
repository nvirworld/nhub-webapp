const KEY_WALLET_STATUS = 'walletStatus'
const KEY_NETWORK_CHAINID = 'networkChainId'

export const getWalletStatus = (): 'connected' | 'disconnected' => {
  const data = localStorage.getItem(KEY_WALLET_STATUS)
  if (data === 'connected') {
    return 'connected'
  }
  return 'disconnected'
}

export const setWalletStatus = (value: 'connected' | 'disconnected') => {
  localStorage.setItem(KEY_WALLET_STATUS, value)
}

export const getLocalNetworkChainId = () => {
  const chainId = localStorage.getItem(KEY_NETWORK_CHAINID)
  if (chainId) {
    return Number(chainId)
  }
  return 1
}

export const setLocalNetworkChainId = (chainId: number) => {
  localStorage.setItem(KEY_NETWORK_CHAINID, String(chainId))
}
