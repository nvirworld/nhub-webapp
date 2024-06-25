import React from 'react'
import * as Shared from '../../../components/Shared'
import * as TokenGrid from './TokenGrid'
import { styled } from 'styled-components'

const TokenPoolsMenu = () => {
  return (
    <TokenGrid.CenterRow gutter={[10, 0]} style={{ width: '100%', paddingLeft: 20, paddingRight: 20 }}>
      <DashboardCol span={4}>
        <Shared.NhubTypo type="regular" usage="dashTitle">
          Pool Name
        </Shared.NhubTypo>
      </DashboardCol>
      <DashboardCol span={3}>
        <Shared.NhubTypo type="regular" usage="dashTitle">
          Deposit
        </Shared.NhubTypo>
      </DashboardCol>
      <DashboardCol span={3}>
        <Shared.NhubTypo type="regular" usage="dashTitle">
          Reward
        </Shared.NhubTypo>
      </DashboardCol>
      <DashboardCol span={5}>
        <Shared.NhubTypo type="regular" usage="dashTitle">
          TVL
        </Shared.NhubTypo>
      </DashboardCol>
      <DashboardCol span={3}>
        <Shared.NhubTypo type="regular" usage="dashTitle">
          APY
        </Shared.NhubTypo>
      </DashboardCol>
      <DashboardCol span={2}>
        <Shared.NhubTypo type="regular" usage="dashTitle">
          Type
        </Shared.NhubTypo>
      </DashboardCol>
      <DashboardCol span={4}>
        <Shared.NhubTypo type="regular" usage="dashTitle">
          Period
        </Shared.NhubTypo>
      </DashboardCol>
    </TokenGrid.CenterRow>
  )
}

export default TokenPoolsMenu

const DashboardCol = styled(TokenGrid.CenterCol)`
  justify-content: flex-start;
`
