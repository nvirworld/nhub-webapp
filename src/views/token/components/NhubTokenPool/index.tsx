import React from 'react'
import * as Shared from '../../../../components/Shared'
import DesktopItem from './Desktop'
import MobileItem from './Mobile'
import TabletItem from './Tablet'
import useResponsiveScr from '../../../../hooks/useResponsiveScr'
import { IPoolv4 } from '../../../../types/entity.type'
import { styled } from 'styled-components'

export interface NhubPoolItemProps {
  poolData: IPoolv4
}

const NhubTokenPool = (props: NhubPoolItemProps) => {
  const { poolData } = props
  const { breakpoint } = useResponsiveScr()

  if (!poolData)
    return (
      <Shared.NhubTypo type="medium" usage="noPools">
        There is no active pools.
      </Shared.NhubTypo>
    )

  switch (breakpoint) {
    case 'desktop':
      return <DesktopItem poolData={poolData} />
    case 'tablet':
      return <TabletItem poolData={poolData} />
    case 'mobile':
      return <MobileItem poolData={poolData} />
    default:
      break
  }
}

export default NhubTokenPool
