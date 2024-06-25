import * as Shared from '../../../components/Shared'
import React, { useState } from 'react'
import styled from 'styled-components'

interface NetworkDropdownProps {
  networks: Array<{
    name: string
    iconUrl: string | null
  }>
  onClickItem: (idx: number) => void
  selectedIdx: number
}

const NetworkDropdown: React.FC<NetworkDropdownProps> = (props) => {
  const { networks, onClickItem } = props
  const [elapsed, setElapsed] = useState<boolean>(false)
  const selectedIdx = props.selectedIdx ?? 0
  const selectedNetwork = networks[selectedIdx]

  return (
    <Dropdown.Wrapper onClick={() => setElapsed(!elapsed)} onMouseOver={() => setElapsed(true)} onMouseOut={() => setElapsed(false)}>
      <Dropdown.SelectedItem>
        {selectedNetwork.iconUrl != null ? <img src={selectedNetwork.iconUrl} /> : <></>}
        <Shared.NhubTypo type='regular' usage='bridge' style={{marginRight: 5}}>
          {selectedNetwork.name}
        </Shared.NhubTypo>
        <Shared.NhubIcon.DropDownArrowIcon sm={{w: 10, h: 10}} md={{w: 10, h: 10}} lg={{w: 10, h: 10}} />
      </Dropdown.SelectedItem>
      <Dropdown.Items style={{display: elapsed ? 'block' : 'none'}}>
        {
          networks
            .map((network, idx) => (
                selectedIdx === idx ? <></> :
              <Dropdown.Item onClick={() => onClickItem(idx)}>
                {network.iconUrl != null ? <img src={network.iconUrl} /> : <></>}
                <Shared.NhubTypo type='regular' usage='bridge'>
                  {network.name}
                </Shared.NhubTypo>
              </Dropdown.Item>
            ))
        }
      </Dropdown.Items>
    </Dropdown.Wrapper>
  )
}

export default NetworkDropdown

const Dropdown = {
  Wrapper: styled.div`
    margin-left: 3px;
    cursor: pointer;
    img {
      cursor: pointer;
      width: 24px;
      height: 24px;
      vertical-align: middle;
    }
    span {
      cursor: pointer;
      margin-left: 8px;
    }
  `,
  SelectedItem: styled.div`
    width: 130px;
    background-color: #2c3f50;
    text-align: center;
    padding: 8px;
    border-radius: 10px;
  `,
  Items: styled.div`
    position: absolute;
    z-index: 999;
  `,
  Item: styled.div`
    cursor: pointer;
    width: 130px;
    text-align: center;
    padding: 8px;
    background-color: #0f1010;
    border-radius: 10px;
  `
}
