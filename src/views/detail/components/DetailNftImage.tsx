import React from 'react'
import styled from 'styled-components'

interface NftImageProps {
  src: string | undefined | null
}

const NftImage = (props: NftImageProps) => {
  const { src } = props
  return src ? <Nft.Image src={src} /> : <Nft.NoneImage />
}

export default NftImage

const Nft = {
  Image: styled.img`
    width: 50px;
    height: 50px;
    border-radius: 10px;
    ${(props) => props.src || 'background-color: #5f5f5f; '}
  `,
  NoneImage: styled.div`
    width: 50px;
    height: 50px;
    background-color: #5f5f5f;
    border-radius: 10px;
  `
}
