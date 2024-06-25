import React from 'react'
import * as Shared from '../../components/Shared'
import * as HomeGrid from './components/HomeGrid'
import useResponsiveScr from '../../hooks/useResponsiveScr'
import NhubPoolItem from './components/NhubMyPoolItem'
import { IPoolv4 } from '../../types/entity.type'
import MyPoolsMenu from './components/MyPoolsMenu'
import { useNavigate } from 'react-router-dom'

interface MyPoolListViewProps {
  myPoolsData: IPoolv4[]
}

const MyPoolListView: React.FC<MyPoolListViewProps> = (props) => {
  const { myPoolsData } = props
  const { breakpoint } = useResponsiveScr()
  const navigate = useNavigate()
  const clickPool = (pool: IPoolv4) => {
    navigate(`/pool/${pool.id}`)
  }

  return (
    <>
      <HomeGrid.CenterRow gutter={[15, 16]}>
        <HomeGrid.CenterCol span={24} style={{ textAlign: 'center', marginBottom: 40 }}>
          <Shared.NhubTypo type="bold" usage="subTitle" style={{ marginTop: 70 }}>
            My Pools
          </Shared.NhubTypo>
        </HomeGrid.CenterCol>
        <HomeGrid.CenterCol span={24} style={{ textAlign: 'center' }}>
          {breakpoint === 'desktop' && <MyPoolsMenu />}
        </HomeGrid.CenterCol>
        {myPoolsData.map((item, index) => {
          return (
            <HomeGrid.CenterCol span={24} onClick={() => clickPool(item)}>
              <NhubPoolItem key={index} poolData={item} />
            </HomeGrid.CenterCol>
          )
        })}
      </HomeGrid.CenterRow>
    </>
  )
}

export default MyPoolListView
