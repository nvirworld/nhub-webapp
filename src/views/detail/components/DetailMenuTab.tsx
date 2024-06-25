import React, { useState } from 'react'
import styled from 'styled-components'
import * as Shared from '../../../components/Shared'
import { Col, Row } from 'antd'
import useResponsiveScr from '../../../hooks/useResponsiveScr'
import { IPoolv4 } from '../../../types/entity.type'

interface MenuItem {
  id: number
  title: string
  content: React.ReactNode
}

interface MenuTabProps {
  menuItems: MenuItem[]
  pool: IPoolv4
}

const DetailMenuTab: React.FC<MenuTabProps> = (props) => {
  const { menuItems, pool } = props
  const [activeTab, setActiveTab] = useState<number>(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <MenuTab.Body>
      <MenuTab.TabMenu>
        {menuItems.map((item, index) => (
          <MenuTab.Tab key={item.id} active={activeTab === index} onClick={() => handleTabClick(index)}>
            <Shared.NhubTypo type="bold" usage="card" color={activeTab === index ? 'blue' : null}>
              {item.title}
            </Shared.NhubTypo>
          </MenuTab.Tab>
        ))}
      </MenuTab.TabMenu>
      <MenuTab.Container>
        <MenuTab.TabContent>
          {menuItems.map((item, index) => (
            <div key={item.id} style={{ display: activeTab === index ? 'block' : 'none' }}>
              {item.content}
            </div>
          ))}
        </MenuTab.TabContent>
      </MenuTab.Container>
    </MenuTab.Body>
  )
}

export default DetailMenuTab

const MenuTab = {
  Body: styled.div`
    display: flex;
    flex-direction: column;
    width: ${(props) => (props.theme.breakpoint === 'mobile' ? '100%' : '500px')};
    background-color: #20202a;
    border-radius: 20px;
  `,
  Container: styled.div`
    width: 100%;
    height: 100%;
    background-color: #20202a;
    border-radius: 20px;
    padding: 30px 35px 30px 35px;
  `,
  TabMenu: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
  `,
  Tab: styled.div<{ active: boolean }>`
    width: 100%;
    padding: 20px 20px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    ${(props) => (props.active ? 'border-image: linear-gradient(to right, #1e7afa, #999afb);' : 'none')};
    border-image-slice: 1;
  `,
  TabContent: styled.div`
    margin-top: 20px;
  `
}
