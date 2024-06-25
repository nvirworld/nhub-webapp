import React from 'react'
import styled from 'styled-components'

interface NhubTokenSymbolProps {
  tokenUrl?: string | null
}

const NhubTokenSymbol = (props: NhubTokenSymbolProps) => {
  const { tokenUrl } = props
  return (
    <Symbol.Box>
      <Symbol.Token src={tokenUrl} />
    </Symbol.Box>
  )
}

export default NhubTokenSymbol

const Symbol = {
  Box: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Token: styled.img`
    width: 24px;
    height: 24px;
    border-radius: 50%;
  `
}
