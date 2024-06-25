import React from 'react'
import styled from 'styled-components'
import * as Shared from '../../../../components/Shared'
import { NhubPoolItemProps } from '.'
import { Poolv4Col, Poolv4Row } from './Grid'
import { determineType } from '../../../../utils/determineType'
import determineEventStatus from '../../../../utils/determineEventStatus'
import NhubNftSymbol from './NhubNftSymbol'
import dateToPeriod from '../../../../utils/dateToPeriod'
import { toLocaleWithFixed } from '../../../../utils/number'

const MobileItem = (props: NhubPoolItemProps) => {
  const { poolData } = props
  return (
    <>
      {poolData && (
        <Shared.NhubListGrayBox type={poolData.type}>
          <Mobile.Container>
            <Poolv4Row gutter={[10, 10]}>
              {/* Pool Title */}
              <Mobile.Title span={24}>
                <Shared.NhubTypo type="bold" usage="cardTitle">
                  {poolData.name}
                </Shared.NhubTypo>
                <Shared.NhubDetermineStatus startDate={poolData.startedAt} endDate={poolData.endedAt} />
              </Mobile.Title>
              {/* Deposit */}
              <Mobile.Deposit span={24}>
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
              </Mobile.Deposit>
              {/* My Reward */}
              <Mobile.MyReward span={24}>
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
              </Mobile.MyReward>
              {/* TNL or TVL */}
              <Mobile.Tnl span={24}>
                <LeftWrap>
                  <Shared.NhubTypo type="light" usage="columnHeader">
                    {poolData.type === 'nft721' ? 'TNL' : 'TVL'}
                  </Shared.NhubTypo>
                  <Shared.NhubTypo type="bold" usage="card" color="blue">
                    {/* {poolData.web3?.tnl} NFT */}
                    {poolData.type === 'nft721'
                      ? `${poolData.web3?.tnl.toLocaleString()} NFT`
                      : `${poolData.web3?.tvl.toLocaleString()} ${poolData.stakingToken.symbol}`}
                  </Shared.NhubTypo>
                  {poolData.type !== 'nft721' && (
                    <Shared.NhubTypo type="medium" usage="cardPrice">
                      $ {toLocaleWithFixed(poolData.web3?.tvlToUsdt)}
                    </Shared.NhubTypo>
                  )}
                </LeftWrap>
              </Mobile.Tnl>
              {/* APY */}
              <Mobile.Apy span={24}>
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
              </Mobile.Apy>
              {/* Type  */}
              <Mobile.Type span={24}>
                <LeftWrap>
                  <Shared.NhubTypo type="light" usage="columnHeader">
                    Type
                  </Shared.NhubTypo>
                  <Shared.NhubTypo type="bold" usage="card">
                    {determineType(poolData.startedAt, poolData.withdrawEnabledAt, poolData.endedAt)}
                  </Shared.NhubTypo>
                </LeftWrap>
              </Mobile.Type>
              {/* Period */}
              <Mobile.Period span={24}>
                <LeftWrap>
                  <Shared.NhubTypo type="light" usage="columnHeader">
                    Period
                  </Shared.NhubTypo>
                  <Shared.NhubTypo type="bold" usage="card">
                    {dateToPeriod(poolData.startedAt)}~{dateToPeriod(poolData.endedAt)}
                  </Shared.NhubTypo>
                </LeftWrap>
              </Mobile.Period>
            </Poolv4Row>
          </Mobile.Container>
        </Shared.NhubListGrayBox>
      )}
    </>
  )
}

export default MobileItem

const Mobile = {
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
  align-items: flex-start;
  gap: 8px;
`
