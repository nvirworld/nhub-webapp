export interface IToken {
  id: number | null
  address: string
  name: string
  symbol: string
  iconUrl: string | null
  decimals: number
  tokenPriceUsdt: number
  tokenPrices: ITokenPrice[]
}

export interface ITokenPrice {
  id: number
  currency: string
  price: number
}

export interface INft721 {
  id: number
  address: string
  name: string
  imgUrl: string
}

export interface INft721Item {
  nft721: INft721
  tokenId: string
  collection: string
  tokenStandard: string
  imgUrl: string
}

export interface IBridgeToken {
  id: number
  address: string
  name: string
  symbol: string
  iconUrl: string
  decimals: number
  network: INetwork
}

export interface IBridge {
  id: number
  minimum: number
  feeFixed: number
  feeRate: number
  address: string
  inToken: IBridgeToken
  outToken: IBridgeToken
}

export interface IPoolv4 {
  type: 'nft721' | 'token' | 'nft721+token' | null

  id: number
  name: string
  address: string

  stakingToken: IToken | null
  stakingNft721: INft721 | null
  rewardToken: IToken

  stakingTokenMin: number
  stakingNftMin: number

  startedAt: Date
  endedAt: Date
  withdrawEnabledAt: Date

  network: INetwork
  web3: IPoolv4Web3 | null
  myWeb3: IPoolv4MyWeb3 | null
}

export interface IPoolv4Web3 {
  tvl: number
  tvlToUsdt: number
  tnl: number
  trd: number
  trdToUsdt: number
  apy: number
  tpp: number
}

export interface IPoolv4MyWeb3 {
  stakedToken: number
  stakedTokenToUsdt: number
  stakedNft721Ids: number[]
  pendingRewards: number
  pendingRewardsToUsdt: number
}

export interface INetwork {
  chainId: number
  iconUrl: string | null
  name: string
  rpc: string
  scan: string
  currency: string
}

export interface IMyPoolv4s {
  myTvl: number
  myTnl: number
  myUrv: number
  myPools: IPoolv4[]
}

export interface IMyWallet {
  networkChainId: number
  walletAddress: string
}

export interface IMyNft721Items {
  stakedNft721s: INft721Item[]
  nft721s: INft721Item[]
}
