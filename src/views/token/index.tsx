import React, { useEffect, useState } from 'react'
import TokenPoolv4sView from './tokenPoolv4sView'
import { styled } from 'styled-components'
import { useQueryPoolv4s } from '../../hooks/useQueryPoolv4s'
import { IPoolv4 } from '../../types/entity.type'
import { useQueryMyWallet } from '../../hooks/useQueryMyWallet'
import * as Shared from '../../components/Shared'
import { useQuery } from '@tanstack/react-query'
import { useQueryNetworks } from '../../hooks/useQueryNetworks'
import { useQueryCurrentNetwork } from '../../hooks/useQueryCurrentNetwork'

const TokenView: React.FC = () => {
  const { data: myWalletData } = useQueryMyWallet()
  const { data: networks } = useQueryNetworks()
  // const currentNetwork = networks?.find((network) => network.chainId === myWalletData?.networkChainId) ?? null
  const { data: currentNetwork, isLoading: isLoadingCurrentNetwork } = useQueryCurrentNetwork(
    networks ?? null,
    myWalletData ?? null
  )
  const {
    data: poolData,
    isLoading: isLoadingPools,
    isFetching,
    refetch
  } = useQueryPoolv4s(currentNetwork ?? null, myWalletData ?? null)
  const pools = useQueryPoolv4s(currentNetwork ?? null, myWalletData ?? null)
  const [tokenPoolData, setMyPoolsData] = useState<IPoolv4[]>([])

  // const tokenPoolData = poolData?.filter((poolData) => poolData.type === 'token') ?? []

  useEffect(() => {
    const filteredPools = poolData?.filter((pool) => pool.type === 'token')
    if (filteredPools) setMyPoolsData(filteredPools)
  }, [isFetching])

  useEffect(() => {
    refetch()
  }, [currentNetwork])

  if (isLoadingCurrentNetwork) {
    return (
      <ViewWrap>
        <Shared.NhubTypo type="bold" usage="nav">
          Loading...
        </Shared.NhubTypo>
      </ViewWrap>
    )
  }
  return (
    <ViewWrap>
      {tokenPoolData.length !== 0 ? (
        <TokenPoolv4sView tokenPoolData={tokenPoolData} />
      ) : (
        <Shared.NhubTypo type="medium" usage="noPools">
          There is no active pool
        </Shared.NhubTypo>
      )}
    </ViewWrap>
  )
}

export default TokenView

const ViewWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 40px;
`
