import React from 'react'
import { useQueryPoolv4 } from '../../hooks/useQueryPoolv4'
import { useParams } from 'react-router-dom'
import { IPoolv4 } from '../../types/entity.type'
import PoolDetailViewT from './poolDetailViewT'
import PoolDetailViewNT from './poolDetailViewNT'
import PoolDetailViewN from './poolDetailViewN'
import { useQueryMyWallet } from '../../hooks/useQueryMyWallet'
import { useMutationChangeNework } from '../../hooks/useMutationChangeNework'
import * as Shared from '../../components/Shared'
import { styled } from 'styled-components'

export interface PoolDetailViewProps {
  pool: IPoolv4
}

const DetailView: React.FC = () => {
  const { id } = useParams()
  const { data: myWallet } = useQueryMyWallet()
  const { data: poolData, isLoading, isError } = useQueryPoolv4(id ? Number(id) : 0, myWallet ?? null)
  const changeNetwork = useMutationChangeNework()

  if (isLoading) {
    return (
      <ViewWrap>
        <Shared.NhubTypo type="bold" usage="nav">
          Loading...
        </Shared.NhubTypo>
      </ViewWrap>
    )
  }
  if (isError) {
    return (
      <ViewWrap>
        <Shared.NhubTypo type="bold" usage="nav">
          Loading...
        </Shared.NhubTypo>
      </ViewWrap>
    )
  }
  if (myWallet == null) {
    return (
      <ViewWrap>
        <Shared.NhubTypo type="bold" usage="nav">
          Wallet not found
        </Shared.NhubTypo>
      </ViewWrap>
    )
  }

  if (poolData != null && myWallet != null && myWallet.networkChainId !== poolData.network.chainId) {
    changeNetwork.mutate({
      network: poolData.network,
      wallet: myWallet
    })
  }

  switch (poolData.type) {
    case 'token':
      return (
        <ViewWrap>
          <PoolDetailViewT pool={poolData} />
        </ViewWrap>
      )
    case 'nft721+token':
      return (
        <ViewWrap>
          <PoolDetailViewNT pool={poolData} />
        </ViewWrap>
      )
    case 'nft721':
      return (
        <ViewWrap>
          <PoolDetailViewN pool={poolData} />
        </ViewWrap>
      )
  }
  return <></>
}

export default DetailView

const ViewWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 40px;
`
