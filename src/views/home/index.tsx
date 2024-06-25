import React, { useEffect, useState } from 'react'
import DashboardView from './DashboardView'
import MyPoolListView from './MyPoolListView'
import { IPoolv4 } from '../../types/entity.type'
import * as Shared from '../../components/Shared'
import { styled } from 'styled-components'
import Dummy from './components/NhubMyPoolItem/dummy.json'
import { useQueryPoolv4s } from '../../hooks/useQueryPoolv4s'
import { useQueryMyWallet } from '../../hooks/useQueryMyWallet'
import useResponsiveScr from '../../hooks/useResponsiveScr'
import { useQueryNetworks } from '../../hooks/useQueryNetworks'

export interface DashType {
  myTvl: number
  myTnl: number
  myUrv: number
}
export interface MyPoolType {
  myPools: IPoolv4[]
}

export interface ContainerProps {
  breakpoint: string
}

const HomePage: React.FC = () => {
  const { data: myWalletData, isLoading: isLoadingMyWallet } = useQueryMyWallet()

  const { data: networks } = useQueryNetworks()
  const currentNetwork = networks?.find((network) => network.chainId === myWalletData?.networkChainId) ?? null
  const { data: pools, isLoading } = useQueryPoolv4s(currentNetwork, myWalletData ?? null)
  // const { breakpoint } = useResponsiveScr()

  if (isLoadingMyWallet) {
    return (
      <ViewWrap>
        <Shared.NhubTypo type="bold" usage="nav">
          Loading...
        </Shared.NhubTypo>
      </ViewWrap>
    )
  }

  const dashData = pools?.reduce(
    (acc, cur) => {
      if (cur.myWeb3) {
        acc.myTvl += cur.myWeb3.stakedTokenToUsdt
        acc.myTnl += cur.myWeb3.stakedNft721Ids.length
        acc.myUrv += cur.myWeb3.pendingRewardsToUsdt
      }
      return acc
    },
    { myTvl: 0, myTnl: 0, myUrv: 0 }
  )

  const myPoolsData =
    pools?.filter((pool) => {
      if (pool.myWeb3 === null) {
        return false
      }
      if (pool.myWeb3.stakedToken > 0) {
        return true
      }
      if (pool.myWeb3.stakedNft721Ids.length !== 0) {
        return true
      }
      if (pool.myWeb3.pendingRewards > 0) {
        return true
      }
      return false
    }) ?? []

  if (isLoading) {
    return (
      <ViewWrap>
        <Shared.NhubTypo type="bold" usage="nav">
          Loading...
        </Shared.NhubTypo>
      </ViewWrap>
    )
  }
  return (
    <>
      <ViewWrap>{dashData && <DashboardView dashData={dashData} />}</ViewWrap>
      <ViewWrap>{myPoolsData.length !== 0 && <MyPoolListView myPoolsData={myPoolsData} />}</ViewWrap>
    </>
  )
}

export default HomePage

const ViewWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 40px;
`
