import React, { useEffect, useState } from 'react'
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
  stakeTokenAction: (amount: number) => void
  buttonDisabled: boolean
}

const shortenAddress = (address: string): string => {
  if (address.length <= 10) {
    return address
  }
  return `${address.substring(0, 15)}...${address.substring(address.length - 4)}`
}

const StakeContent = (props: ContentProps) => {
  const { pool, myWallet, currentNetwork, stakeTokenAction, buttonDisabled } = props
  const [amount, setAmount] = useState<number>(0)

  const { data: stakingTokenBalance } = useQueryTokenBalance(currentNetwork, pool.stakingToken, myWallet ?? null)

  const upcomingDisabled = pool.startedAt.getTime() > Date.now() || pool.endedAt.getTime() < Date.now()
  const stakeDisabled = buttonDisabled || upcomingDisabled || amount < pool.stakingTokenMin

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
        {/* Token Balance */}
        <Content.LeftCol span={12}>
          <Shared.NhubTypo type="regular" usage="stake">
            Token Balance
          </Shared.NhubTypo>
        </Content.LeftCol>
        <Content.RightCol span={12}>
          <Shared.NhubTypo type="regular" usage="stake">
            {toLocaleWithFixed(stakingTokenBalance)} {pool.stakingToken?.symbol}
          </Shared.NhubTypo>
        </Content.RightCol>
        {/* Minimum */}
        <Content.MinimumLeft span={12}>
          <Shared.NhubTypo type="regular" usage="stake">
            Minimum
          </Shared.NhubTypo>
        </Content.MinimumLeft>
        <Content.MinimumRight span={12}>
          <Shared.NhubTypo type="regular" usage="stake">
            {toLocaleWithFixed(pool.stakingTokenMin)} {pool.stakingToken?.symbol}
          </Shared.NhubTypo>
        </Content.MinimumRight>
        {/* Amount */}
        <Shared.NhubAmountInput
          balance={stakingTokenBalance ?? 0}
          iconUrl={pool.stakingToken?.iconUrl ?? ''}
          minimum={pool.stakingTokenMin}
          symbol={pool.stakingToken?.symbol ?? ''}
          onChangeAmount={setAmount}
        />
        <DetailButton
          onClick={() => stakeTokenAction(amount)}
          disabled={stakeDisabled}
        >
          Stake
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

export default StakeContent

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
    text-align: right;
  `,
  LineCol: styled(Col)`
    border: solid 0.5px #d3dce8;
    margin: 22px 0px;
  `,
  MinimumLeft: styled(Col)`
    display: ${(props) => (props.theme.breakpoint === 'mobile' ? 'flex' : 'none')};
    align-items: center;
    justify-content: flex-start;
  `,
  MinimumRight: styled(Col)`
    display: ${(props) => (props.theme.breakpoint === 'mobile' ? 'flex' : 'none')};
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: column;
    text-align: right;
  `,

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
