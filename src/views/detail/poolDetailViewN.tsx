import React, { useState } from 'react'
import * as Shared from '../../components/Shared'
import { PoolDetailViewProps } from '.'
import { useQueryMyWallet } from '../../hooks/useQueryMyWallet'
import { useQueryNetworks } from '../../hooks/useQueryNetworks'
import DetailMenuTab from './components/DetailMenuTab'
import StakeContent from './components/DetailN/Stake'
import UnstakeContent from './components/DetailN/Unstake'
import { useMutationUnstake } from '../../hooks/useMutationUnstake'
import { useQueryMyNft721Items } from '../../hooks/useQueryMyNft721Items'
import { INft721Item } from '../../types/entity.type'
import SelectNft from './components/DetailNT/SelectNft'
import { useMutationStakeNft721 } from '../../hooks/useMutationStakeNft721'
import { useNavigate } from 'react-router-dom'

const PoolDetailViewN: React.FC<PoolDetailViewProps> = (props) => {
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
  const onStakeErorr = () => {
    setButtonDisabled(false)
    alert('Stake Failed. Please try again.')
  }
  const onUnstakeErorr = () => {
    setButtonDisabled(false)
    alert('Unstake Failed. Please try again.')
  }

  const stakeNft = useMutationStakeNft721(onSuccessStake, onStakeErorr)
  const stakeNftAction = (nft: INft721Item) => {
    setButtonDisabled(true)
    if (pool == null || myWallet == null) {
      return
    }

    const tokenId = Number(nft.tokenId)

    stakeNft.mutate({
      pool,
      wallet: myWallet,
      tokenId
    })
  }

  const unstakeToken = useMutationUnstake(onSuccessUnstake, onUnstakeErorr)
  const unstakeNftAction = () => {
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
          stakeNftAction={stakeNftAction}
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
          unstakeTokenAction={unstakeNftAction}
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

export default PoolDetailViewN
