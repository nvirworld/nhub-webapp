import React from 'react'
import styled from 'styled-components'
import * as Shared from '../../../components/Shared'

interface DetailButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled: boolean
}

const DetailButton = (props: DetailButtonProps) => {
  const { children, onClick, disabled } = props
  return (
    <Button onClick={onClick} disabled={disabled}>
      <Shared.NhubTypo type="bold" usage="stakeBtn" color={disabled ? 'blue' : null}>
        {children}
      </Shared.NhubTypo>
    </Button>
  )
}

export default DetailButton

const Button = styled.button`
  width: 100%;
  height: 40px;
  background-color: ${(props) => props.theme.blue};
  border-radius: 10px;
  border: none;
  outline: none;
  cursor: pointer;
  &:disabled {
    background-color: #20202a;
    cursor: not-allowed;
    border: solid 1px #1e7afa;
  }
`
