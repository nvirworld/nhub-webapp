import React from 'react'
import styled from 'styled-components'
import * as Shared from '../../../../components/Shared'
import { NhubPoolItemProps } from '.'
import { Poolv4Col, Poolv4Row } from './Grid'
import { determineType } from '../../../../utils/determineType'
import dateToPeriod from '../../../../utils/dateToPeriod'
import NhubTokenSymbol from './NhubTokenSymbol'
import { toLocaleWithFixed } from '../../../../utils/number'
import determineEventStatus, { EventStatusEnum } from '../../../../utils/determineEventStatus'

const DesktopItem = (props: NhubPoolItemProps) => {
  const { poolData } = props
  return (
    <>
      {poolData && poolData.stakingToken && (
        <Shared.NhubListGrayBox type={poolData.type}>
          <Desktop.Container>
            <Poolv4Row gutter={[10, 0]}>
              {/* poolName */}
              <Poolv4Col span={4}>
                <Desktop.Title>
                  <Shared.NhubTypo type="bold" usage="cardTitle">
                    {poolData.name}
                  </Shared.NhubTypo>
                  <Shared.NhubDetermineStatus startDate={poolData.startedAt} endDate={poolData.endedAt} />
                </Desktop.Title>
              </Poolv4Col>
              {/* deposit */}
              <Desktop.Symbol span={3}>
                <Desktop.Token>
                  <NhubTokenSymbol tokenUrl={poolData.stakingToken.iconUrl} />
                  <Shared.NhubTypo type="bold" usage="card">
                    {poolData.stakingToken.symbol}
                  </Shared.NhubTypo>
                </Desktop.Token>
              </Desktop.Symbol>
              {/* reward */}
              <Desktop.Symbol span={3}>
                <Desktop.Token>
                  <NhubTokenSymbol tokenUrl={poolData.rewardToken.iconUrl} />
                  <Shared.NhubTypo type="bold" usage="card">
                    {poolData.rewardToken.symbol}
                  </Shared.NhubTypo>
                </Desktop.Token>
              </Desktop.Symbol>
              {/* tvl */}
              <Desktop.MyReward span={5}>
                {determineEventStatus(poolData.startedAt, poolData.endedAt) !== EventStatusEnum.Closed ? (
                  <>
                    <Shared.NhubTypo type="bold" usage="card" color="blue">
                      {poolData.web3?.tvl.toLocaleString()} {poolData.stakingToken.symbol}
                    </Shared.NhubTypo>
                    <Shared.NhubTypo type="medium" usage="card">
                      $ {toLocaleWithFixed(poolData.web3?.tvlToUsdt)}
                    </Shared.NhubTypo>
                  </>
                ) : (
                  <Shared.NhubTypo type="bold" usage="card">
                    -
                  </Shared.NhubTypo>
                )}
              </Desktop.MyReward>
              {/* apy */}
              <Desktop.Apy span={3}>
                {determineEventStatus(poolData.startedAt, poolData.endedAt) !== EventStatusEnum.Closed ? (
                  <Shared.NhubTypo type="bold" usage="card" color="blue">
                    {toLocaleWithFixed(poolData.web3?.apy * 100)}%
                  </Shared.NhubTypo>
                ) : (
                  <Shared.NhubTypo type="bold" usage="card">
                    -
                  </Shared.NhubTypo>
                )}
              </Desktop.Apy>
              {/* type */}
              <Desktop.DdayAndType span={2}>
                <Shared.NhubTypo type="bold" usage="card">
                  {determineType(poolData.startedAt, poolData.withdrawEnabledAt, poolData.endedAt)}
                </Shared.NhubTypo>
              </Desktop.DdayAndType>
              {/* period  */}
              <Desktop.DdayAndType span={4}>
                <Shared.NhubTypo type="bold" usage="card">
                  {dateToPeriod(poolData.startedAt)}
                </Shared.NhubTypo>
                <Shared.NhubTypo type="bold" usage="card">
                  ~ {dateToPeriod(poolData.endedAt)}
                </Shared.NhubTypo>
              </Desktop.DdayAndType>
            </Poolv4Row>
          </Desktop.Container>
        </Shared.NhubListGrayBox>
      )}
    </>
  )
}

export default DesktopItem

const Desktop = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  `,
  Title: styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-top: 3px;
    gap: 4px;
    overflow: hidden;
  `,
  Symbol: styled(Poolv4Col)`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  `,
  Token: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
  `,
  MyStaked: styled(Poolv4Col)`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    :first-child {
      margin-top: 2px;
      margin-bottom: 6px;
    }
  `,
  MyReward: styled(Poolv4Col)`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    :first-child {
      margin-top: 2px;
      margin-bottom: 6px;
    }
  `,
  Apy: styled(Poolv4Col)`
    display: flex;
    align-items: flex-start;
    overflow: hidden;
  `,
  DdayAndType: styled(Poolv4Col)`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    overflow: hidden;
  `
}
