import React, { useMemo, useState } from 'react'
import { IPoolv4 } from '../../types/entity.type'
import * as Shared from '../../components/Shared'
import NhubTokenPool from './components/NhubTokenPool'
import * as Token from './components/TokenGrid'
import TokenPoolsMenu from './components/TokenPoolsMenu'
import useResponsiveScr from '../../hooks/useResponsiveScr'
import { useNavigate } from 'react-router-dom'
import Tabs from '../../components/Shared/Tabs'
import determineEventStatus, { EventStatusEnum } from '../../utils/determineEventStatus'

interface TokenPoolv4sViewProps {
  tokenPoolData: IPoolv4[]
}
enum FilterTypeEnum {
  ALL = 'ALL'
}
const TokenPoolv4sView: React.FC<TokenPoolv4sViewProps> = (props) => {
  const { tokenPoolData } = props
  const { breakpoint } = useResponsiveScr()
  const navigate = useNavigate()
  const handleTokenPoolClick = (pool: IPoolv4) => {
    navigate(`/pool/${pool.id}`)
  }
  const [filterType, setFilterType] = useState<FilterTypeEnum | EventStatusEnum>(FilterTypeEnum.ALL)
  const filteredTokenPoolData = useMemo(() => {
    if (filterType === FilterTypeEnum.ALL) return tokenPoolData
    else
      return tokenPoolData.filter((pool) => {
        const eventStatue = determineEventStatus(pool.startedAt, pool.endedAt)
        return eventStatue === filterType
      })
  }, [filterType])
  const combinedEnumArray = [...Object.values(FilterTypeEnum), ...Object.values(EventStatusEnum)]
  const tabs = useMemo(() => {
    return combinedEnumArray.map((value, index) => ({
      key: String(index),
      label: value
    }))
  }, [filterType])
  return (
    <>
      <Token.CenterRow gutter={[15, 16]}>
        <Token.CenterCol span={24} style={{ textAlign: 'center', marginBottom: 40 }}>
          <Shared.NhubTypo type="bold" usage="subTitle">
            Pools List
          </Shared.NhubTypo>
        </Token.CenterCol>
        <Token.CenterCol span={24}>
          <Tabs
            tabs={tabs}
            onClick={(value: string) => setFilterType(value as FilterTypeEnum | EventStatusEnum)}
          ></Tabs>
        </Token.CenterCol>
        <Token.CenterCol span={24}>{breakpoint === 'desktop' && <TokenPoolsMenu />}</Token.CenterCol>
        {filteredTokenPoolData.map((item, index) => {
          return (
            <Token.CenterCol span={24} key={item.id} onClick={() => handleTokenPoolClick(item)}>
              <NhubTokenPool poolData={item} />
            </Token.CenterCol>
          )
        })}
      </Token.CenterRow>
    </>
  )
}

export default TokenPoolv4sView
