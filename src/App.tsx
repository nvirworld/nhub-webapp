import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import NHubLayout from './layouts/MainLayout'
import '../src/styles/normalize.css'
import HomeView from './views/home'
import NftPoolView from './views/nft'
import TokenPoolView from './views/token'
import { useRecoilValue } from 'recoil'
import { themeState } from './recoil/theme'
import { ThemeProvider } from 'styled-components'
import PlaygroundView from './views/playground'
import useResponsiveScr from './hooks/useResponsiveScr'
import DetailView from './views/detail'
import WelcomeView from './views/welcome'
import BridgeView from './views/bridge'
import { useQueryMyWallet } from './hooks/useQueryMyWallet'

const App: React.FC = () => {
  const isDark = useRecoilValue(themeState)
  const { breakpoint } = useResponsiveScr()
  const darkTheme = {
    breakpoint,
    background: '#31313d',
    text: '#fff',
    blue: '#137afa',
    white: '#fff'
  }
  const LightTheme = {
    breakpoint,
    background: '#fff',
    text: '#000',
    blue: '#137afa',
    white: '#fff'
  }
  const theme = isDark ? darkTheme : LightTheme

  const myWalletDisconnected = () => {
    if (window.location.pathname === '/dashboard') {
      window.location.href = '/welcome'
    }
  }
  useQueryMyWallet(undefined, myWalletDisconnected)

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route>
            <Route path="/" element={<Navigate to="/welcome" />} />
            <Route
              path="/welcome"
              element={
                <NHubLayout>
                  <WelcomeView />
                </NHubLayout>
              }
            />
            <Route
              path="/dashboard"
              element={
                <NHubLayout>
                  <HomeView />
                </NHubLayout>
              }
            />
            <Route
              path="/nft"
              element={
                <NHubLayout>
                  <NftPoolView />
                </NHubLayout>
              }
            />
            <Route
              path="/token"
              element={
                <NHubLayout>
                  <TokenPoolView />
                </NHubLayout>
              }
            />
            <Route
              path="/pool/:id"
              element={
                <NHubLayout>
                  <DetailView />
                </NHubLayout>
              }
            />
            <Route
              path="/bridge"
              element={
                <NHubLayout>
                  <BridgeView />
                </NHubLayout>
              }
            />
          </Route>
          <Route path="/playground" element={<PlaygroundView />} />
        </Routes>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </ThemeProvider>
    </Router>
  )
}

export default App
