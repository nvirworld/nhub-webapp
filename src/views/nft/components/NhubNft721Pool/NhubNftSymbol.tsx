import React from 'react'
import styled from 'styled-components'

interface NhubSymbolProps {
  tokenUrl?: string | null
  nftUrl?: string | null
}

const NhubNftSymbol = (props: NhubSymbolProps) => {
  const { tokenUrl, nftUrl } = props
  if (tokenUrl && nftUrl) {
    return (
      <Symbol.Box>
        <Symbol.MixNft src={nftUrl} />
        <Symbol.MixToken src={tokenUrl} />
      </Symbol.Box>
    )
  }
  if (tokenUrl && !nftUrl) {
    return <Symbol.Token src={tokenUrl} />
  }
  if (!tokenUrl && nftUrl) {
    return <Symbol.Nft src={nftUrl} />
  }
}

export default NhubNftSymbol

const Symbol = {
  Box: styled.div`
    position: relative;
    width: ${(props) => (props.theme.breakpoint === 'desktop' ? '71' : '41')}px;
    height: ${(props) => (props.theme.breakpoint === 'desktop' ? '71' : '41')}px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    img {
      margin: 0;
    }
  `,
  Token: styled.img`
    width: 24px;
    height: 24px;
    border-radius: 50%;
  `,
  Nft: styled.img`
    width: 71px;
    height: 71px;
    border-radius: 10px;
  `,
  MixNft: styled.img`
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) => (props.theme.breakpoint === 'desktop' ? '40' : '24')}px;
    height: ${(props) => (props.theme.breakpoint === 'desktop' ? '40' : '24')}px;
  `,
  MixToken: styled.img`
    border-radius: 50%;
    position: absolute;
    bottom: 5px;
    right: 0;
    width: ${(props) => (props.theme.breakpoint === 'desktop' ? '40' : '24')}px;
    height: ${(props) => (props.theme.breakpoint === 'desktop' ? '40' : '24')}px;
  `
}
