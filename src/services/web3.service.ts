import Web3 from 'web3'
import { isMobile } from 'react-device-detect'
import {
  INetwork,
  IPoolv4,
  IPoolv4Web3,
  IPoolv4MyWeb3,
  IMyWallet,
  IToken,
  IBridgeToken,
  IBridge
} from '../types/entity.type'
import { ethToWei, weiToEth } from '../utils'
import differenceInSeconds from 'date-fns/differenceInSeconds'

import ERC20_ABI from '../contracts/erc20.abi'
import ERC721_ABI from '../contracts/erc721.abi'
import POOLV4_ABI from '../contracts/poolv4.abi'

import { getWalletStatus } from './localStorage.service'

// const getWeb3 = (chainId: number): Web3 => {
//   if (!window.ethereum) {
//     throw new Error("Not found ethereum object");
//   }
//   return new Web3(window.ethereum);
// };

const isEqualAddress = (ethAddress1: string, ethAddress2: string): boolean => {
  return ethAddress1.toLocaleLowerCase() === ethAddress2.toLocaleLowerCase()
}

const getWeb3Viewer = (network: INetwork): Web3 => {
  return new Web3(new Web3.providers.HttpProvider(network.rpc))
}

export const getMyWallet = async (): Promise<IMyWallet | null> => {
  const walletStatus = getWalletStatus()
  if (walletStatus === 'disconnected') {
    throw new Error('Please connect wallet.')
  }

  if (!window.ethereum) {
    if (isMobile) {
      window.open(`https://metamask.app.link/dapp/${window.location.href}`, '_blank')
      // TODO: error 정의
      throw new Error()
    } else {
      throw new Error('Please install MetaMask.')
    }
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    })
    const netVersion: string = await window.ethereum.request({
      method: 'net_version'
    })

    const walletAddress = accounts[0]
    const networkChainId = parseInt(netVersion)
    return {
      networkChainId,
      walletAddress
    }
  } catch (error) {
    throw new Error('Please connect wallet.')
  }
}

export const removeMyWallet = () => {
  window.ethereum = null
}

export const changeNetwork = async (network: INetwork) => {
  const chainIdHex = '0x' + network.chainId.toString(16)
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdHex }]
    })
  } catch (error) {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: chainIdHex,
          chainName: network.name,
          nativeCurrency: {
            name: network.currency,
            symbol: network.currency,
            decimals: 18
          },
          rpcUrls: [network.rpc]
        }
      ]
    })
  }
}

export const connectWallet = async () => {
  if (!window.ethereum) {
    if (isMobile) {
      alert('Please open in metamask app.')
      window.open(`https://metamask.app.link/dapp/${window.location.href}`, '_blank')
    } else {
      alert('Please install metamask.')
      window.open('https://metamask.io/download/', '_blank')
    }
  }
  await window.ethereum.request({
    method: 'eth_requestAccounts'
  })
}

export interface IStakeTokenParams {
  pool: IPoolv4
  wallet: IMyWallet
  amount: number
}

export interface IBridgeTransferParam {
  bridge: IBridge
  wallet: IMyWallet
  amount: number
}

export const stakeToken = async (params: IStakeTokenParams) => {
  const web3 = getWeb3Viewer(params.pool.network)

  const walletAddress = params.wallet.walletAddress

  const poolAddress = params.pool.address
  const poolContract = new web3.eth.Contract(POOLV4_ABI, poolAddress)

  const stakingTokenAddress = params.pool.stakingToken?.address ?? ''
  const stakingTokenContract = new web3.eth.Contract(ERC20_ABI, stakingTokenAddress)

  const amountWei = ethToWei(params.amount, params.pool.stakingToken?.decimals ?? 18)

  // Check balance of token
  const balanceWei = (await stakingTokenContract.methods.balanceOf(walletAddress).call()) as bigint
  if (balanceWei < amountWei) {
    throw new Error('Insufficient token balance.')
  }

  // Check approved of token
  const allowanceWei = (await stakingTokenContract.methods.allowance(walletAddress, poolAddress).call()) as bigint
  if (allowanceWei < amountWei) {
    try {
      // metamask mobile app 에서 50000 -> 499999.9999.. approve 부동소수점 오류 발생, 1.01 배로 approve
      const approveAmountWei = amountWei + amountWei / BigInt('100')
      const approveTx = stakingTokenContract.methods.approve(poolAddress, approveAmountWei).encodeABI()
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: walletAddress,
            to: stakingTokenAddress,
            data: approveTx
          }
        ]
      })
    } catch (error) {
      if (error instanceof Error) {
        const message = error.message
        alert(`Stake failed. Please try again. ${message}`)
        throw new Error(`Stake failed. Please try again. ${message}`)
      }
      throw new Error(`Stake failed. Please try again.`)
    }
  }

  // Stake
  try {
    const stakeTx = poolContract.methods.depositToken(amountWei).encodeABI()
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: walletAddress,
          to: poolAddress,
          data: stakeTx,
          gas: (600000).toString(16)
        }
      ]
    })
  } catch (error) {
    if (error instanceof Error) {
      const message = error.message
      alert(`Stake failed. Please try again. ${message}`)
      throw new Error(`Stake failed. Please try again. ${message}`)
    }
    throw new Error('Stake failed. Please try again.')
  }
}

export const transferBridge = async (params: IBridgeTransferParam) => {
  const web3 = getWeb3Viewer(params.bridge.inToken.network)

  const walletAddress = params.wallet.walletAddress

  const bridgeAddress = params.bridge.address
  const inTokenAddress = params.bridge.inToken.address
  const inTokenContract = new web3.eth.Contract(ERC20_ABI, inTokenAddress)

  const amountWei = ethToWei(params.amount, params.bridge.inToken.decimals)

  // Check balance of token
  const balanceWei = (await inTokenContract.methods.balanceOf(walletAddress).call()) as bigint
  if (balanceWei < amountWei) {
    throw new Error('Insufficient token balance.')
  }

  // Check approved of token
  const allowanceWei = (await inTokenContract.methods.allowance(walletAddress, bridgeAddress).call()) as bigint
  if (allowanceWei < amountWei) {
    try {
      // metamask mobile app 에서 50000 -> 499999.9999.. approve 부동소수점 오류 발생, 1.01 배로 approve
      const approveAmountWei = amountWei + amountWei / BigInt('100')
      const approveTx = inTokenContract.methods.approve(bridgeAddress, approveAmountWei).encodeABI()
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: walletAddress,
            to: inTokenAddress,
            data: approveTx
          }
        ]
      })
    } catch (error) {
      if (error instanceof Error) {
        const message = error.message
        alert(`Stake failed. Please try again. ${message}`)
        throw new Error(`Bridge transfer failed. Please try again. ${message}`)
      }
      throw new Error(`Bridge transfer failed. Please try again.`)
    }
  }

  // Stake
  try {
    const stakeTx = inTokenContract.methods.transfer(bridgeAddress, amountWei).encodeABI()
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: walletAddress,
          to: inTokenAddress,
          data: stakeTx
        }
      ]
    })
  } catch (error) {
    if (error instanceof Error) {
      const message = error.message
      alert(`Bridge transfer failed. Please try again. ${message}`)
      throw new Error(`Bridge transfer failed. Please try again. ${message}`)
    }
    throw new Error('Bridge transfer failed. Please try again.')
  }
}

export interface IUnstakeParams {
  pool: IPoolv4
  wallet: IMyWallet
}

export const unstake = async (params: IUnstakeParams) => {
  const web3 = getWeb3Viewer(params.pool.network)

  const walletAddress = params.wallet.walletAddress

  const poolAddress = params.pool.address
  const poolContract = new web3.eth.Contract(POOLV4_ABI, poolAddress)

  const unstakeTx = poolContract.methods.withdrawAll().encodeABI()
  await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [
      {
        from: walletAddress,
        to: poolAddress,
        data: unstakeTx,
        gas: (600000).toString(16)
      }
    ]
  })
}

export interface IStakeNft721AndTokenParams {
  pool: IPoolv4
  wallet: IMyWallet
  tokenId: number
  amount: number
}

export const stakeNft721AndToken = async (params: IStakeNft721AndTokenParams) => {
  const web3 = getWeb3Viewer(params.pool.network)
  const walletAddress = params.wallet.walletAddress

  const poolAddress = params.pool.address
  const poolContract = new web3.eth.Contract(POOLV4_ABI, poolAddress)

  const stakingTokenAddress = params.pool.stakingToken?.address ?? ''
  const stakingTokenContract = new web3.eth.Contract(ERC20_ABI, stakingTokenAddress)

  const stakingNft721Address = params.pool.stakingNft721?.address ?? ''
  const stakingNft721Contract = new web3.eth.Contract(ERC721_ABI, stakingNft721Address)

  // Check owner of NFT721
  const ownerAddress = await stakingNft721Contract.methods.ownerOf(params.tokenId).call()
  if (!isEqualAddress(ownerAddress, walletAddress)) {
    throw new Error('You are not owner of this NFT.')
  }

  // Check approved of NFT721
  const nft721Approved = await stakingNft721Contract.methods.getApproved(params.tokenId).call()
  if (!isEqualAddress(nft721Approved, poolAddress)) {
    try {
      const approveTx = stakingNft721Contract.methods.approve(poolAddress, params.tokenId).encodeABI()
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: walletAddress,
            to: stakingNft721Address,
            data: approveTx
          }
        ]
      })
    } catch (error) {
      if (error instanceof Error) {
        const message = error.message
        alert(`NFT approve failed. Please try again. ${message}`)
        throw new Error(`NFT approve failed. Please try again. ${message}`)
      }
      throw new Error('NFT approve failed. Please try again.')
    }
  }

  const amountWei = ethToWei(params.amount, params.pool.stakingToken?.decimals ?? 18)

  // Check balance of token
  const balanceWei = (await stakingTokenContract.methods.balanceOf(walletAddress).call()) as bigint
  if (balanceWei < amountWei) {
    throw new Error('Insufficient token balance.')
  }

  // Check approved of token
  const allowanceWei = (await stakingTokenContract.methods.allowance(walletAddress, poolAddress).call()) as bigint
  try {
    if (allowanceWei < amountWei) {
      const approveTx = stakingTokenContract.methods.approve(poolAddress, amountWei).encodeABI()
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: walletAddress,
            to: stakingTokenAddress,
            data: approveTx
          }
        ]
      })
    }
  } catch (error) {
    throw new Error('Token approve failed. Please try again.')
  }

  // Stake
  try {
    const stakeTx = poolContract.methods.depositNft721AndToken(params.tokenId, amountWei).encodeABI()
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: walletAddress,
          to: poolAddress,
          data: stakeTx,
          gas: (600000).toString(16)
        }
      ]
    })
  } catch (error) {
    if (error instanceof Error) {
      const message = error.message
      alert(`Stake failed. Please try again. ${message}`)
      throw new Error(`Stake failed. Please try again. ${message}`)
    }
    throw new Error('Stake failed. Please try again.')
  }
}

export interface IStakeNft721Params {
  pool: IPoolv4
  wallet: IMyWallet
  tokenId: number
}

export const stakeNft721 = async (params: IStakeNft721Params) => {
  const web3 = getWeb3Viewer(params.pool.network)
  const walletAddress = params.wallet.walletAddress

  const poolAddress = params.pool.address
  const poolContract = new web3.eth.Contract(POOLV4_ABI, poolAddress)

  const stakingNft721Address = params.pool.stakingNft721?.address ?? ''
  const stakingNft721Contract = new web3.eth.Contract(ERC721_ABI, stakingNft721Address)

  // Check owner of NFT721
  const ownerAddress = await stakingNft721Contract.methods.ownerOf(params.tokenId).call()
  if (!isEqualAddress(ownerAddress, walletAddress)) {
    throw new Error('You are not owner of this NFT.')
  }

  // Check approved of NFT721
  const nft721Approved = await stakingNft721Contract.methods.getApproved(params.tokenId).call()
  if (!isEqualAddress(nft721Approved, poolAddress)) {
    try {
      const approveTx = stakingNft721Contract.methods.approve(poolAddress, params.tokenId).encodeABI()
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: walletAddress,
            to: stakingNft721Address,
            data: approveTx
          }
        ]
      })
    } catch (error) {
      if (error instanceof Error) {
        const message = error.message
        alert(`NFT approve failed. Please try again. ${message}`)
        throw new Error(`NFT approve failed. Please try again. ${message}`)
      }
      throw new Error('NFT approve failed. Please try again.')
    }
  }

  // Stake
  try {
    const stakeTx = poolContract.methods.depositNft721(params.tokenId).encodeABI()
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: walletAddress,
          to: poolAddress,
          data: stakeTx,
          gas: (600000).toString(16)
        }
      ]
    })
  } catch (error) {
    if (error instanceof Error) {
      const message = error.message
      alert(`Stake failed. Please try again. ${message}`)
      throw new Error(`Stake failed. Please try again. ${message}`)
    }
    throw new Error('Stake failed. Please try again.')
  }
}

export const getPoolv4MyWeb3 = async (pool: IPoolv4, wallet: IMyWallet): Promise<IPoolv4MyWeb3> => {
  try {
    const web3 = getWeb3Viewer(pool.network)
    const contract = new web3.eth.Contract(POOLV4_ABI, pool.address)
    const { _stakedTokenAmount, _stakingTokenUnit, _stakedNft721Ids, _pendingRewards, _rewardsTokenUnit } =
      (await contract.methods.getPosition(wallet.walletAddress).call()) as {
        _stakedTokenAmount: bigint
        _stakingTokenUnit: bigint
        _stakedNft721Ids: bigint[]
        _pendingRewards: bigint
        _rewardsTokenUnit: bigint
      }
    const stakedToken = weiToEth(_stakedTokenAmount, _stakingTokenUnit)
    const pendingRewards = weiToEth(_pendingRewards, _rewardsTokenUnit)
    const stakedNft721Ids = _stakedNft721Ids.map((id) => Number(id))
    return {
      stakedToken,
      stakedTokenToUsdt: stakedToken * (pool.stakingToken?.tokenPriceUsdt ?? 0),
      stakedNft721Ids,
      pendingRewards,
      pendingRewardsToUsdt: pendingRewards * (pool.rewardToken?.tokenPriceUsdt ?? 0)
    }
  } catch (error) {
    // TODO: error handling
    console.log(error)
    return {
      stakedToken: 0,
      stakedTokenToUsdt: 0,
      stakedNft721Ids: [],
      pendingRewards: 0,
      pendingRewardsToUsdt: 0
    }
  }
}

// getPoolWeb3
export const getPoolv4Web3 = async (pool: IPoolv4): Promise<IPoolv4Web3> => {
  try {
    const web3 = getWeb3Viewer(pool.network)
    const contract = new web3.eth.Contract(POOLV4_ABI, pool.address)
    const { _stakingTokenUnit, _rewardsTokenUnit, _poolTokenAmount, _poolNft721Amount, _poolRewardsAmount } =
      (await contract.methods.getPoolInfo().call()) as Record<any, bigint>

    const tvl: number = weiToEth(_poolTokenAmount, _stakingTokenUnit)
    const tvlToUsdt = tvl * (pool.stakingToken?.tokenPriceUsdt ?? 0)
    const tnl: number = Number(_poolNft721Amount)
    const trd: number = weiToEth(_poolRewardsAmount, _rewardsTokenUnit)
    const trdToUsdt = trd * (pool.rewardToken?.tokenPriceUsdt ?? 0)

    const year = 365 * 24 * 60 * 60
    const day = 24 * 60 * 60
    const duration = differenceInSeconds(pool.endedAt, pool.startedAt)
    const apy = tvlToUsdt !== 0 ? (year / duration) * (trdToUsdt / tvlToUsdt) : 0
    const tpp = pool.type === 'nft721' && tnl !== 0 ? trd / (duration / day) / tnl : 0

    const poolWeb3Entity: IPoolv4Web3 = {
      tvl,
      tvlToUsdt,
      tnl,
      trd,
      trdToUsdt,
      apy,
      tpp
    }
    return poolWeb3Entity
  } catch (error) {
    // TODO: error handling
    console.log(error)
    return {
      tvl: 0,
      tvlToUsdt: 0,
      tnl: 0,
      trd: 0,
      trdToUsdt: 0,
      apy: 0,
      tpp: 0
    }
  }
}

export const getTokenBalance = async (network: INetwork, token: IToken | IBridgeToken, wallet: IMyWallet): Promise<number> => {
  const web3 = getWeb3Viewer(network)
  const contract = new web3.eth.Contract(ERC20_ABI, token.address)

  const balanceWei = (await contract.methods.balanceOf(wallet.walletAddress).call()) as bigint
  const decimals = (await contract.methods.decimals().call()) as bigint
  const balance = weiToEth(balanceWei, decimals)

  const multiplier = Math.pow(10, 6)

  return Math.floor(balance * multiplier) / multiplier
}
