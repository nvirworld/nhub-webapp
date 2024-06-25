import React from 'react'
import styled from 'styled-components'
import * as Shared from '../../../../components/Shared'
import { NhubPoolItemProps } from '.'
import { Poolv4Col, Poolv4Row } from './Grid'
import { determineType } from '../../../../utils/determineType'
import dateToPeriod from '../../../../utils/dateToPeriod'
import NhubTokenSymbol from './NhubTokenSymbol'
import determineEventStatus, { EventStatusEnum } from '../../../../utils/determineEventStatus'
import { toLocaleWithFixed } from '../../../../utils/number'

const TabletItem = (props: NhubPoolItemProps) => {
  const { poolData } = props
  return (
    <>
      {poolData && poolData.stakingToken && (
        <Shared.NhubListGrayBox type={poolData.type}>
          <Tablet.Container>
            <Poolv4Row gutter={[10, 10]}>
              {/* poolName */}
              <Tablet.Title span={24}>
                <Shared.NhubTypo type="bold" usage="cardTitle">
                  {poolData.name}
                </Shared.NhubTypo>
                <Shared.NhubDetermineStatus startDate={poolData.startedAt} endDate={poolData.endedAt} />
              </Tablet.Title>
              {/* deposit */}
              <Tablet.Deposit span={5}>
                <LeftWrap>
                  <Shared.NhubTypo type="light" usage="columnHeader">
                    Deposit
                  </Shared.NhubTypo>
                  <RowWrap>
                    <NhubTokenSymbol tokenUrl={poolData.stakingToken.iconUrl} />
                    <Shared.NhubTypo type="bold" usage="cardPrice">
                      {poolData.stakingToken.symbol}
                    </Shared.NhubTypo>
                  </RowWrap>
                </LeftWrap>
              </Tablet.Deposit>
              {/* reward */}
              <Tablet.MyReward span={5}>
                <LeftWrap>
                  <Shared.NhubTypo type="light" usage="columnHeader">
                    Reward
                  </Shared.NhubTypo>
                  <RowWrap>
                    <NhubTokenSymbol tokenUrl={poolData.rewardToken.iconUrl ?? ''} />
                    <Shared.NhubTypo type="bold" usage="card">
                      {poolData.rewardToken.symbol}
                    </Shared.NhubTypo>
                  </RowWrap>
                </LeftWrap>
              </Tablet.MyReward>
              {/* tvl */}
              <Tablet.Tvl span={14}>
                <LeftWrap>
                  <Shared.NhubTypo type="light" usage="columnHeader">
                    TVL
                  </Shared.NhubTypo>
                  {determineEventStatus(poolData.startedAt, poolData.endedAt) !== EventStatusEnum.Closed ? (
                    <>
                      <Shared.NhubTypo type="bold" usage="card" color="blue">
                        {poolData.web3?.tvl.toLocaleString()} {poolData.stakingToken.symbol}
                      </Shared.NhubTypo>
                      <Shared.NhubTypo type="medium" usage="cardPrice">
                        $ {toLocaleWithFixed(poolData.web3?.tvlToUsdt)}
                      </Shared.NhubTypo>
                    </>
                  ) : (
                    <Shared.NhubTypo type="bold" usage="card">
                      -
                    </Shared.NhubTypo>
                  )}
                </LeftWrap>
              </Tablet.Tvl>
              {/* apy */}
              <Tablet.Apy span={5}>
                <LeftWrap>
                  <Shared.NhubTypo type="light" usage="columnHeader">
                    APY
                  </Shared.NhubTypo>
                  {determineEventStatus(poolData.startedAt, poolData.endedAt) !== EventStatusEnum.Closed ? (
                    <>
                      <Shared.NhubTypo type="bold" usage="card" color="blue">
                        {toLocaleWithFixed(poolData.web3?.apy * 100)}%
                      </Shared.NhubTypo>
                    </>
                  ) : (
                    <Shared.NhubTypo type="bold" usage="card">
                      -
                    </Shared.NhubTypo>
                  )}
                </LeftWrap>
              </Tablet.Apy>
              {/* type */}
              <Tablet.Type span={5}>
                <LeftWrap>
                  <Shared.NhubTypo type="light" usage="columnHeader">
                    Type
                  </Shared.NhubTypo>
                  <Shared.NhubTypo type="bold" usage="card">
                    {determineType(poolData.startedAt, poolData.withdrawEnabledAt, poolData.endedAt)}
                  </Shared.NhubTypo>
                </LeftWrap>
              </Tablet.Type>
              {/* period  */}
              <Tablet.Period span={14}>
                <LeftWrap>
                  <Shared.NhubTypo type="light" usage="columnHeader">
                    Period
                  </Shared.NhubTypo>
                  <RowWrap>
                    <Shared.NhubTypo type="bold" usage="card">
                      {dateToPeriod(poolData.startedAt)}
                    </Shared.NhubTypo>
                    <Shared.NhubTypo type="bold" usage="card">
                      ~ {dateToPeriod(poolData.endedAt)}
                    </Shared.NhubTypo>
                  </RowWrap>
                </LeftWrap>
              </Tablet.Period>
            </Poolv4Row>
          </Tablet.Container>
        </Shared.NhubListGrayBox>
      )}
    </>
  )
}

export default TabletItem

const Tablet = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  `,
  Title: styled(Poolv4Col)`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 4px;
  `,
  Deposit: styled(Poolv4Col)`
    display: flex;
    align-items: flex-start;
  `,
  MyReward: styled(Poolv4Col)`
    display: flex;
    align-items: flex-start;
  `,
  Tvl: styled(Poolv4Col)`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  `,
  Apy: styled(Poolv4Col)`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  `,
  Type: styled(Poolv4Col)`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  `,
  Period: styled(Poolv4Col)`
    display: flex;
    align-items: flex-start;
  `
}

const LeftWrap = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 4px;
`
const RowWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
