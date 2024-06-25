import React from 'react'
import styled from 'styled-components'
import useResponsiveScr from '../../hooks/useResponsiveScr'

interface BaseTextProps {
  type: 'bold' | 'medium' | 'regular' | 'light'
  usage:
    | 'nav'
    | 'dashboard'
    | 'coinStatus'
    | 'poolsName'
    | 'card'
    | 'cardTitle'
    | 'cardPrice'
    | 'cardMenuTitle'
    | 'stakeApy'
    | 'stake'
    | 'stakeWarning'
    | 'stakeBtn'
    | 'subTitle'
    | 'dashTitle'
    | 'homeConnect'
    | 'max'
    | 'amount'
    | 'footer'
    | 'connectWallet'
    | 'placeholder'
    | 'columnHeader'
    | 'price'
    | 'noPools'
    | mobileNav
  color?: 'blue' | 'red' | 'mint' | 'ongoing' | 'closed' | null
  children?: React.ReactNode
  style?: React.CSSProperties
  onClick?: () => void
}

interface FontSizes {
  [key: string]: {
    bold?: {
      [usage: string]: string
    }
    medium?: {
      [usage: string]: string
    }
    regular?: {
      [usage: string]: string
    }
    light?: {
      [usage: string]: string
    }
  }
}

// const BaseText = styled.span<BaseTextProps>`
// 	${(props) => {
// 		props.color === 'blue' ? 'color: #1e7afa;' : props.color === 'red' ? 'color: #eb4444;' : 'color: #ffffff;';
// 	}}
// 	font-family: 'poppins', sans-serif;
const BaseText = styled.span<BaseTextProps>`
  ${(props) => {
    switch (props.color) {
      case 'blue':
        return 'color: #1e7afa;'
      case 'red':
        return 'color: #eb4444;'
      case 'mint':
        return 'color: #1fffff;'
      case 'ongoing':
        return 'color: #41FF1F;'
      case 'closed':
        return 'color: #FF4392;'
      default:
        return 'color: #ffffff;'
    }
  }}
  font-family: 'poppins', sans-serif;
`

const NhubTypo = (props: BaseTextProps) => {
  const { type, usage, color, children, style, onClick } = props
  const { breakpoint } = useResponsiveScr()

  const typeSizeMapping: FontSizes = {
    desktop: {
      bold: {
        max: '10px',
        nav: '12px',
        stakeApy: '12px',
        card: '14px',
        amount: '14px',
        subTitle: '24px',
        homeConnect: '24px',
        bridge: '12px'
      },
      medium: {
        footer: '10px',
        stakeWarning: '10px',
        cardPrice: '12px',
        dashTitle: '14px',
        homeConnect: '24px',
        noPools: '24px'
      },
      regular: {
        stake: '12px',
        placeholder: '12px',
        columnHeader: '12px',
        bridge: '12px'
      },
      light: {
        columnHeader: '12px'
      }
    },
    tablet: {
      bold: {
        max: '10px',
        nav: '12px',
        coinStatus: '12px',
        stakeApy: '12px',
        dashboard: '14px',
        stakeBtn: '14px',
        card: '14px',
        homeConnect: '20px',
        subTitle: '24px',
        connectWallet: '30px',
        bridge: '12px'
      },
      medium: {
        footer: '10px',
        stakeWarning: '10px',
        cardMenuTitle: '12px',
        price: '12px',
        dashTitle: '14px',
        noPools: '24px'
      },
      regular: {
        stake: '12px',
        bridge: '12px'
      },
      light: {
        columnHeader: '12px'
      }
    },
    mobile: {
      bold: {
        nav: '12px',
        coinStatus: '12px',
        poolsName: '14px',
        stakeBtn: '14px',
        cardTitle: '14px',
        homeConnect: '20px',
        subTitle: '24px',
        card: '14px',
        max: '10px',
        mobileNav: '12px',
        bridge: '12px'
      },
      medium: {
        stakeWarning: '10px',
        price: '12px',
        dashTitle: '14px',
        footer: '10px',
        noPools: '24px',
        mobileNav: '12px'
      },
      regular: {
        stake: '12px',
        bridge: '12px'
      },
      light: {
        columnHeader: '12px'
      }
    }
  }

  const getFontSize = (type: string, usage: string) => {
    return typeSizeMapping[breakpoint][type][usage]
  }

  const fontSize = getFontSize(type, usage)

  const fontStyle = {
    fontWeight: {
      bold: 'bold',
      medium: '500',
      regular: '400',
      light: '300'
    }[type],
    fontSize
  }

  return (
    <BaseText type={type} usage={usage} color={color} style={{ ...fontStyle, ...style }} onClick={onClick}>
      {children}
    </BaseText>
  )
}

export default NhubTypo
// main
// desktop bold 10px(max) 12px(nav , stake APY) 14px(card, amount) 24px(sub title, home connect)
// desktop medium 10px(footer, stake warning) 12px(card price) 14px(dash title)
// desktop regular 12px(stake, placeholder,column header)
// desktop light 12px(column header)

// tablet bold 12px(nav, coin status, stake apy) 14px(dashboard, stake btn) 20px(home connect) 24px(sub title, card) 30px(connect wallet)
// tablet medium 10px(footer , stake warning) 12px(card menu title ===  , price) 14px(dash title)
// tablet regular 12px(stake)
// tablet light 12px(column header)

// mobile bold 12px(nav, coin status) 14px(pools name, stake btn, card title) 20px(home connect) 24px(sub title, card)
// mobile medium 10px (stake warning) 12px(price) 14px(dash title)
// mobile regular 12px(stake)
// mobile light 12px(column header)
