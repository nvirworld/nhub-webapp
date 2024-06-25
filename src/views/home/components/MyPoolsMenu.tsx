import React from 'react'
import * as Shared from '../../../components/Shared'
import * as HomeGrid from './HomeGrid'
import { styled } from 'styled-components'

const MyPoolsMenu = () => {
  return (
    <HomeGrid.CenterRow gutter={[30, 0]} style={{ width: '100%', paddingLeft: 20, paddingRight: 20 }}>
      <DashboardCol span={3}></DashboardCol>
      <DashboardCol span={6}>
        <Shared.NhubTypo type="regular" usage="dashTitle">
          My Staked
        </Shared.NhubTypo>
      </DashboardCol>
      <DashboardCol span={6}>
        <Shared.NhubTypo type="regular" usage="dashTitle">
          My Reward
        </Shared.NhubTypo>
      </DashboardCol>
      <DashboardCol span={3}>
        <Shared.NhubTypo type="regular" usage="dashTitle">
          APY
        </Shared.NhubTypo>
      </DashboardCol>
      <DashboardCol span={6}>
        <Shared.NhubTypo type="regular" usage="dashTitle">
          Unstake D-Day, Type
        </Shared.NhubTypo>
      </DashboardCol>
    </HomeGrid.CenterRow>
  )
}

export default MyPoolsMenu

const DashboardCol = styled(HomeGrid.CenterCol)`
  justify-content: flex-start;
`
