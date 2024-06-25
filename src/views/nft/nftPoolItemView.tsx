import React, {useMemo, useState} from 'react'
import { IPoolv4 } from '../../types/entity.type'
import * as Shared from '../../components/Shared'
import * as Token from './components/NFTGrid'
import NhubNft721Pool from './components/NhubNft721Pool'
import NftPoolsMenu from './components/TokenPoolsMenu'
import useResponsiveScr from '../../hooks/useResponsiveScr'
import { useNavigate } from 'react-router-dom'
import Tabs from '../../components/Shared/Tabs'

import determineEventStatus, {EventStatusEnum} from "../../utils/determineEventStatus";
enum FilterTypeEnum {
  ALL = 'ALL',
  NFT = 'NFT',
  NFT_TOKEN= 'NFT+TOKEN'
}
interface NFTPoolv4sViewProps {
  nftPoolData: IPoolv4[]
}
const NFTPoolv4sView: React.FC<NFTPoolv4sViewProps> = (props) => {
  const { nftPoolData } = props
  const { breakpoint } = useResponsiveScr()
  const navigate = useNavigate()
  const clickPool = (pool: IPoolv4) => {
    navigate(`/pool/${pool.id}`)
  }

  const [filterType, setFilterType] = useState<FilterTypeEnum|EventStatusEnum>(FilterTypeEnum.ALL)

  const filteredNftPoolData = useMemo(() => {
    if (filterType === FilterTypeEnum.ALL) return nftPoolData
    else if (filterType === FilterTypeEnum.NFT) return nftPoolData.filter(pool => pool.type === 'nft721')
    else if (filterType === FilterTypeEnum.NFT_TOKEN) return nftPoolData.filter(pool => pool.type === 'nft721+token')
    else return nftPoolData.filter(pool => {
      const eventStatue = determineEventStatus(pool.startedAt, pool.endedAt)
      return eventStatue === filterType
    })
  }, [filterType])

  const combinedEnumArray = [
    ...Object.values(FilterTypeEnum),
    ...Object.values(EventStatusEnum)
  ];

  const tabs = useMemo(() => {
    return combinedEnumArray.map((value, index) => ({
      key: String(index),
      label: value
    }));
  }, [filterType]);

  return (
    <>
      <Token.CenterRow gutter={[15, 16]} >
        <Token.CenterCol span={24} style={{ textAlign: 'center', marginBottom: 40 }}>
          <Shared.NhubTypo type="bold" usage="subTitle" style={{ marginTop: 70 }}>
            Pools List
          </Shared.NhubTypo>
        </Token.CenterCol>
        <Token.CenterCol span={24}>
          <Tabs tabs={tabs} onClick={(value: string) => setFilterType(value as FilterTypeEnum|EventStatusEnum)}></Tabs>
        </Token.CenterCol>
        <Token.CenterCol span={24}>{breakpoint === 'desktop' && <NftPoolsMenu />}</Token.CenterCol>
        {filteredNftPoolData.map((item, index) => {
          return (
            <Token.CenterCol key={index} span={24} onClick={() => clickPool(item)}>
              <NhubNft721Pool key={index} poolData={item} />
            </Token.CenterCol>
          )
        })}
      </Token.CenterRow>
    </>
  )
}

export default NFTPoolv4sView
