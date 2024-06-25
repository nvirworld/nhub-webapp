import React from 'react'
import styled from 'styled-components'
import useResponsiveScr from '../../../hooks/useResponsiveScr'

interface DashboardBoxProps {
  children: React.ReactNode
}
interface LayoutBodyProps {
  breakpoint: 'desktop' | 'tablet' | 'mobile'
}

const DashboardBox: React.FC<DashboardBoxProps> = (props) => {
  const { children } = props
  const { breakpoint } = useResponsiveScr()

  return <Layout.Body breakpoint={breakpoint}>{children}</Layout.Body>
}

export default DashboardBox

const Layout = {
  Body: styled.div<LayoutBodyProps>`
    width: ${(props) => (props.breakpoint === 'desktop' ? '290px' : props.breakpoint === 'tablet' ? '200px' : '95%')};
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    background-color: #20202a;
    border-radius: 20px;
    padding: 26px;
    text-align: center;
  `
}
