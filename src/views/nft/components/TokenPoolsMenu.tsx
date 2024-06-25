import React from 'react'
import * as Shared from '../../../components/Shared'
import * as TokenGrid from './NFTGrid'
import { styled } from 'styled-components'

const NftPoolsMenu = () => {
  return (
    <TokenGrid.CenterRow gutter={[30, 0]} style={{ width: '100%', paddingLeft: 20, paddingRight: 20 }}>
      <DashboardCol span={4}></DashboardCol>
      <DashboardCol span={5}>
        <Shared.NhubTypo type="regular" usage="dashTitle">
          Deposit
        </Shared.NhubTypo>
      </DashboardCol>
      <DashboardCol span={3}>
        <Shared.NhubTypo type="regular" usage="dashTitle">
          Reward
        </Shared.NhubTypo>
      </DashboardCol>
      <DashboardCol span={6}>
        <Shared.NhubTypo type="regular" usage="dashTitle">
          APY & TVL | TPP & TNL
        </Shared.NhubTypo>
      </DashboardCol>
      <DashboardCol span={6}>
        <Shared.NhubTypo type="regular" usage="dashTitle">
          Type & Period
        </Shared.NhubTypo>
      </DashboardCol>
    </TokenGrid.CenterRow>
  )
}

export default NftPoolsMenu

const DashboardCol = styled(TokenGrid.CenterCol)`
  justify-content: flex-start;
`
