import React from 'react'
import styled from 'styled-components'

interface NhubListGrayBoxProps {
  children: React.ReactNode
}

const DetailGrayBox: React.FC<NhubListGrayBoxProps> = (props) => {
  const { children } = props

  return <Layout.Body>{children}</Layout.Body>
}

export default DetailGrayBox

const Layout = {
  Body: styled.div`
    width: ${(props) => (props.theme.breakpoint === 'mobile' ? '100%' : '500px')};
    background-color: #20202a;
    border-radius: 20px;
    padding: 0px 35px 30px 35px;
  `
}

// desktop  500px tablet  500px mobile  286px
