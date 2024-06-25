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

const TabletItem = (props: NhubPoolItemProps) => {
  const { poolData } = props
  return (
    <>
      {poolData && (
        <Shared.NhubListGrayBox type={poolData.type}>
          <Tablet.Container>
            <Poolv4Row gutter={[10, 10]}>
              {/* Pool Title */}
              <Tablet.Title span={24}>
                <Shared.NhubTypo type="bold" usage="cardTitle">
                  {poolData.name}
                </Shared.NhubTypo>
                <Shared.NhubDetermineStatus startDate={poolData.startedAt} endDate={poolData.endedAt} />
              </Tablet.Title>
              {/* Deposit */}
              <Tablet.Deposit span={6}>
                <LeftWrap>
                  <Shared.NhubTypo type="light" usage="columnHeader">
                    Deposit
                  </Shared.NhubTypo>
                  <RowWrap>
                    <NhubNftSymbol
                      nftUrl={poolData.stakingNft721?.imgUrl}
                      tokenUrl={poolData.stakingToken?.iconUrl ?? null}
                    />
                    <Shared.NhubTypo type="bold" usage="card">
                      {poolData.stakingNft721?.name}
                    </Shared.NhubTypo>
                  </RowWrap>
                </LeftWrap>
              </Tablet.Deposit>
              {/* My Reward */}
              <Tablet.MyReward span={4}>
                <LeftWrap>
                  <Shared.NhubTypo type="light" usage="columnHeader">
                    Reward
                  </Shared.NhubTypo>
                  <RowWrap>
                    <NhubNftSymbol tokenUrl={poolData.rewardToken.iconUrl} />
                    <Shared.NhubTypo type="bold" usage="card">
                      {poolData.rewardToken.symbol}
                    </Shared.NhubTypo>
                  </RowWrap>
                </LeftWrap>
              </Tablet.MyReward>
              {/* TNL or TVL */}
              <Tablet.Tnl span={14}>
                <LeftWrap>
                  <Shared.NhubTypo type="light" usage="columnHeader">
                    {poolData.type === 'nft721' ? 'TNL' : 'TVL'}
                  </Shared.NhubTypo>
                  <Shared.NhubTypo type="bold" usage="card" color="blue">
                    {/* {poolData.web3?.tnl} NFT */}
                    {poolData.type === 'nft721'
                      ? `${toLocaleWithFixed(poolData.web3?.tnl)} NFT`
                      : `${toLocaleWithFixed(poolData.web3?.tvl)} ${poolData.stakingToken.symbol}`}
                  </Shared.NhubTypo>
                  {poolData.type !== 'nft721' && (
                    <Shared.NhubTypo type="medium" usage="cardPrice">
                      $ {toLocaleWithFixed(poolData.web3?.tvlToUsdt)}
                    </Shared.NhubTypo>
                  )}
                </LeftWrap>
              </Tablet.Tnl>
              {/* APY */}
              <Tablet.Apy span={6}>
                <LeftWrap>
                  <Shared.NhubTypo type="light" usage="columnHeader">
                    APY
                  </Shared.NhubTypo>
                  {determineEventStatus(poolData.startedAt, poolData.endedAt) !== EventStatusEnum.Closed ? (
                    <Shared.NhubTypo type="bold" usage="card" color="blue">
                      {toLocaleWithFixed(poolData.web3?.apy * 100)}%
                    </Shared.NhubTypo>
                  ) : (
                    <Shared.NhubTypo type="bold" usage="card">
                      -
                    </Shared.NhubTypo>
                  )}
                </LeftWrap>
              </Tablet.Apy>
              {/* Type  */}
              <Tablet.Type span={4}>
                <LeftWrap>
                  <Shared.NhubTypo type="light" usage="columnHeader">
                    Type
                  </Shared.NhubTypo>
                  <Shared.NhubTypo type="bold" usage="card">
                    {determineType(poolData.startedAt, poolData.withdrawEnabledAt, poolData.endedAt)}
                  </Shared.NhubTypo>
                </LeftWrap>
              </Tablet.Type>
              {/* Period */}
              <Tablet.Period span={14}>
                <LeftWrap>
                  <Shared.NhubTypo type="light" usage="columnHeader">
                    Period
                  </Shared.NhubTypo>
                  <Shared.NhubTypo type="bold" usage="card">
                    {dateToPeriod(poolData.startedAt)}~{dateToPeriod(poolData.endedAt)}
                  </Shared.NhubTypo>
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
  Tnl: styled(Poolv4Col)`
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
