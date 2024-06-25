import React, { useEffect, useState } from 'react'
import NftPoolItemView from './nftPoolItemView'
import { styled } from 'styled-components'
import { useQueryPoolv4s } from '../../hooks/useQueryPoolv4s'
import { IPoolv4 } from '../../types/entity.type'
import { useQueryMyWallet } from '../../hooks/useQueryMyWallet'
import * as Shared from '../../components/Shared'
import { useQueryNetworks } from '../../hooks/useQueryNetworks'

const NftPoolView: React.FC = () => {
  const { data: myWalletData } = useQueryMyWallet()
  const { data: networks } = useQueryNetworks()
  const currentNetwork = networks?.find((network) => network.chainId === myWalletData?.networkChainId) ?? null
  const { data: poolData, isLoading } = useQueryPoolv4s(currentNetwork, true, true)
  const [nftPoolData, setNftPoolData] = useState<IPoolv4[]>([])
  useEffect(() => {
    if (poolData) {
      const result = poolData.filter((poolData) => poolData.type !== 'token')
      setNftPoolData(result)
    }
  }, [poolData])
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
      <ViewWrap>
        {nftPoolData.length !== 0 ? (
          <NftPoolItemView nftPoolData={nftPoolData} />
        ) : (
          <Shared.NhubTypo type="medium" usage="noPools">
            There is no active pool
          </Shared.NhubTypo>
        )}
      </ViewWrap>
    </>
  )
}

export default NftPoolView

const ViewWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 40px;
`
