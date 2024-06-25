import axios from 'axios'
import {
  IBridge,
  IMyNft721Items,
  IMyWallet,
  INetwork,
  INft721,
  INft721Item,
  IPoolv4,
  ITokenPrice
} from '../types/entity.type'

const API_BASE_URL = 'https://v2-backend.n-hub.io'

const getTokenPriuceUsdt = (tokenPrices: ITokenPrice[]): number => {
  const prices = tokenPrices.filter((item) => item.currency === 'USD')
  if (prices.length === 0) {
    return 0
  }
  return prices.reduce((prev, curr) => (curr.id > prev.id ? curr : prev)).price
}

const makePool = (pool: IPoolv4): IPoolv4 => {
  if (pool.stakingNft721 != null && pool.stakingToken != null) {
    pool.type = 'nft721+token'
  } else if (pool.stakingNft721 != null) {
    pool.type = 'nft721'
  } else if (pool.stakingToken != null) {
    pool.type = 'token'
  }

  if (pool.stakingToken != null) {
    pool.stakingToken.tokenPriceUsdt = getTokenPriuceUsdt(pool.stakingToken.tokenPrices)
  }

  if (pool.rewardToken != null) {
    pool.rewardToken.tokenPriceUsdt = getTokenPriuceUsdt(pool.rewardToken.tokenPrices)
  }

  pool.startedAt = new Date(pool.startedAt)
  pool.endedAt = new Date(pool.endedAt)
  pool.withdrawEnabledAt = new Date(pool.withdrawEnabledAt)

  return pool
}

export const getBridges = async (): Promise<IBridge[]> => {
  const res = await axios.get(`${API_BASE_URL}/bridge`)
  const res_bridges: IBridge[] = res.data.data.bridges

  return res_bridges
}

export const getPoolv4s = async (chainId: number): Promise<IPoolv4[]> => {
  const res = await axios.get(`${API_BASE_URL}/poolv4`)
  const res_pools: IPoolv4[] = res.data.data.pools

  return res_pools.map((pool): IPoolv4 => makePool(pool)).filter((pool) => pool.network.chainId === chainId)
}

export const getPoolv4 = async (poolId: number): Promise<IPoolv4> => {
  const res = await axios.get(`${API_BASE_URL}/poolv4/${poolId}`)
  const pool: IPoolv4 = res.data.data.pool
  return makePool(pool)
}

export const getNetworks = async (): Promise<INetwork[]> => {
  const res = await axios.get(`${API_BASE_URL}/network`)
  const networks: INetwork[] = res.data.data.networks
  return networks
}

export const getMyNft721Items = async (pool: IPoolv4, nft721: INft721, wallet: IMyWallet): Promise<IMyNft721Items> => {
  const res = await axios.get(`${API_BASE_URL}/poolv4/${pool.id}/nft?address=${wallet.walletAddress}`)
  const resData = res.data.data
  // console.log(resData)
  const nfts = resData.nfts?.map(
    (nft: any): INft721Item => ({
      nft721,
      tokenId: nft.tokenId,
      collection: nft.collection,
      tokenStandard: nft.tokenStandard,
      imgUrl: nft.imgUrl
    })
  )
  const stakedNfts = resData.stakedNfts?.map(
    (nft: any): INft721Item => ({
      nft721,
      tokenId: nft.tokenId,
      collection: nft.collection,
      tokenStandard: nft.tokenStandard,
      imgUrl: nft.imgUrl
    })
  )
  const result = {
    nft721s: nfts ?? [],
    stakedNft721s: stakedNfts ?? []
  }
  return result
}
