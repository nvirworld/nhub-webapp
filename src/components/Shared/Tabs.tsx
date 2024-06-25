import React, { useState } from 'react'
import styled from 'styled-components'
import * as Shared from '../../components/Shared'

const HiddenScrollbar = styled.div`
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  -ms-overflow-style: none;
`

const TabContainer = styled(HiddenScrollbar)`
  width: 100%;
  height: 100%;
  display: flex;
  border-bottom: 1px solid #d3dce8;
`

const Tab = styled.div<{ isActive: boolean }>`
  padding-bottom: 10px;
  margin: 0 15px;
  cursor: pointer;
  // border-bottom: ${(props) => (props.isActive ? '1px solid #1e7afa' : 'none')};

  // &:hover {
  //   border-bottom: 1px solid #1e7afa;
  // }
`

const TabWrapper = styled(HiddenScrollbar)`
  display: flex;
  width: 100%;
  height: 100%;
`

function Tabs({ tabs, onClick }: { tabs: { key: string; label: string }[]; onClick: (value: string) => void }) {
  const [activeTab, setActiveTab] = useState(tabs[0].key)

  const onHandleClickTab = (tab) => {
    setActiveTab(tab.key)
    onClick(tab.label)
  }
  return (
    <TabContainer>
      <TabWrapper>
        {tabs.map((tab) => (
          <Tab key={tab.key} isActive={tab.key === activeTab} onClick={() => onHandleClickTab(tab)}>
            <Shared.NhubTypo
              type="bold"
              usage="dashboard"
              style={{ color: `${tab.key === activeTab ? '#1e7afa' : 'white'}` }}
            >
              {tab.label}
            </Shared.NhubTypo>
          </Tab>
        ))}
      </TabWrapper>
    </TabContainer>
  )
}

export default Tabs
