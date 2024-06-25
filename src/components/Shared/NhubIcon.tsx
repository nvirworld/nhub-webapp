import React from 'react'
import { styled } from 'styled-components'
import NhubSVG from '../../assets/logo.svg'
import Nhub2SVG from '../../assets/ic_logo2.svg'
import NhubToggleMode from '../../assets/ic_lightmode.svg'
import DropdownArrow from '../../assets/ic_dropdown.svg'
import useResponsiveScr from '../../hooks/useResponsiveScr'
import NvirWorld from '../../assets/logo_nvirworld.svg'
import Discord from '../../assets/ic_discord.svg'
import X from '../../assets/ic_x.svg'
import Telegram from '../../assets/ic_telegram.svg'
import Youtube from '../../assets/ic_youtube.svg'
import Medium from '../../assets/ic_medium.svg'
import Instargram from '../../assets/ic_instargram.svg'
import Menu from '../../assets/ic_menu.svg'
import MenuClose from '../../assets/ic_menu_close.svg'
import Wallet from '../../assets/ic_wallet.png'
import Open from '../../assets/ic_open.svg'
interface ResponsiveSize {
  w: number
  h: number
}

interface NhubIconProps {
  src: string
  lg?: ResponsiveSize
  md?: ResponsiveSize
  sm?: ResponsiveSize
  onClick?: () => void
  href?: string
}

const NhubBaseImg = styled.img<{ css?: React.CSSProperties }>((props) => ({
  cursor: 'pointer',
  ...props.css
}))

export default NhubBaseImg

const NhubIcon = (props: NhubIconProps) => {
  const { breakpoint } = useResponsiveScr()
  const { src, lg, md, sm, onClick, href, ...customIconComponentProps } = props

  let style

  switch (breakpoint) {
    case 'desktop':
      if (lg) {
        style = { style, width: lg.w, height: lg.h }
      }
      break
    case 'tablet':
      if (md) {
        style = { width: md.w, height: md.h }
      }
      break
    case 'mobile':
      if (sm) {
        style = { width: sm.w, height: sm.h }
        break
      }
      break
    default:
      break
  }

  return href ? (
    <a href={href} target="_blank" rel="noreferrer">
      <NhubBaseImg src={src} style={style} {...customIconComponentProps} />
    </a>
  ) : (
    <NhubBaseImg src={src} style={style} {...customIconComponentProps} />
  )
}

export const NavLogoIcon: React.FC<Omit<NhubIconProps, 'src'>> = (props) => <NhubIcon src={Nhub2SVG} {...props} />

export const NavToggleModeIcon: React.FC<Omit<NhubIconProps, 'src'>> = (props) => (
  <NhubIcon src={NhubToggleMode} {...props} />
)

export const DropDownArrowIcon: React.FC<Omit<NhubIconProps, 'src'>> = (props) => (
  <NhubIcon src={DropdownArrow} {...props} />
)

export const NvirWorldIcon: React.FC<Omit<NhubIconProps, 'src'>> = (props) => <NhubIcon src={NvirWorld} {...props} />

export const DiscordIcon: React.FC<Omit<NhubIconProps, 'src'>> = (props) => <NhubIcon src={Discord} {...props} />

export const XIcon: React.FC<Omit<NhubIconProps, 'src'>> = (props) => <NhubIcon src={X} {...props} />

export const TelegramIcon: React.FC<Omit<NhubIconProps, 'src'>> = (props) => <NhubIcon src={Telegram} {...props} />

export const YoutubeIcon: React.FC<Omit<NhubIconProps, 'src'>> = (props) => <NhubIcon src={Youtube} {...props} />

export const MediumIcon: React.FC<Omit<NhubIconProps, 'src'>> = (props) => <NhubIcon src={Medium} {...props} />

export const InstagramIcon: React.FC<Omit<NhubIconProps, 'src'>> = (props) => <NhubIcon src={Instargram} {...props} />

export const MenuIcon: React.FC<Omit<NhubIconProps, 'src'>> = (props) => <NhubIcon src={Menu} {...props} />

export const WalletIcon: React.FC<Omit<NhubIconProps, 'src'>> = (props) => <NhubIcon src={Wallet} {...props} />

export const MenuCloseIcon: React.FC<Omit<NhubIconProps, 'src'>> = (props) => <NhubIcon src={MenuClose} {...props} />

export const MenuOpenIcon: React.FC<Omit<NhubIconProps, 'src'>> = (props) => <NhubIcon src={Open} {...props} />

// breakpoints desktop = 1366 / tablet = 768 / mobile = 360
