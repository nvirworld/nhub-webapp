import React from 'react'
import { useQueryPoolv4s } from '../../hooks/useQueryPoolv4s'
import { useQueryPoolv4 } from '../../hooks/useQueryPoolv4'
import { useQueryMyWallet } from '../../hooks/useQueryMyWallet'
import { useMutationChangeNework } from '../../hooks/useMutationChangeNework'
import { useMutationConnectWallet } from '../../hooks/useMutationConnectWallet'
import { useMutationDisconnectWallet } from '../../hooks/useMutationDisconnectWallet'
import { useQueryTokenBalance } from '../../hooks/useQueryTokenBalance'
import { useQueryNetworks } from '../../hooks/useQueryNetworks'
import { useQueryMyNft721Items } from '../../hooks/useQueryMyNft721Items'
import { useMutationStakeToken } from '../../hooks/useMutationStakeToken'
import { useMutationStakeNft721AndToken } from '../../hooks/useMutationStakeNft721AndToken'
import { useMutationUnstake } from '../../hooks/useMutationUnstake'
import { useMutationStakeNft721 } from '../../hooks/useMutationStakeNft721'

// const POOL_ID = 11 // NFT + Token
// const POOL_ID = 15 // NFT
const POOL_ID = 7 // Token

const PlaygroundView: React.FC = () => {
  const { data: myWallet } = useQueryMyWallet()
  const { data: networks } = useQueryNetworks()
  const currentNetwork = networks?.find((network) => network.chainId === myWallet?.networkChainId) ?? null

  const { data: poolv4 } = useQueryPoolv4(POOL_ID, myWallet ?? null)
  const { data: poolv4s } = useQueryPoolv4s(currentNetwork, myWallet ?? null)

  const { data: myNfts } = useQueryMyNft721Items(poolv4 ?? null, myWallet ?? null)

  const { data: tokenBalanceData } = useQueryTokenBalance(
    currentNetwork,
    poolv4?.stakingToken ?? null,
    myWallet ?? null
  )

  const onSuccessStakeToken = () => {
    alert('Stake Token Success')
  }

  const onErorrStakeToken = () => {
    alert('Stake Token Failed')
  }

  const connect = useMutationConnectWallet()
  const disconnect = useMutationDisconnectWallet()
  const changeNetwork = useMutationChangeNework()

  const stakeToken = useMutationStakeToken(onSuccessStakeToken, onErorrStakeToken)
  const stakeNft721AndToken = useMutationStakeNft721AndToken()
  const stakeNft721 = useMutationStakeNft721()
  const unstake = useMutationUnstake()

  const [nftId, setNftId] = React.useState<string>('0')
  const [stakeAmount, setStakeAmount] = React.useState<string>('0')

  return (
    <>
      <h1>Playground</h1>
      <h3>Nfts</h3>
      <pre>{JSON.stringify(myNfts ?? 'None', null, 2)}</pre>
      <pre>{JSON.stringify(poolv4?.stakingToken ?? {}, null, 2)}</pre>
      <h3>stakeToken</h3>
      tokenAmount:
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setStakeAmount(e.target.value)
        }}
      ></input>
      <br />
      <button
        onClick={() => {
          if (!poolv4 || !myWallet) {
            return
          }
          stakeToken.mutate({
            pool: poolv4,
            wallet: myWallet,
            amount: Number(stakeAmount)
          })
        }}
      >
        stake
      </button>
      <h3>stakeNft721</h3>
      nft721Id:
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setNftId(e.target.value)
        }}
      ></input>
      <br />
      <button
        onClick={() => {
          if (!poolv4 || !myWallet) {
            return
          }
          stakeNft721.mutate({
            pool: poolv4,
            wallet: myWallet,
            tokenId: Number(nftId)
          })
        }}
      >
        stake
      </button>
      <h3>stakeNft721AndToken</h3>
      nft721Id:
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setNftId(e.target.value)
        }}
      ></input>
      <br />
      tokenAmount:
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setStakeAmount(e.target.value)
        }}
      ></input>
      <br />
      <button
        onClick={() => {
          if (!poolv4 || !myWallet) {
            return
          }
          stakeNft721AndToken.mutate({
            pool: poolv4,
            wallet: myWallet,
            tokenId: Number(nftId),
            amount: Number(stakeAmount)
          })
        }}
      >
        stake
      </button>
      <h3>Unstake</h3>
      <pre>{JSON.stringify(poolv4?.myWeb3 ?? {}, null, 2)}</pre>
      <button
        onClick={() => {
          if (!poolv4 || !myWallet) {
            return
          }
          unstake.mutate({
            pool: poolv4,
            wallet: myWallet
          })
        }}
      >
        unstake
      </button>
      <h3>MyWallet</h3>
      <pre>
        tokenBalance: {tokenBalanceData ?? 'None'} {poolv4?.stakingToken?.symbol ?? ''}
      </pre>
      <pre>{JSON.stringify(myWallet ?? {}, null, 2)}</pre>
      <button
        onClick={() => {
          connect.mutate()
        }}
      >
        connect
      </button>
      <button
        onClick={() => {
          disconnect.mutate()
        }}
      >
        disconnect
      </button>
      <h3>changeNetwork</h3>
      {networks?.map((network) => (
        <button
          onClick={() => {
            changeNetwork.mutate({ network, wallet: myWallet ?? null })
          }}
        >
          {network.name}, {network.chainId}
        </button>
      ))}
      <h3>Networks</h3>
      <pre>{JSON.stringify(networks ?? 'None', null, 2)}</pre>
      <h3>Pool</h3>
      <pre>{JSON.stringify(poolv4 ?? 'None', null, 2)}</pre>
      <h3>Pools</h3>
      {poolv4s?.map((pool) => (
        <pre>{JSON.stringify(pool, null, 2)}</pre>
      ))}
    </>
  )
}

export default PlaygroundView
