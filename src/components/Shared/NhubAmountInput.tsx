import React, { useState } from 'react'
import WarningText from './WarningText.json'
import { styled } from 'styled-components'
import { Col, Row } from 'antd'
import * as Shared from './index'

export interface NhubAmountInputProps {
  balance: number
  iconUrl: string
  minimum: number
  symbol: string
  onChangeAmount: (amount: number) => void
  viewerAmount?: number
}

interface AmountBoxProps {
  isWarn: boolean
}

const NhubAmountInput = (props: NhubAmountInputProps) => {
  const {
    balance,
    iconUrl,
    minimum,
    symbol,
    viewerAmount
  } = props

  const isViewer = viewerAmount != null

  const [warning, setWarning] = useState<string | null>(null)
  const [amount, setAmount] = useState<number>(0)

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value)

    if (isNaN(inputValue)) return

    if (inputValue === 0 || inputValue < 0) {
      changeAmount(0)
      setWarning(WarningText.NoAmount)
      return
    }

    if (!balance) return

    if (inputValue < minimum) {
      changeAmount(inputValue)
      setWarning(WarningText.MinAmount)
      return
    } else if (inputValue <= balance) {
      changeAmount(inputValue)
      setWarning(null)
      return
    } else if (inputValue > balance) {
      changeAmount(balance)
      setWarning(null)
      return
    }
  }

  const clickedMax = () => {
    if (balance) {
      changeAmount(balance)
      setWarning(null)
    }
  }

  const changeAmount = (amount: number) => {
    if (isViewer) return
    const multiplier = Math.pow(10, 6)
    const amountWithDecimals = Math.floor(amount * multiplier) / multiplier
    setAmount(amountWithDecimals)
    props.onChangeAmount(amountWithDecimals)
  }

  return <>
    <Content.AmountRow gutter={[0, 0]} isWarn={warning ? true : false}>
      <Content.AmountCol span={3}>
        <Content.AmountSymbol src={iconUrl} />
      </Content.AmountCol>
      <Content.LeftCol span={3}>
        <Shared.NhubTypo type='regular' usage='stake'>
          Amount
        </Shared.NhubTypo>
      </Content.LeftCol>
      <Content.AmountCol span={isViewer ? 17 : 15}>
        <Content.AmountInput
          disabled={isViewer}
          value={viewerAmount != null ? viewerAmount : (amount === 0 ? '' : amount)}
          type='number'
          inputmode='decimal'
          placeholder={`Minimum ${minimum.toLocaleString()} ${symbol}`}
          onChange={onChangeAmount}
        />
      </Content.AmountCol>
      {!isViewer ? (
        <Content.AmountCol span={3}>
          <Content.AmountMaxBtn onClick={() => clickedMax()}>
            <Shared.NhubTypo type='bold' usage='max'>
              MAX
            </Shared.NhubTypo>
          </Content.AmountMaxBtn>
        </Content.AmountCol>
        ) : <></>
      }
    </Content.AmountRow>
    {warning && (
      <>
        <Content.LeftCol span={3} />
        <Content.LeftCol span={21}>
          <Shared.NhubTypo type="medium" usage="stakeWarning" color="red">
            {warning}
            {warning === WarningText.MinAmount && minimum.toLocaleString()}
            {warning === WarningText.MaxAmount && balance.toLocaleString()}
          </Shared.NhubTypo>
        </Content.LeftCol>
      </>
    )}
  </>
}

const Content = {
  Row: styled(Row)``,
  LeftCol: styled(Col)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
  `,
  AmountRow: styled(Row)<AmountBoxProps>`
    width: 100%;
    height: 40px;
    border-radius: 10px;
    ${(props) => props.isWarn && 'border: solid 1px #eb4444;'}
    background-color: #121212;
    ${(props) => props.theme.breakpoint === 'mobile' && 'padding: 0px 5px;'}
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
    font-weight: bold;
    text-align: right;

    &::placeholder {
      ${(props) => props.theme.breakpoint === 'mobile' && 'opacity : 0'};
      color: #ffffff;
    }
    &:disabled {
      color: #fff;
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
    margin-right: 10px;
    margin-left: 10px;
  `
}

export default NhubAmountInput