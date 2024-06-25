import React from 'react'
import styled from 'styled-components'
import * as Shared from '../../../../components/Shared'
import { NhubPoolItemProps } from '.'
import { Poolv4Col, Poolv4Row } from './Grid'
import { determineType } from '../../../../utils/determineType'
import NhubMyPoolSymbol from './NhubMyPoolSymbol'
import { toLocaleWithFixed } from '../../../../utils/number'

const MobileItem = (props: NhubPoolItemProps) => {
  //TODO iconUrl vs imgaeUrl ?
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
              </Mobile.Title>
              {/* My Staked */}
              <Mobile.MyStaked span={24}>
                <LeftWrap>
                  <Shared.NhubTypo type="light" usage="columnHeader">
                    My Staked
                  </Shared.NhubTypo>
                  {/* Token */}
                  {poolData.myWeb3?.stakedToken && poolData.myWeb3?.stakedNft721Ids.length === 0 ? (
                    <RowWrap>
                      <NhubMyPoolSymbol tokenUrl={poolData.stakingToken.iconUrl} />
                      <LeftWrap>
                        <Shared.NhubTypo type="bold" usage="card">
                          {poolData.myWeb3?.stakedToken.toLocaleString()} {poolData.stakingToken.symbol}
                        </Shared.NhubTypo>
                        <Shared.NhubTypo type="medium" usage="cardPrice">
                          ${' '}
                          {poolData.stakingToken?.tokenPriceUsdt &&
                            (poolData.myWeb3?.stakedToken * poolData.stakingToken?.tokenPriceUsdt).toLocaleString()}
                        </Shared.NhubTypo>
                      </LeftWrap>
                    </RowWrap>
                  ) : null}
                  {/* NFT */}
                  {poolData.myWeb3?.stakedNft721Ids.length !== 0 && !poolData.myWeb3?.stakedToken && (
                    <RowWrap style={{ alignItems: 'center' }}>
                      <NhubMyPoolSymbol nftUrl={poolData.stakingNft721?.imgUrl} />
                      <LeftWrap>
                        <Shared.NhubTypo type="bold" usage="card">
                          {poolData.stakingNft721?.name} {poolData.stakingNft721?.id}
                        </Shared.NhubTypo>
                      </LeftWrap>
                    </RowWrap>
                  )}
                  {/* Nft+Token */}
                  {poolData.myWeb3?.stakedNft721Ids.length !== 0 && poolData.myWeb3?.stakedToken ? (
                    <>
                      <RowWrap style={{ alignItems: 'center' }}>
                        <NhubMyPoolSymbol
                          nftUrl={poolData.stakingNft721?.imgUrl}
                          tokenUrl={poolData.stakingToken?.iconUrl}
                        />
                        <LeftWrap style={{ gap: 5 }}>
                          <Shared.NhubTypo type="bold" usage="card">
                            {poolData.stakingNft721?.name} {poolData.stakingNft721?.id}
                          </Shared.NhubTypo>
                          <Shared.NhubTypo type="bold" usage="card">
                            {poolData.myWeb3?.stakedToken.toLocaleString()} {poolData.stakingToken.symbol}
                          </Shared.NhubTypo>
                          <Shared.NhubTypo type="medium" usage="cardPrice">
                            ${' '}
                            {poolData.stakingToken?.tokenPriceUsdt &&
                              (poolData.myWeb3?.stakedToken * poolData.stakingToken?.tokenPriceUsdt).toLocaleString()}
                          </Shared.NhubTypo>
                        </LeftWrap>
                      </RowWrap>
                    </>
                  ) : null}
                </LeftWrap>
              </Mobile.MyStaked>
              {/* My Reward */}
              <Mobile.MyReward span={24}>
                <LeftWrap>
                  <Shared.NhubTypo type="light" usage="columnHeader">
                    My Reward
                  </Shared.NhubTypo>
                  {poolData.myWeb3?.pendingRewards ? (
                    <>
                      <RowWrap>
                        <NhubMyPoolSymbol tokenUrl={poolData.rewardToken.iconUrl} />
                        <LeftWrap>
                          <Shared.NhubTypo type="bold" usage="card">
                            {poolData.myWeb3?.pendingRewards.toLocaleString()} {poolData.rewardToken.symbol}
                          </Shared.NhubTypo>
                          <Shared.NhubTypo type="medium" usage="cardPrice">
                            ${' '}
                            {poolData.rewardToken?.tokenPriceUsdt &&
                              (poolData.myWeb3?.pendingRewards * poolData.rewardToken?.tokenPriceUsdt).toLocaleString()}
                          </Shared.NhubTypo>
                        </LeftWrap>
                      </RowWrap>
                    </>
                  ) : null}
                </LeftWrap>
              </Mobile.MyReward>
              {/* APY */}
              <Mobile.APY span={24}>
                <LeftWrap>
                  <Shared.NhubTypo type="light" usage="columnHeader">
                    APY
                  </Shared.NhubTypo>
                  <Shared.NhubTypo type="bold" usage="card" color="blue">
                    {toLocaleWithFixed(poolData.web3?.apy * 100)}%
                  </Shared.NhubTypo>
                </LeftWrap>
              </Mobile.APY>
              {/* Unstake D-day */}
              <Mobile.Dday span={24}>
                <LeftWrap>
                  <Shared.NhubTypo type="light" usage="columnHeader">
                    Unstake D-day
                  </Shared.NhubTypo>
                  <Shared.NhubTypo type="bold" usage="card">
                    <Shared.NhubDday targetDate={poolData.withdrawEnabledAt} />
                  </Shared.NhubTypo>
                </LeftWrap>
              </Mobile.Dday>
              {/* Type */}
              <Mobile.Type span={24}>
                <LeftWrap>
                  <Shared.NhubTypo type="light" usage="columnHeader">
                    Type
                  </Shared.NhubTypo>
                  <Shared.NhubTypo type="medium" usage="card">
                    {determineType(poolData.startedAt, poolData.withdrawEnabledAt, poolData.endedAt)}
                  </Shared.NhubTypo>
                </LeftWrap>
              </Mobile.Type>
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
    align-items: center;
    overflow: hidden;
  `,
  Symbol: styled.img``,
  MyStaked: styled(Poolv4Col)`
    display: flex;
    align-items: flex-start;
  `,
  MyReward: styled(Poolv4Col)`
    display: flex;
    align-items: flex-start;
  `,
  APY: styled(Poolv4Col)`
    display: flex;
    align-items: center;
    overflow: hidden;
  `,
  Dday: styled(Poolv4Col)`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    overflow: hidden;
  `,
  Type: styled(Poolv4Col)`
    display: flex;
    align-items: flex-start;
    overflow: hidden;
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
  margin-top: 4px;
`
