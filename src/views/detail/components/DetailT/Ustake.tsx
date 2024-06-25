import React, { useState } from 'react'
import { styled } from 'styled-components'
import { Col, Row } from 'antd'
import * as Shared from '../../../../components/Shared'
import { PoolDetailViewProps } from '../../'
import { useQueryTokenBalance } from '../../../../hooks/useQueryTokenBalance'
import { IMyWallet, INetwork } from '../../../../types/entity.type'
import determineEventStatus, { EventStatusEnum } from '../../../../utils/determineEventStatus'
import { determineType } from '../../../../utils/determineType'
import dateToPeriod from '../../../../utils/dateToPeriod'
import { toLocaleWithFixed } from '../../../../utils/number'
import DetailButton from '../DetailButton'

interface ContentProps {
  pool: PoolDetailViewProps['pool']
  myWallet: IMyWallet | undefined | null
  currentNetwork: INetwork | null
  unstakeTokenAction: () => void
  buttonDisabled: boolean
}
const shortenAddress = (address: string): string => {
  if (address.length <= 10) {
    return address
  }
  return `${address.substring(0, 15)}...${address.substring(address.length - 4)}`
}

const UnstakeContent = (props: ContentProps) => {
  const { pool, myWallet, currentNetwork, unstakeTokenAction, buttonDisabled } = props

  const isButtonDisabled = pool.withdrawEnabledAt > Date.now()

  const { data: stakingTokenBalance } = useQueryTokenBalance(currentNetwork, pool.stakingToken, myWallet ?? null)
  return (
    <>
      <Content.Row gutter={[0, 8]}>
        {/* APY */}
        <Content.LeftCol span={12}>
          <Shared.NhubTypo type="regular" usage="stake">
            APY
          </Shared.NhubTypo>
        </Content.LeftCol>
        <Content.RightCol span={12}>
          <Shared.NhubTypo type="bold" usage="stake" color="blue">
            {toLocaleWithFixed(pool.web3?.apy * 100)} %
          </Shared.NhubTypo>
        </Content.RightCol>
        {/* Staked amount */}
        <Content.LeftCol span={12}>
          <Shared.NhubTypo type="regular" usage="stake">
            My Staked amount
          </Shared.NhubTypo>
        </Content.LeftCol>
        <Content.RightCol span={12}>
          <Shared.NhubTypo type="regular" usage="stake">
            {pool.myWeb3?.stakedToken.toLocaleString()} {pool.stakingToken?.symbol}
          </Shared.NhubTypo>
        </Content.RightCol>
        {/* Reward amount */}
        <Content.LeftCol span={12}>
          <Shared.NhubTypo type="regular" usage="stake">
            My Reward amount
          </Shared.NhubTypo>
        </Content.LeftCol>
        <Content.RightCol span={12}>
          <Shared.NhubTypo type="regular" usage="stake">
            + {pool.myWeb3?.pendingRewards.toLocaleString()} {pool.rewardToken.symbol}
          </Shared.NhubTypo>
        </Content.RightCol>
        {/* Line */}
        <Content.LineCol span={24} />
        {/* Untake button */}
        <DetailButton onClick={() => unstakeTokenAction()} disabled={buttonDisabled || isButtonDisabled}>
          Unstake
        </DetailButton>
        {/* Line */}
        <Content.LineCol span={24} />
      </Content.Row>
      <Content.Row gutter={[0, 0]}>
        {/* Contract Address  */}
        <Content.LeftCol span={12}>
          <Shared.NhubTypo type="regular" usage="stake">
            Contract Address
          </Shared.NhubTypo>
          <a
            style={{ marginLeft: 4 }}
            href={`${pool.network.scan}/address/${pool.address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Shared.NhubIcon.MenuOpenIcon />
          </a>
        </Content.LeftCol>
        <Content.RightCol span={12}>
          <Shared.NhubTypo type="regular" usage="stake">
            {shortenAddress(pool.address)}
          </Shared.NhubTypo>
        </Content.RightCol>
        {/* Margin */}
        <Content.LeftCol span={24}>&nbsp;</Content.LeftCol>
        <Content.LeftCol span={24}>&nbsp;</Content.LeftCol>
        {/* TVL */}
        <Content.LeftCol span={12}>
          <Shared.NhubTypo type="regular" usage="stake">
            TVL
          </Shared.NhubTypo>
        </Content.LeftCol>
        {determineEventStatus(pool.startedAt, pool.endedAt) !== EventStatusEnum.Closed ? (
          <>
            <Content.RightCol span={12}>
              <Shared.NhubTypo type="regular" usage="stake">
                {toLocaleWithFixed(pool.web3?.tvl)} {pool.stakingToken?.symbol}
              </Shared.NhubTypo>
            </Content.RightCol>
            <Content.RightCol span={24}>
              <Shared.NhubTypo type="regular" usage="stake">
                $ {toLocaleWithFixed(pool.web3?.tvlToUsdt)}
              </Shared.NhubTypo>
            </Content.RightCol>
          </>
        ) : (
          <>
            <Content.RightCol span={12}>
              <Shared.NhubTypo type="bold" usage="card">
                -
              </Shared.NhubTypo>
            </Content.RightCol>
            <Content.LeftCol span={24}>&nbsp;</Content.LeftCol>
          </>
        )}

        {/* Margin */}
        <Content.LeftCol span={24}>&nbsp;</Content.LeftCol>
        {/* Pool Reward Distribution */}
        <Content.LeftCol span={12}>
          <Shared.NhubTypo type="regular" usage="stake">
            Pool Reward Distribution
          </Shared.NhubTypo>
        </Content.LeftCol>
        {determineEventStatus(pool.startedAt, pool.endedAt) !== EventStatusEnum.Closed ? (
          <>
            <Content.RightCol span={12}>
              <Shared.NhubTypo type="regular" usage="stake">
                {toLocaleWithFixed(pool.web3?.trd)} {pool.rewardToken.symbol}
              </Shared.NhubTypo>
            </Content.RightCol>
            <Content.RightCol span={24}>
              <Shared.NhubTypo type="regular" usage="stake">
                $ {toLocaleWithFixed(pool.web3?.trdToUsdt)}
              </Shared.NhubTypo>
            </Content.RightCol>
          </>
        ) : (
          <>
            <Content.RightCol span={12}>
              <Shared.NhubTypo type="bold" usage="card">
                -
              </Shared.NhubTypo>
            </Content.RightCol>
            <Content.LeftCol span={24}>&nbsp;</Content.LeftCol>
          </>
        )}

        {/* Margin */}
        <Content.LeftCol span={24}>&nbsp;</Content.LeftCol>
        {/* Status */}
        <Content.LeftCol span={12}>
          <Shared.NhubTypo type="regular" usage="stake">
            Status
          </Shared.NhubTypo>
        </Content.LeftCol>
        <Content.RightCol span={12}>
          <Shared.NhubTypo type="regular" usage="stake">
            {determineEventStatus(pool.startedAt, pool.endedAt)}
          </Shared.NhubTypo>
        </Content.RightCol>
        {/* Margin */}
        <Content.LeftCol span={24}>&nbsp;</Content.LeftCol>
        <Content.LeftCol span={24}>&nbsp;</Content.LeftCol>
        {/* Mainnet */}
        <Content.LeftCol span={12}>
          <Shared.NhubTypo type="regular" usage="stake">
            Mainnet
          </Shared.NhubTypo>
        </Content.LeftCol>
        <Content.RightCol span={12}>
          <Shared.NhubTypo type="regular" usage="stake">
            {pool.network.name}
          </Shared.NhubTypo>
        </Content.RightCol>
        {/* Margin */}
        <Content.LeftCol span={24}>&nbsp;</Content.LeftCol>
        <Content.LeftCol span={24}>&nbsp;</Content.LeftCol>
        {/* Type */}
        <Content.LeftCol span={12}>
          <Shared.NhubTypo type="regular" usage="stake">
            Type
          </Shared.NhubTypo>
        </Content.LeftCol>
        <Content.RightCol span={12}>
          <Shared.NhubTypo type="regular" usage="stake">
            {determineType(pool.startedAt, pool.withdrawEnabledAt, pool.endedAt)}
          </Shared.NhubTypo>
        </Content.RightCol>
        {/* Margin */}
        <Content.LeftCol span={24}>&nbsp;</Content.LeftCol>
        <Content.LeftCol span={24}>&nbsp;</Content.LeftCol>
        {/* Period */}
        <Content.LeftCol span={12}>
          <Shared.NhubTypo type="regular" usage="stake">
            Period
          </Shared.NhubTypo>
        </Content.LeftCol>
        <Content.RightCol span={12}>
          <Shared.NhubTypo type="regular" usage="stake">
            <Shared.NhubDday targetDate={pool.endedAt} />
          </Shared.NhubTypo>
        </Content.RightCol>
        <Content.RightCol span={24}>
          <Shared.NhubTypo type="regular" usage="stake">
            {dateToPeriod(pool.startedAt)} ~ {dateToPeriod(pool.endedAt)}
          </Shared.NhubTypo>
        </Content.RightCol>
      </Content.Row>
    </>
  )
}

export default UnstakeContent

const Content = {
  Row: styled(Row)``,
  LeftCol: styled(Col)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
  `,
  RightCol: styled(Col)`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: column;
  `,
  LineCol: styled(Col)`
    border: solid 0.5px #d3dce8;
    margin: 22px 0px;
  `,
  AmountRow: styled(Row)`
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: solid 1px #eb4444;
    background-color: #121212;
  `,
  AmountCol: styled(Col)`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  AmountSymbol: styled.img`
    width: 24px;
    height: 24px;
    border-radius: 50%;
  `,
  AmountInput: styled.input`
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    color: white;
    font-size: 14px;
    font-family: 'poppins', sans-serif;
    text-align: right;
    &:placeholder {
      color: #ffffff;
    }
  `,
  AmountMaxBtn: styled.button`
    cursor: pointer;
    width: 40px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2c3f50;
    border-radius: 7px;
    border: none;
    outline: none;
  `
}

const FullBtn = styled.button`
  width: 100%;
  height: 40px;
  background-color: ${(props) => props.theme.blue};
  border-radius: 10px;
  border: none;
  outline: none;
  cursor: pointer;
`
