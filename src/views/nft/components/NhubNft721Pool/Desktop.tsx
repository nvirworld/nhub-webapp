import React from 'react'
import styled from 'styled-components'
import * as Shared from '../../../../components/Shared'
import { NhubPoolItemProps } from '.'
import { Poolv4Col, Poolv4Row } from './Grid'
import { determineType } from '../../../../utils/determineType'
import determineEventStatus, { EventStatusEnum } from '../../../../utils/determineEventStatus'
import NhubNftSymbol from './NhubNftSymbol'
import dateToPeriod from '../../../../utils/dateToPeriod'
import { toLocaleWithFixed } from '../../../../utils/number'

const DesktopItem = (props: NhubPoolItemProps) => {
  const { poolData } = props
  return (
    <>
      {poolData && (
        <Shared.NhubListGrayBox type={poolData.type}>
          <Desktop.Container>
            <Poolv4Row gutter={[30, 0]}>
              {/* Pool Title */}
              <Poolv4Col span={4}>
                <Desktop.Title>
                  <Shared.NhubTypo type="bold" usage="cardTitle">
                    {poolData.name}
                  </Shared.NhubTypo>
                  <Shared.NhubDetermineStatus startDate={poolData.startedAt} endDate={poolData.endedAt} />
                  <Shared.NhubTypo type="bold" usage="cardTitle" color="mint">
                    {determineEventStatus(poolData.startedAt, poolData.endedAt)}
                  </Shared.NhubTypo>
                </Desktop.Title>
              </Poolv4Col>
              {/* Deposit */}
              <Desktop.Deposit span={5}>
                <NhubNftSymbol nftUrl={poolData.stakingNft721?.imgUrl} tokenUrl={poolData.stakingToken?.iconUrl} />
                <Shared.NhubTypo type="bold" usage="card">
                  {poolData.stakingNft721?.name}
                </Shared.NhubTypo>
              </Desktop.Deposit>
              {/* My Reward */}
              <Desktop.MyReward span={3}>
                <NhubNftSymbol tokenUrl={poolData.rewardToken.iconUrl} />
                <Shared.NhubTypo type="bold" usage="card">
                  {poolData.rewardToken.symbol}
                </Shared.NhubTypo>
                {}
              </Desktop.MyReward>
              {/* APY & TVL & TNL */}
              <Desktop.ApyTvlTnl span={6}>
                {poolData.type === 'nft721' ? (
                  <Shared.NhubTypo type="bold" usage="card" color="blue">
                    {toLocaleWithFixed(poolData.web3?.tpp)} {poolData.rewardToken?.symbol} per 24H
                  </Shared.NhubTypo>
                ) : determineEventStatus(poolData.startedAt, poolData.endedAt) !== EventStatusEnum.Closed ? (
                  <Shared.NhubTypo type="bold" usage="card" color="blue">
                    {toLocaleWithFixed(poolData.web3?.apy * 100)}%
                  </Shared.NhubTypo>
                ) : (
                  <Shared.NhubTypo type="bold" usage="card">
                    -
                  </Shared.NhubTypo>
                )}
                <Shared.NhubTypo type="bold" usage="card">
                  {poolData.web3?.tvl.toLocaleString()} {poolData.stakingToken?.symbol}
                </Shared.NhubTypo>
              </Desktop.ApyTvlTnl>
              {/* Type & Period */}
              <Desktop.TypeAndPeriod span={6}>
                <Shared.NhubTypo type="bold" usage="card">
                  {determineType(poolData.startedAt, poolData.withdrawEnabledAt, poolData.endedAt)}
                </Shared.NhubTypo>
                <Shared.NhubTypo type="bold" usage="card">
                  {dateToPeriod(poolData.startedAt)}
                  <br />~{dateToPeriod(poolData.endedAt)}
                </Shared.NhubTypo>
              </Desktop.TypeAndPeriod>
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
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    :first-child {
      margin-top: 3px;
      margin-bottom: 6px;
    }
  `,
  Symbol: styled.img``,
  Deposit: styled(Poolv4Col)`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    :first-child {
      margin-right: 6px;
    }
  `,
  MyReward: styled(Poolv4Col)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    :first-child {
      margin-right: 6px;
  `,
  ApyTvlTnl: styled(Poolv4Col)`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 8px;
    flex-direction: column;
  `,
  TypeAndPeriod: styled(Poolv4Col)`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  `
}
