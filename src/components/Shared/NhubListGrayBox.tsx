import React from 'react'
import styled from 'styled-components'

interface NhubListGrayBoxProps {
  children: React.ReactNode
  type: 'token' | 'nft721' | 'nft721+token' | null
}
interface LayoutBodyProps {
  type: 'token' | 'nft721' | 'nft721+token' | null
}
const getHeight = (breakpoint: string, type: 'token' | 'nft721' | 'nft721+token' | null): string => {
  switch (breakpoint) {
    case 'desktop':
      return type === 'token' ? '97px' : '100px'
    case 'tablet':
      return '189px'
    case 'mobile':
      return '415px'
    default:
      return '100px'
  }
}
const NhubListGrayBox: React.FC<NhubListGrayBoxProps> = (props) => {
  const { children, type } = props

  return <Layout.Body type={type}>{children}</Layout.Body>
}

export default NhubListGrayBox

const Layout = {
  Body: styled.div<LayoutBodyProps>`
    width: 100%;
    height: ${(props) => getHeight(props.theme.breakpoint, props.type)};
    background-color: #20202a;
    border-radius: 20px;
    padding: 16px 20px;
    cursor: pointer;
    &: hover {
      box-shadow: 0 0 10px 0 rgba(100, 154, 227, 0.62);
    }
  `
}
