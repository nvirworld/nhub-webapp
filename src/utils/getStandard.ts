const BSC_CHAINID_LIST = [56, 97]

export const getStandardNft = (chainId: number): string => {
  if (BSC_CHAINID_LIST.includes(chainId)) {
    return 'BEP-721'
  }
  return 'ERC-721'
}

export const getStandardToken = (chainId: number): string => {
  if (BSC_CHAINID_LIST.includes(chainId)) {
    return 'BEP-20'
  }
  return 'ERC-20'
}
