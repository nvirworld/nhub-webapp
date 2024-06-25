import React, { useState } from 'react'
import { styled } from 'styled-components'
import { Col, Row } from 'antd'
import * as Shared from '../../components/Shared'
import { PoolDetailViewProps } from '.'
import { useQueryTokenBalance } from '../../hooks/useQueryTokenBalance'
import { useQueryMyWallet } from '../../hooks/useQueryMyWallet'
import { useQueryNetworks } from '../../hooks/useQueryNetworks'
import { useMutationStakeToken } from '../../hooks/useMutationStakeToken'
import DetailMenuTab from './components/DetailMenuTab'
import StakeContent from './components/DetailT/Stake'
import { useMutationUnstake } from '../../hooks/useMutationUnstake'
import UnstakeContent from './components/DetailT/Ustake'
import { useNavigate } from 'react-router-dom'

const PoolDetailViewT: React.FC<PoolDetailViewProps> = (props) => {
  const { pool } = props
  const { data: myWallet } = useQueryMyWallet()
  const { data: networks } = useQueryNetworks()
  const navigate = useNavigate()
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

  const stakeToken = useMutationStakeToken(onSuccessStake, onStakeErorr)
  const stakeTokenAction = (amount: number) => {
    setButtonDisabled(true)
    if (pool == null || myWallet == null) {
      return
    }
    if (amount < pool.stakingTokenMin) {
      alert('Amount too small')
      return
    }
    stakeToken.mutate({
      pool,
      wallet: myWallet,
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
          myWallet={myWallet}
          currentNetwork={currentNetwork}
          unstakeTokenAction={unstakeTokenAction}
          buttonDisabled={buttonDisabled}
        />
      )
    }
  ]
  return (
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
  )
}

export default PoolDetailViewT
