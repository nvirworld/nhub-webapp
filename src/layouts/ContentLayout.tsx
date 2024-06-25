import React from 'react'
import styled from 'styled-components'
import useResponsiveScr from '../hooks/useResponsiveScr'
import { useLocation, useNavigate } from 'react-router-dom'

interface NHubLayoutProps {
  children: React.ReactNode
}

const NHubContentsLayout = (props: NHubLayoutProps) => {
  const { children } = props
  const { breakpoint } = useResponsiveScr()
  const location = useLocation()
  let contentStyle: React.CSSProperties = {}
  let paddingStyle: React.CSSProperties = {}
  switch (breakpoint) {
    case 'desktop':
      contentStyle = { ...contentStyle, minWidth: 900, marginTop: 68 }
      paddingStyle = { paddingLeft: 232, paddingRight: 232 }
      break
    case 'tablet':
      contentStyle = { ...contentStyle, minWidth: 608, marginTop: 85 }
      paddingStyle = { paddingLeft: 40, paddingRight: 40 }
      break
    case 'mobile':
      contentStyle = { ...contentStyle, minWidth: 320, marginTop: 40 }
      paddingStyle = { paddingLeft: 20, paddingRight: 20 }
      break
    default:
      break
  }
  return (
    <Layout.Body style={contentStyle}>
      <Layout.Contents>
        <Layout.Padding style={paddingStyle}>{children}</Layout.Padding>
      </Layout.Contents>
    </Layout.Body>
  )
}

export default NHubContentsLayout

const Layout = {
  Body: styled.div`
    height: 100%;
    display: flex;
    flex: 1;
    justify-content: center;
  `,
  Contents: styled.div`
    width: 100%;
    flex: 1;
    align-items: center;
    display: flex;
    flex-direction: column;
  `,
  Padding: styled.div`
    display: flex;
    width: 100%;
    flex: 1;
    flex-direction: column;
  `
}
