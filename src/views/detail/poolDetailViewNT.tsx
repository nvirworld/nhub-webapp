import React, { useState } from 'react'
import * as Shared from '../../components/Shared'
import { PoolDetailViewProps } from '.'
import { useQueryMyWallet } from '../../hooks/useQueryMyWallet'
import { useQueryNetworks } from '../../hooks/useQueryNetworks'
import { useMutationStakeToken } from '../../hooks/useMutationStakeToken'
import DetailMenuTab from './components/DetailMenuTab'
import StakeContent from './components/DetailNT/Stake'
import UnstakeContent from './components/DetailNT/Unstake'
import { useMutationUnstake } from '../../hooks/useMutationUnstake'
import { INft721Item } from '../../types/entity.type'
import { useMutationStakeNft721AndToken } from '../../hooks/useMutationStakeNft721AndToken'
import SelectNft from './components/DetailNT/SelectNft'
import { useQueryMyNft721Items } from '../../hooks/useQueryMyNft721Items'
import { useNavigate } from 'react-router-dom'

const PoolDetailViewNT: React.FC<PoolDetailViewProps> = (props) => {
  const { pool } = props
  const { data: myWallet } = useQueryMyWallet()
  const { data: networks } = useQueryNetworks()
  const { data: nft721s } = useQueryMyNft721Items(pool, myWallet ?? null)
  const navigate = useNavigate()
  const [selectedNft, setSelectedNft] = useState<INft721Item | null>(null)
  const [isShowSelectNft, setIsShowSelectNft] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const currentNetwork = networks?.find((network) => network.chainId === myWallet?.networkChainId) ?? null

  const onSuccessStake = () => {
    setButtonDisabled(false)
    alert('Stake Success. Please wait for transaction to complete.')
    navigate('/dashboard')
  }
  const onSuccessUnstake = () => {
    setButtonDisabled(false)
    alert('Unstake Success. Please wait for transaction to complete.')
    navigate('/dashboard')
  }
  const onStakeErorr = (errorText: string) => {
    setButtonDisabled(false)
    alert(`Stake Failed. Please try again. ${errorText}`)
  }
  const onUnstakeErorr = (errorText: string) => {
    setButtonDisabled(false)
    alert(`Unstake Failed. Please try again. ${errorText}`)
  }

  const stakeToken = useMutationStakeToken(onSuccessStake, onStakeErorr)
  const stakeTokenAction = (amount: number) => {
    setButtonDisabled(true)
    if (pool == null || myWallet == null) {
      return
    }

    stakeToken.mutate({
      pool,
      wallet: myWallet,
      amount
    })
  }

  const stakeNft721AndToken = useMutationStakeNft721AndToken(onSuccessStake, onStakeErorr)
  const stakeNft721andTokenAction = (nft: INft721Item, amount: number) => {
    setButtonDisabled(true)
    if (!pool || !myWallet) {
      return
    }
    const tokenId = Number(nft.tokenId)
    stakeNft721AndToken.mutate({
      pool,
      wallet: myWallet,
      tokenId,
      amount
    })
  }

  const unstakeToken = useMutationUnstake(onSuccessUnstake, onUnstakeErorr)
  const unstakeTokenAction = () => {
    setButtonDisabled(true)
    if (pool == null || myWallet == null) {
      return
    }

    unstakeToken.mutate({
      pool,
      wallet: myWallet
    })
  }

  const menuArr = [
    {
      id: 1,
      title: 'Stake',
      content: (
        <StakeContent
          pool={pool}
          myWallet={myWallet}
          currentNetwork={currentNetwork}
          stakeTokenAction={stakeTokenAction}
          stakeNft721AndTokenAction={stakeNft721andTokenAction}
          onClickIsShowSelectNft={setIsShowSelectNft}
          selectedNft={selectedNft}
          stakedNft721={nft721s?.stakedNft721s[0] ?? null}
          buttonDisabled={buttonDisabled}
        />
      )
    },
    {
      id: 2,
      title: 'Unstake',
      content: (
        <UnstakeContent
          pool={pool}
          unstakeTokenAction={unstakeTokenAction}
          stakedNft721={nft721s?.stakedNft721s[0] ?? null}
          buttonDisabled={buttonDisabled}
        />
      )
    }
  ]
  return !isShowSelectNft ? (
    <>
      <Shared.NhubTypo type="bold" usage="subTitle" style={{ marginBottom: 30 }}>
        {pool.name}
      </Shared.NhubTypo>
      <DetailMenuTab menuItems={menuArr} pool={pool} />
      {/* <input type="text" value={amount} onChange={amountChanged} />
      <button onClick={stakeTokenAction}>stake</button>
      <ul>
        <li>type: {pool.type}</li>
        <li>stakingTokenBalance: {stakingTokenBalance}</li>
        <li>stakedToken: {pool.myWeb3?.stakednToken ?? 'null'}</li>
        <li>stakedNft721Ids: {JSON.stringify(pool.myWeb3?.stakedNft721Ids ?? [], null, 2)}</li>
        <li>pendingRewards: {pool.myWeb3?.pendingRewards ?? 'null'}</li>
      </ul>
      <pre>{JSON.stringify(pool ?? {}, null, 2)}</pre> */}
    </>
  ) : (
    <SelectNft
      onClickIsShowSelectNft={setIsShowSelectNft}
      myNft721s={nft721s?.nft721s ?? []}
      selectedNft={selectedNft}
      setSelectedNft={setSelectedNft}
      pool={pool}
    />
  )
}

export default PoolDetailViewNT
