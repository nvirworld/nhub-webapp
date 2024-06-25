import React from 'react'
import styled from 'styled-components'
import { useMutationConnectWallet } from '../hooks/useMutationConnectWallet'
import { useMutationDisconnectWallet } from '../hooks/useMutationDisconnectWallet'
import { useMutationChangeNework } from '../hooks/useMutationChangeNework'
import { useQueryMyWallet } from '../hooks/useQueryMyWallet'
import { useQueryNetworks } from '../hooks/useQueryNetworks'

const SampleFooter = () => {
  const { data: myWalletData } = useQueryMyWallet()
  const { data: networks } = useQueryNetworks()
  const connect = useMutationConnectWallet()
  const disconnect = useMutationDisconnectWallet()
  const changeNetwork = useMutationChangeNework()
  return (
    <Footer.Container>
      <p>footer~~~~</p>

      <div>
        {myWalletData ? (
          <button
            onClick={() => {
              disconnect.mutate()
            }}
          >
            disconnect
          </button>
        ) : (
          <button
            onClick={() => {
              connect.mutate()
            }}
          >
            connect
          </button>
        )}
      </div>
      <div>
        changeNetwork
        {networks?.map((network) => (
          <button
            onClick={() => {
              changeNetwork.mutate({
                network,
                wallet: myWalletData ?? null
              })
            }}
          >
            {network.name}, {network.chainId}
          </button>
        ))}
      </div>
    </Footer.Container>
  )
}

export default SampleFooter

const Footer = {
  Container: styled.footer`
    // background-color: red;
    width: 100%;
    height: 80px;
    display: flex;
  `
}
