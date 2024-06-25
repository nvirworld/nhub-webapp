import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import * as Shared from '../components/Shared'
import { useRecoilState } from 'recoil'
import { themeState } from '../recoil/theme'
import { useLocation, useNavigate } from 'react-router-dom'
import useResponsiveScr from '../hooks/useResponsiveScr'
import { useQueryMyWallet } from '../hooks/useQueryMyWallet'
import { useMutationConnectWallet } from '../hooks/useMutationConnectWallet'
import { useMutationDisconnectWallet } from '../hooks/useMutationDisconnectWallet'
import { useQueryNetworks } from '../hooks/useQueryNetworks'
import DefaultNetworkIcon from '../assets/logo_nhub.svg'
import { getWalletStatus } from '../services/localStorage.service'
import { useMutationChangeNework } from '../hooks/useMutationChangeNework'
import { INetwork } from '../types/entity.type'
import { walletStatusState } from '../recoil/wallet'
import { Col, Row } from 'antd'
import Href from '../components/href.json'
import { useQueryCurrentNetwork } from '../hooks/useQueryCurrentNetwork'
import { useMutationCurrentNetwork } from '../hooks/useMutationCurrentNetwork'

interface ContentProps {
  breakpoint?: 'desktop' | 'tablet' | 'mobile'
}
interface WalletProps {
  onClick: () => void
}

interface ShowMenuProps {
  showMobileMenu: boolean
}

interface MobileConnectedWalletProps {
  connectedWallet: boolean
}

const menuArr = [
  { id: 1, name: 'Dashboard', value: '/dashboard' },
  { id: 2, name: 'Token Stake', value: '/token' },
  { id: 3, name: 'NFT Stake', value: '/nft' },
  { id: 4, name: 'Bridge', value: '/bridge' }
]

const NHubHeader = () => {
  const { data: myWalletData } = useQueryMyWallet()
  const { data: networks } = useQueryNetworks()
  const { data: currentNetwork, isLoading: isLoadingCurrentNetwork } = useQueryCurrentNetwork(
    networks ?? null,
    myWalletData ?? null
  )

  // const currentNetwork = networks?.find((network) => network.chainId === myWalletData?.networkChainId) ?? null
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { breakpoint } = useResponsiveScr()
  const walletStatus = getWalletStatus()
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)

  const connectWallet = useMutationConnectWallet()
  const disconnectWallet = useMutationDisconnectWallet()
  // const changeLocalNetwork = useMutationCurrentNetwork()
  const changeNetwork = useMutationChangeNework()

  const [isDark, setIsDark] = useRecoilState(themeState)
  const [walletStatusRecoil, setWalletStatusRecoil] = useRecoilState(walletStatusState)
  const [showNetworks, setShowNetworks] = useState(false)
  const [showWalletMenu, setShowWalletMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState('/dashboard')

  const clickMenu = (menu: { id: number; value: string }) => {
    const { id, value } = menu
    setSelectedMenu(value)
    setShowMobileMenu(false)
    navigate(value)
  }

  const clickNetwork = async (network: INetwork) => {
    setShowNetworks(false)
    await changeNetwork.mutate({
      network,
      wallet: myWalletData ?? null
    })
    // window.location.reload()
  }

  const clickDisconnect = () => {
    setShowWalletMenu(false)
    setWalletStatusRecoil('disconnected')
    disconnectWallet.mutate()
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (mobileMenuRef.current != null && mobileMenuRef.current.contains(event.target as Node)) {
      return
    }
    setShowMobileMenu(false)
  }

  const shortenAddress = (address: string): string => {
    if (address.length <= 10) {
      return address
    }
    return `${address.substring(0, 5)}...${address.substring(address.length - 5)}`
  }
  useEffect(() => {
    setSelectedMenu(pathname)
  }, [pathname])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <Header.Container>
      <Header.Content breakpoint={breakpoint}>
        <Header.LeftContainer>
          <Shared.NhubIcon.NavLogoIcon
            lg={{ h: 40 }}
            md={{ w: 75 }}
            sm={{ w: 75 }}
            onClick={() => navigate('/dashboard')}
          />
        </Header.LeftContainer>
        <Header.RightContainer>
          {breakpoint !== 'mobile' && (
            <Header.Menu>
              <Header.MenuWrap>
                {menuArr.map((menu) => (
                  <Header.MenuItem key={menu.id} onClick={() => clickMenu(menu)}>
                    <Shared.NhubTypo type="bold" usage="nav" color={menu.value === selectedMenu ? 'blue' : null}>
                      {menu.name}
                    </Shared.NhubTypo>
                  </Header.MenuItem>
                ))}
              </Header.MenuWrap>
            </Header.Menu>
          )}
          {/* Networks */}
          {breakpoint === 'desktop' ? (
            <Header.NetworkWrap
              onMouseEnter={() => {
                setShowNetworks(true)
                setShowWalletMenu(false)
              }}
              onMouseLeave={() => setShowNetworks(false)}
            >
              <Header.Network style={{ justifyContent: 'center' }}>
                <Header.NetworkIcon src={currentNetwork?.iconUrl ?? DefaultNetworkIcon} />
                <Shared.NhubTypo type="bold" usage="nav">
                  {currentNetwork?.name}
                </Shared.NhubTypo>
                <Shared.NhubIcon.DropDownArrowIcon />
              </Header.Network>
              {showNetworks && (
                <Header.Networks>
                  <Header.Network
                    style={{ justifyContent: 'center' }}
                    onClick={() => {
                      setShowNetworks(!showNetworks)
                      setShowWalletMenu(false)
                    }}
                  >
                    <Header.NetworkIcon src={currentNetwork?.iconUrl ?? DefaultNetworkIcon} />
                    <Shared.NhubTypo type="bold" usage="nav">
                      {currentNetwork?.name}
                    </Shared.NhubTypo>
                    <Shared.NhubIcon.DropDownArrowIcon />
                  </Header.Network>
                  <Header.Line />
                  {networks?.map((network) => {
                    if (currentNetwork?.chainId === network.chainId) return null
                    return (
                      <>
                        <Header.Network key={network.chainId} onClick={() => clickNetwork(network)}>
                          <Header.NetworkIcon src={network?.iconUrl ?? DefaultNetworkIcon} />
                          <Shared.NhubTypo type="bold" usage="nav">
                            {network?.name}
                          </Shared.NhubTypo>
                        </Header.Network>
                      </>
                    )
                  })}
                </Header.Networks>
              )}
            </Header.NetworkWrap>
          ) : (
            <Header.NetworkWrap>
              <Header.NetworkIcon
                src={currentNetwork?.iconUrl ?? DefaultNetworkIcon}
                onClick={() => {
                  setShowNetworks(!showNetworks)
                  setShowWalletMenu(false)
                }}
              />
              {showNetworks && (
                <Header.Networks>
                  {networks?.map((network) => (
                    <>
                      <Header.Network key={network.chainId} onClick={() => clickNetwork(network)}>
                        <Header.NetworkIcon src={network?.iconUrl ?? DefaultNetworkIcon} />
                        <Shared.NhubTypo
                          type="bold"
                          usage="nav"
                          color={network.chainId === currentNetwork?.chainId && 'blue'}
                        >
                          {network?.name}
                        </Shared.NhubTypo>
                      </Header.Network>
                    </>
                  ))}
                </Header.Networks>
              )}
            </Header.NetworkWrap>
          )}
          {/* Wallet Connect Button */}
          {breakpoint === 'mobile' ? (
            <>
              <Header.MobileConnectedWalletBox
                onClick={() => {
                  if (myWalletData && walletStatus === 'connected') {
                    if (showWalletMenu) {
                      setShowWalletMenu(false)
                    } else {
                      setShowWalletMenu(true)
                      setShowNetworks(false)
                    }
                  } else {
                    connectWallet.mutate()
                  }
                }}
                connectedWallet={myWalletData && walletStatus === 'connected'}
              >
                <Shared.NhubIcon.WalletIcon style={{ width: '100%', height: '100%' }} />
                {showWalletMenu && (
                  <Header.MobileDisconnectedWallet onClick={() => clickDisconnect()}>
                    <Shared.NhubTypo type="bold" usage="nav" color="blue">
                      Disconnect
                    </Shared.NhubTypo>
                  </Header.MobileDisconnectedWallet>
                )}
              </Header.MobileConnectedWalletBox>
            </>
          ) : (
            <>
              {myWalletData && walletStatus === 'connected' ? (
                <Header.WalletWrap
                  onMouseEnter={() => {
                    setShowWalletMenu(true)
                    setShowNetworks(false)
                  }}
                  onMouseLeave={() => setShowWalletMenu(false)}
                >
                  <Header.ConnectedWallet>
                    <Shared.NhubTypo type="bold" usage="nav">
                      {shortenAddress(myWalletData.walletAddress)}
                    </Shared.NhubTypo>
                  </Header.ConnectedWallet>
                  {showWalletMenu && (
                    <Header.ConnectedWalletAndDisconnectBtn style={{ paddingLeft: 8, paddingRight: 8 }}>
                      <Header.ConnectedWallet onClick={() => setShowWalletMenu(!showWalletMenu)} style={{ padding: 0 }}>
                        <Shared.NhubTypo type="bold" usage="nav">
                          {shortenAddress(myWalletData.walletAddress)}
                        </Shared.NhubTypo>
                      </Header.ConnectedWallet>
                      <Header.Line />
                      <Header.ConnectedWallet onClick={() => clickDisconnect()} style={{ padding: 0 }}>
                        <Shared.NhubTypo type="bold" usage="nav" color="blue">
                          Disconnect
                        </Shared.NhubTypo>
                      </Header.ConnectedWallet>
                    </Header.ConnectedWalletAndDisconnectBtn>
                  )}
                </Header.WalletWrap>
              ) : (
                <Header.DisconnectedWallet onClick={() => connectWallet.mutate()}>
                  <Shared.NhubTypo type="bold" usage="nav">
                    {'Connect Wallet'}
                  </Shared.NhubTypo>
                </Header.DisconnectedWallet>
              )}
            </>
          )}
          {/* Mobile Hambuger */}
          {breakpoint === 'mobile' && (
            <>
              <Header.MobileMenuBox onClick={() => setShowMobileMenu(!showMobileMenu)} showMobileMenu={showMobileMenu}>
                {!showMobileMenu ? <Shared.NhubIcon.MenuIcon /> : <Shared.NhubIcon.MenuCloseIcon />}
              </Header.MobileMenuBox>
              {showMobileMenu && (
                <Header.MobileMenu ref={mobileMenuRef}>
                  <Header.MobileMenuRow gutter={[0, 34]}>
                    {menuArr.map((menu) => (
                      <Header.MobileMenuCol span={24} key={menu.id}>
                        <Shared.NhubTypo
                          type="bold"
                          usage="nav"
                          color={menu.value === selectedMenu ? 'blue' : null}
                          onClick={() => clickMenu(menu)}
                        >
                          {menu.name}
                        </Shared.NhubTypo>
                      </Header.MobileMenuCol>
                    ))}
                    <Header.MobileMenuCol span={24} style={{ border: 'solid 0.5px #ffffff' }} />
                    <Header.MobileMenuCol span={24}>
                      <Shared.NhubIcon.NvirWorldIcon lg={{ w: 110, h: 20 }} />
                    </Header.MobileMenuCol>
                    <Header.MobileMenuCol span={24} style={{}}>
                      <Shared.NhubIcon.DiscordIcon lg={{ w: 30, h: 30 }} href={Href.Discord} />
                      <Shared.NhubIcon.XIcon lg={{ w: 30, h: 30 }} href={Href.X} />
                      <Shared.NhubIcon.TelegramIcon lg={{ w: 30, h: 30 }} href={Href.Telegram_Global} />
                      <Shared.NhubIcon.YoutubeIcon lg={{ w: 30, h: 30 }} href={Href.Youtube} />
                      <Shared.NhubIcon.MediumIcon lg={{ w: 30, h: 30 }} href={Href.Medium} />
                    </Header.MobileMenuCol>
                    <Header.MobileMenuCol span={24} style={{ justifyContent: 'center', gap: 8 }}>
                      <Shared.NhubTypo type="medium" usage="mobileNav">
                        Family Site:
                      </Shared.NhubTypo>
                      <Shared.NhubTypo type="bold" usage="mobileNav" color="blue">
                        <a target="_blank" rel="noopener noreferrer" href="https://www.nvirworld.com/">
                          Nvirworld
                        </a>
                      </Shared.NhubTypo>
                      <Shared.NhubTypo type="bold" usage="mobileNav">
                        |
                      </Shared.NhubTypo>
                      <Shared.NhubTypo type="bold" usage="mobileNav">
                        <a target="_blank" rel="noopener noreferrer" href="https://nws.studio/">
                          NWS
                        </a>
                      </Shared.NhubTypo>
                    </Header.MobileMenuCol>
                    <Header.MobileMenuCol span={24}>
                      <Shared.NhubTypo type="medium" usage="footer">
                        © 2023. NvirWorld All rights reserved.
                      </Shared.NhubTypo>
                    </Header.MobileMenuCol>
                  </Header.MobileMenuRow>
                </Header.MobileMenu>
              )}
            </>
          )}
          {/* Dark Mode */}
          {/* <Header.Theme onClick={() => setIsDark(!isDark)}>
          <Shared.NhubIcon.NavToggleModeIcon />
        </Header.Theme> */}
        </Header.RightContainer>
      </Header.Content>
    </Header.Container>
  )
}

export default NHubHeader

const NavBox = styled.div<ContentProps>`
  height: 40px;
  background-color: #20202a;
  border-radius: 10px;
  margin: 0px 4px;
  padding: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  p {
    color: white;
  }
`

const Header = {
  Container: styled.header`
    width: 100%;
  `,

  Content: styled.div<ContentProps>`
    position: relative;
    width: ${(props) => (props.breakpoint === 'desktop' ? '1364px' : '100%')};
    height: 100%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: ${(props) =>
      props.breakpoint === 'desktop' ? '40px' : props.breakpoint === 'tablet' ? '20px' : '20px;'};
    display: flex;
    align-items: center;
    ${(props) => props.breakpoint === 'mobile' && 'justify-content: space-between;'}
  `,
  LeftContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  RightContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  LogoSample: styled.div`
    color: white;
    width: 100px;
    height: 40px;
    font-size: 30px;
  `,
  Menu: styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
  `,
  MenuWrap: styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    gap: ${(props) => (props.theme.breakpoint === 'desktop' ? '60px' : '20px')};
    margin: ${(props) => (props.theme.breakpoint === 'desktop' ? '0 60px' : '0 20px')};
    align-items: center;
  `,
  MenuItem: styled.p`
    cursor: pointer;
    white-space: nowrap;
  `,
  NetworkWrap: styled(NavBox)`
    position: relative;
    min-width: ${(props) => (props.theme.breakpoint === 'desktop' ? '180px' : 'none')};
    ${(props) => (props.theme.breakpoint === 'mobile' ? '' : 'margin-right:10px;')};
    z-index: 10;
    margin-left: ${(props) => (props.theme.breakpoint === 'mobile' ? 'auto' : 'none')};
  `,
  Network: styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
  `,
  Networks: styled.div`
    position: absolute;
    left: 0;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 8px;
    gap: 10px;
    background-color: #20202a;

    ${(props) => (props.theme.breakpoint === 'desktop' ? ' top: 0;   width: 100%;  ' : 'top: 45px; width: 140px;')}
  `,
  NetworkIcon: styled.img`
    width: 24px;
    height: 24px;
  `,
  Line: styled.div`
    width: 100%;
    border: solid 0.5px #d3dce8;
  `,
  WalletWrap: styled(NavBox)<WalletProps>`
    position: relative;
    min-width: ${(props) => (props.theme.breakpoint === 'mobile' ? '120px' : '180px')};
    z-index: 10;
  `,
  DisconnectedWallet: styled(NavBox)<WalletProps>`
    position: relative;
    min-width: ${(props) => (props.theme.breakpoint === 'mobile' ? '120px' : '180px')};
    z-index: 10;
    height: 40px;
    display: flex;
    justify-content: center;
    background-color: #137afa;
    cursor: pointer;
  `,
  ConnectedWallet: styled(NavBox)<WalletProps>`
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #20202a;
    margin: 0;
  `,
  ConnectedWalletAndDisconnectBtn: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 180px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 10px;
    background-color: #20202a;
  `,
  MobileMenuBox: styled(NavBox)<ShowMenuProps>`
    width: 40px;
    height: 40px;
    justify-content: center;
    padding: 12px;
    background-color: ${(props) => (props.showMobileMenu ? '#2c3f50' : '#20202a')};
  `,
  MobileMenu: styled.div`
    position: absolute;
    box-sizing: border-box;
    top: 80px;
    right: 0px;
    background-color: #20202a;
    padding: 40px 10px 20px 10px;
    border-radius: 20px;
    z-index: 100;
    margin: 0 20px;
  `,
  MobileMenuRow: styled(Row)`
    width: 100%;
  `,
  MobileMenuCol: styled(Col)`
    cursor: pointer;
    display: flex;
    justify-content: space-around;
    align-items: center;
  `,
  MobileMenuIconBox: styled(NavBox)`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 0px;
    padding: 0px;
  `,
  Theme: styled(NavBox)`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
  `,
  MobileConnectedWalletBox: styled(NavBox)<MobileConnectedWalletProps>`
    position: relative;
    width: 40px;
    justify-content: center;
    background-color: ${(props) => (props.connectedWallet ? '#20202a' : '#1e7afa')};
  `,
  MobileConnectedWallet: styled.div`
    position: absolute;
    width: 100%;
    background-color: #2c3f50;
    padding: 40px 10px 20px 10px;
    border-radius: 20px;
    z-index: 100;
  `,
  MobileDisconnectedWallet: styled(NavBox)`
    cursor: pointer;
    width: 120px;
    margin: 0;
    position: absolute;
    left: 0;
    top: 45px;
    justify-content: center;
  `
}
