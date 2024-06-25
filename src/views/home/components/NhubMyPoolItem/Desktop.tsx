import React from 'react'
import styled from 'styled-components'
import * as Shared from '../../../../components/Shared'
import { NhubPoolItemProps } from '.'
import { Poolv4Col, Poolv4Row } from './Grid'
import { determineType } from '../../../../utils/determineType'
import NhubMyPoolSymbol from './NhubMyPoolSymbol'
import { toLocaleWithFixed } from '../../../../utils/number'

const DesktopItem = (props: NhubPoolItemProps) => {
  //TODO iconUrl vs imgaeUrl ?
  const { poolData } = props
  return (
    <>
      {poolData && (
        <Shared.NhubListGrayBox type={poolData.type}>
          <Desktop.Container>
            <Poolv4Row gutter={[30, 0]}>
              {/* Pool Title */}
              <Poolv4Col span={3}>
                <Desktop.Title>
                  <Shared.NhubTypo type="bold" usage="cardTitle">
                    {poolData.name}
                  </Shared.NhubTypo>
                </Desktop.Title>
              </Poolv4Col>

              {/* My Staked */}
              {/* Token */}
              {poolData.myWeb3?.stakedToken && poolData.myWeb3?.stakedNft721Ids.length === 0 ? (
                <>
                  <Poolv4Col span={1}>
                    <NhubMyPoolSymbol tokenUrl={poolData.stakingToken.iconUrl} />
                  </Poolv4Col>
                  <Desktop.MyStaked span={5}>
                    <Shared.NhubTypo type="bold" usage="card">
                      {poolData.myWeb3?.stakedToken.toLocaleString()} {poolData.stakingToken.symbol}
                    </Shared.NhubTypo>
                    <Shared.NhubTypo type="medium" usage="cardPrice">
                      ${' '}
                      {poolData.stakingToken?.tokenPriceUsdt &&
                        (poolData.myWeb3?.stakedToken * poolData.stakingToken?.tokenPriceUsdt).toLocaleString()}
                    </Shared.NhubTypo>
                  </Desktop.MyStaked>
                </>
              ) : null}
              {/* NFT */}
              {poolData.myWeb3?.stakedNft721Ids.length !== 0 && !poolData.myWeb3?.stakedToken && (
                <>
                  <Desktop.MyStakedNft span={6}>
                    <NhubMyPoolSymbol nftUrl={poolData.stakingNft721?.imgUrl} />
                    <Shared.NhubTypo type="bold" usage="card">
                      {poolData.stakingNft721?.name} {poolData.stakingNft721?.id}
                    </Shared.NhubTypo>
                  </Desktop.MyStakedNft>
                </>
              )}

              {/* Nft+Token */}
              {poolData.myWeb3?.stakedNft721Ids.length !== 0 && poolData.myWeb3?.stakedToken ? (
                <>
                  <Desktop.MyStakedNft span={6}>
                    <NhubMyPoolSymbol
                      nftUrl={poolData.stakingNft721?.imgUrl}
                      tokenUrl={poolData.stakingToken?.iconUrl}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                    </div>
                  </Desktop.MyStakedNft>
                </>
              ) : null}

              {/* My Reward */}
              {poolData.myWeb3?.pendingRewards && (
                <>
                  <Poolv4Col span={1}>
                    <NhubMyPoolSymbol tokenUrl={poolData.rewardToken.iconUrl ?? ''} />
                  </Poolv4Col>
                  <Desktop.MyReward span={5}>
                    <Shared.NhubTypo type="bold" usage="card">
                      {poolData.rewardToken?.tokenPriceUsdt && poolData.myWeb3?.pendingRewards.toLocaleString()}
                      {poolData.rewardToken.symbol}
                    </Shared.NhubTypo>
                    <Shared.NhubTypo type="medium" usage="cardPrice">
                      ${' '}
                      {poolData.rewardToken?.tokenPriceUsdt &&
                        (poolData.myWeb3?.pendingRewards * poolData.rewardToken?.tokenPriceUsdt).toLocaleString()}
                    </Shared.NhubTypo>
                  </Desktop.MyReward>
                </>
              )}

              {/* APY */}
              <Desktop.Apy span={3}>
                <Shared.NhubTypo type="bold" usage="card" color="blue">
                  {toLocaleWithFixed(poolData.web3?.apy * 100)}%
                </Shared.NhubTypo>
              </Desktop.Apy>

              {/* Dday & Type */}
              <Desktop.DdayAndType span={6}>
                <Shared.NhubTypo type="bold" usage="card">
                  <Shared.NhubDday targetDate={poolData.withdrawEnabledAt} />
                </Shared.NhubTypo>
                <Shared.NhubTypo type="medium" usage="card">
                  {determineType(poolData.startedAt, poolData.withdrawEnabledAt, poolData.endedAt)}
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
    align-items: center;
    overflow: hidden;
  `,
  Symbol: styled.img``,
  MyStaked: styled(Poolv4Col)`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    :first-child {
      margin-top: 2px;
      margin-bottom: 6px;
    }
  `,
  MyStakedNft: styled(Poolv4Col)`
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 10px;
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
    height: 100%;
    display: flex;
    align-items: felx-start;
    overflow: hidden;
  `,
  DdayAndType: styled(Poolv4Col)`
    height: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
  `
}
