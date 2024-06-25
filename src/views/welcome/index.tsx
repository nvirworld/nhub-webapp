import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as Shared from '../../components/Shared'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { walletStatusState } from '../../recoil/wallet'
import { useQueryMyWallet } from '../../hooks/useQueryMyWallet'

const WelcomeView = () => {
  const navi = useNavigate()
  const myWalletConnected = () => {
    navi('/dashboard')
  }
  useQueryMyWallet(myWalletConnected, undefined)

  return (
    <Container>
      <Shared.NhubIcon.NavLogoIcon lg={{ w: 280 }} />
      <Shared.NhubTypo type="medium" usage="homeConnect">
        Please connect your wallet
      </Shared.NhubTypo>
    </Container>
  )
}

export default WelcomeView

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  margin-top: -200px;
`
