import React from 'react'
import styled from 'styled-components'
import NHubContentsLayout from './ContentLayout'
import NHubHeader from '../components/NhubHeader'
import NHubFooter from '../components/NHubFooter'

interface NHubLayoutProps {
  children: React.ReactNode
}

const NHubLayout = (props: NHubLayoutProps) => {
  const { children } = props
  return (
    <Layout.Body>
      <NHubHeader />
      <NHubContentsLayout>{children}</NHubContentsLayout>
      {/* <SampleFooter /> */}
      <NHubFooter />
    </Layout.Body>
  )
}

export default NHubLayout

const Layout = {
  Body: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    width: 100%;
    height: 100%;
    min-height: 100vh;
  `
}
