import React from 'react'
import * as Shared from '../../components/Shared'
import * as HomeGrid from './components/HomeGrid'
import { DashType } from '.'
import useResponsiveScr from '../../hooks/useResponsiveScr'
import DashboardBox from './components/DashboardBox'
import { styled } from 'styled-components'
import { Col, Row } from 'antd'
import { toLocaleWithFixed } from '../../utils/number'

interface DashboardViewProps {
  dashData: DashType
}
const DashboardView: React.FC<DashboardViewProps> = (props) => {
  const { dashData } = props
  const { breakpoint } = useResponsiveScr()

  switch (breakpoint) {
    case 'desktop':
      return (
        <DashboadrWrap>
          <Dashboard.Row gutter={[15, 40]}>
            <Dashboard.Col span={24} style={{ textAlign: 'center' }}>
              <Shared.NhubTypo type="bold" usage="subTitle">
                My Dashboard
              </Shared.NhubTypo>
            </Dashboard.Col>
            <Dashboard.Col span={8}>
              <DashboardBox>
                <Shared.NhubTypo type="medium" usage="dashTitle">
                  Total Value Locked
                </Shared.NhubTypo>
                <Shared.NhubTypo type="bold" usage="dashboard" color="blue">
                  $ {toLocaleWithFixed(dashData.myTvl)}
                </Shared.NhubTypo>
              </DashboardBox>
            </Dashboard.Col>
            <Dashboard.Col span={8}>
              <DashboardBox>
                <Shared.NhubTypo type="medium" usage="dashTitle">
                  Total NFT Locked
                </Shared.NhubTypo>
                <Shared.NhubTypo type="bold" usage="dashboard" color="blue">
                  {dashData.myTnl.toLocaleString()} NFTs
                </Shared.NhubTypo>
              </DashboardBox>
            </Dashboard.Col>
            <Dashboard.Col span={8}>
              <DashboardBox>
                <Shared.NhubTypo type="medium" usage="dashTitle">
                  Unclaimed Rewards Value
                </Shared.NhubTypo>
                <Shared.NhubTypo type="bold" usage="dashboard" color="blue">
                  $ {toLocaleWithFixed(dashData.myUrv)}
                </Shared.NhubTypo>
              </DashboardBox>
            </Dashboard.Col>
          </Dashboard.Row>
        </DashboadrWrap>
      )
    case 'tablet':
      return (
        <DashboadrWrap>
          <HomeGrid.CenterRow gutter={[4, 40]}>
            <Dashboard.Col span={24} style={{ textAlign: 'center' }}>
              <Shared.NhubTypo type="bold" usage="subTitle">
                My Dashboard
              </Shared.NhubTypo>
            </Dashboard.Col>
            <Dashboard.Col span={8}>
              <DashboardBox>
                <Shared.NhubTypo type="medium" usage="dashTitle">
                  Total Value Locked
                </Shared.NhubTypo>
                <Shared.NhubTypo type="bold" usage="dashboard" color="blue">
                  $ {toLocaleWithFixed(dashData.myTvl)}
                </Shared.NhubTypo>
              </DashboardBox>
            </Dashboard.Col>
            <Dashboard.Col span={8}>
              <DashboardBox>
                <Shared.NhubTypo type="medium" usage="dashTitle">
                  Total NFT Locked
                </Shared.NhubTypo>
                <Shared.NhubTypo type="bold" usage="dashboard" color="blue">
                  {dashData.myTnl.toLocaleString()} NFTs
                </Shared.NhubTypo>
              </DashboardBox>
            </Dashboard.Col>
            <Dashboard.Col span={8}>
              <DashboardBox>
                <Shared.NhubTypo type="medium" usage="dashTitle">
                  Unclaimed Rewards Value
                </Shared.NhubTypo>
                <Shared.NhubTypo type="bold" usage="dashboard" color="blue">
                  $ {toLocaleWithFixed(dashData.myUrv)}
                </Shared.NhubTypo>
              </DashboardBox>
            </Dashboard.Col>
          </HomeGrid.CenterRow>
        </DashboadrWrap>
      )
    case 'mobile':
      return (
        <DashboadrWrap>
          <HomeGrid.CenterRow gutter={[1, 40]}>
            <Dashboard.Col span={24} style={{ textAlign: 'center' }}>
              <Shared.NhubTypo type="bold" usage="subTitle">
                My Dashboard
              </Shared.NhubTypo>
            </Dashboard.Col>
            <Dashboard.Col span={12}>
              <DashboardBox>
                <Shared.NhubTypo type="medium" usage="dashTitle">
                  Total Value Locked
                </Shared.NhubTypo>
                <Shared.NhubTypo type="bold" usage="dashboard" color="blue">
                  $ {toLocaleWithFixed(dashData.myTvl)}
                </Shared.NhubTypo>
              </DashboardBox>
            </Dashboard.Col>
            <Dashboard.Col span={12}>
              <DashboardBox>
                <Shared.NhubTypo type="medium" usage="dashTitle">
                  Unclaimed Rewards Value
                </Shared.NhubTypo>
                <Shared.NhubTypo type="bold" usage="dashboard" color="blue">
                  $ {toLocaleWithFixed(dashData.myUrv)}
                </Shared.NhubTypo>
              </DashboardBox>
            </Dashboard.Col>
          </HomeGrid.CenterRow>
        </DashboadrWrap>
      )
  }

  // return (
  //   <DashboadrWrap>
  //     {breakpoint === 'mobile' ? (
  //       <HomeGrid.CenterRow gutter={[1, 40]}>
  //         <HomeGrid.CenterCol span={24} style={{ textAlign: 'center' }}>
  //           <Shared.NhubTypo type="bold" usage="subTitle">
  //             Dash Board
  //           </Shared.NhubTypo>
  //         </HomeGrid.CenterCol>
  //         <HomeGrid.CenterCol span={12}>
  //           <DashboardBox>
  //             <Shared.NhubTypo type="medium" usage="dashTitle">
  //               Total Value Locked
  //             </Shared.NhubTypo>
  //             <Shared.NhubTypo type="bold" usage="dashboard" color="blue">
  //               {dashData.myTvl}
  //             </Shared.NhubTypo>
  //           </DashboardBox>
  //         </HomeGrid.CenterCol>
  //         <HomeGrid.CenterCol span={12}>
  //           <DashboardBox>
  //             <Shared.NhubTypo type="medium" usage="dashTitle">
  //               Total Value Locked
  //             </Shared.NhubTypo>
  //             <Shared.NhubTypo type="bold" usage="dashboard" color="blue">
  //               {dashData.myTvl}
  //             </Shared.NhubTypo>
  //           </DashboardBox>
  //         </HomeGrid.CenterCol>
  //       </HomeGrid.CenterRow>
  //     ) : (
  //       <HomeGrid.CenterRow gutter={[15, 40]}>
  //         <HomeGrid.CenterCol span={24} style={{ textAlign: 'center' }}>
  //           <Shared.NhubTypo type="bold" usage="subTitle">
  //             Dash Board
  //           </Shared.NhubTypo>
  //         </HomeGrid.CenterCol>
  //         <HomeGrid.CenterCol span={8}>
  //           <DashboardBox>
  //             <Shared.NhubTypo type="medium" usage="dashTitle">
  //               Total Value Locked
  //             </Shared.NhubTypo>
  //             <Shared.NhubTypo type="bold" usage="dashboard" color="blue">
  //               {dashData.myTvl}
  //             </Shared.NhubTypo>
  //           </DashboardBox>
  //         </HomeGrid.CenterCol>
  //         <HomeGrid.CenterCol span={8}>
  //           <DashboardBox>
  //             <Shared.NhubTypo type="medium" usage="dashTitle">
  //               Total NFT Locked
  //             </Shared.NhubTypo>
  //             <Shared.NhubTypo type="bold" usage="dashboard" color="blue">
  //               {dashData.myTnl}
  //             </Shared.NhubTypo>
  //           </DashboardBox>
  //         </HomeGrid.CenterCol>
  //         <HomeGrid.CenterCol span={8}>
  //           <DashboardBox>
  //             <Shared.NhubTypo type="medium" usage="dashTitle">
  //               Unclaimed Rewards Value
  //             </Shared.NhubTypo>
  //             <Shared.NhubTypo type="bold" usage="dashboard" color="blue">
  //               {dashData.myUrv}
  //             </Shared.NhubTypo>
  //           </DashboardBox>
  //         </HomeGrid.CenterCol>
  //       </HomeGrid.CenterRow>
  //     )}
  //   </DashboadrWrap>
  // )
}
export default DashboardView

const DashboadrWrap = styled.div`
  width: ${(props) => (props.theme.breakpoint === 'desktop' ? '900px' : '100%')};
`

const Dashboard = {
  Col: styled(Col)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
  `,
  Row: styled(Row)`
    width: ${(props) => (props.theme.breakpoint === 'mobile' ? '400px' : '100%')};
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
  `
}
