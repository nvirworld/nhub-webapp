import React from 'react'
import styled from 'styled-components'

interface NhubSymbolProps {
  tokenUrl?: string | null
  nftUrl?: string | null
}

const NhubMyPoolSymbol = (props: NhubSymbolProps) => {
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

export default NhubMyPoolSymbol

const Symbol = {
  Box: styled.div`
    width: 43px;
    height: 43px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Token: styled.img`
    width: 24px;
    height: 24px;
    border-radius: 50%;
  `,
  Nft: styled.img`
    width: 43px;
    height: 43px;
  `,
  MixNft: styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
  `,
  MixToken: styled.img`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
  `
}
