import React from 'react'
import styled from 'styled-components'
import * as Shared from './Shared'
import useResponsiveScr from '../hooks/useResponsiveScr'
import Href from '../components/href.json'

interface ContentProps {
  breakpoint?: 'desktop' | 'tablet' | 'mobile'
}

const NhubFooter = () => {
  const { breakpoint } = useResponsiveScr()
  return (
    <Footer.Container>
      <Footer.Content breakpoint={breakpoint}>
        <Footer.Wrap>
          <Footer.NvirWorld>
            <Shared.NhubIcon.NvirWorldIcon lg={{ w: 160, h: 30 }} />
            <Footer.Reserve>
              <Shared.NhubTypo type="medium" usage="footer">
                © 2023. NvirWorld All rights reserved.
              </Shared.NhubTypo>
            </Footer.Reserve>
          </Footer.NvirWorld>
          <Footer.IconGroup>
            <Footer.FamilySite>
              <Shared.NhubTypo type="bold" usage="footer">
                Family Site
              </Shared.NhubTypo>
              <a target="_blank" rel="noopener noreferrer" href="https://nws.studio/">
                <Shared.NhubTypo type="regular" usage="footer" style={{ textDecoration: 'underline' }}>
                  NWS
                </Shared.NhubTypo>
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://www.nvirworld.com/">
                <Shared.NhubTypo type="regular" usage="footer" style={{ textDecoration: 'underline' }}>
                  NvirWorld
                </Shared.NhubTypo>
              </a>
            </Footer.FamilySite>
            <Shared.NhubIcon.DiscordIcon lg={{ w: 30, h: 30 }} href={Href.Discord} />
            <Shared.NhubIcon.XIcon lg={{ w: 30, h: 30 }} href={Href.X} />
            <Shared.NhubIcon.TelegramIcon lg={{ w: 30, h: 30 }} href={Href.Telegram_Global} />
            <Shared.NhubIcon.YoutubeIcon lg={{ w: 30, h: 30 }} href={Href.Youtube}/>
            <Shared.NhubIcon.MediumIcon lg={{ w: 30, h: 30 }} href={Href.Medium} />
          </Footer.IconGroup>
        </Footer.Wrap>
      </Footer.Content>
    </Footer.Container>
  )
}

export default NhubFooter

const Footer = {
  Container: styled.footer`
    width: 100%;
    height: 80px;
    display: ${(props) => (props.theme.breakpoint === 'mobile' ? 'none' : 'flex')};
    justify-content: center;
  `,
  Content: styled.div<ContentProps>`
    width: ${(props) =>
      props.breakpoint === 'desktop' ? '1364px' : props.breakpoint === 'tablet' ? '608px' : '286px;'};
    height: 100%;
    display: flex;
    justify-content: center;
    border-top: solid 0.5px #fff;
  `,
  Wrap: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
  `,
  NvirWorld: styled.div`
    display: ${(props) => (props.theme.breakpoint === 'desktop' ? 'flex' : 'inline-grid')};
    align-items: center;
    align-content: center;
  `,
  Reserve: styled.div`
    margin-left: ${(props) => (props.theme.breakpoint === 'desktop' ? '16px' : '0')};
  `,
  FamilySite: styled.div`
    display: ${(props) => (props.theme.breakpoint === 'desktop' ? 'flex' : 'none')};
    align-items: center;
    gap: 10px;
    margin-right: 10px;
  `,
  IconGroup: styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-grow: 0.8;
    gap: 10px;
    a {
      display: flex;
      align-items: center;
    }
  `
}
