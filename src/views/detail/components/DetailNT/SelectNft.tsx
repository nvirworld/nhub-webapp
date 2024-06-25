import * as Shared from '../../../../components/Shared'
import React from 'react'
import DetailButton from '../DetailButton'
import { styled } from 'styled-components'
import { INft721Item, IPoolv4 } from '../../../../types/entity.type'
import { useParams } from 'react-router-dom'
import { Col, Row } from 'antd'
import Dropdown from './components/Dropdown'

interface SelectNftProps {
  onClickIsShowSelectNft: (isShow: boolean) => void
  myNft721s: INft721Item[] | []
  selectedNft: INft721Item | null
  setSelectedNft: (nft: INft721Item) => void
  pool: IPoolv4
}

const SelectNft = (props: SelectNftProps) => {
  const { id } = useParams()
  const poolId = id ? Number(id) : undefined
  if (poolId == null) return <>Not Founded</>

  const { onClickIsShowSelectNft, myNft721s, selectedNft, setSelectedNft, pool } = props

  const onHandleClickDropdownItem = (selectedItem: INft721Item) => {
    setSelectedNft(selectedItem)
  }

  const onHandleClickSelectBtn = () => {
    onClickIsShowSelectNft(false)
  }

  return (
    <>
      <Shared.NhubTypo type="bold" usage="subTitle" style={{ marginBottom: 30 }}>
        {pool.name}
      </Shared.NhubTypo>
      <SelectNftContainer.Wrapper.Row id="123" gutter={[0, 30]}>
        <SelectNftContainer.Wrapper.Col span={24}>
          <SelectNftContainer.Contents.Row gutter={[0, 30]}>
            <SelectNftContainer.Contents.Col span={24}>
              <Shared.NhubTypo type="bold" usage="stakeBtn">
                Deposit NT
              </Shared.NhubTypo>
            </SelectNftContainer.Contents.Col>
            <SelectNftContainer.Contents.Col span={24} style={{ textAlign: 'center', lineHeight: '18px' }}>
              <Shared.NhubTypo type="regular" usage="stake">
                Deposit the NFTs you own. You can freely change the NFT before staking. However, you cannot change it
                after staking, so choose carefully (if you want to change it, you must withdraw and stake again).
              </Shared.NhubTypo>
              {/* <Shared.NhubTypo type="bold" usage="stakeBtn">
                nft name
              </Shared.NhubTypo> */}
            </SelectNftContainer.Contents.Col>

            {selectedNft?.nft721.imgUrl ? (
              <>
                <SelectNftContainer.Contents.Col span={24}>
                  <SelectNftContainer.Contents.NftImg src={selectedNft?.nft721.imgUrl} />
                </SelectNftContainer.Contents.Col>
                <SelectNftContainer.Contents.Col span={24}>
                  <Shared.NhubTypo type="bold" usage="stakeBtn">
                    {selectedNft?.nft721.name} {selectedNft?.tokenId}
                  </Shared.NhubTypo>
                </SelectNftContainer.Contents.Col>
              </>
            ) : (
              <SelectNftContainer.Contents.Col span={24}>
                <SelectNftContainer.Contents.NoneImage />
              </SelectNftContainer.Contents.Col>
            )}
            <SelectNftContainer.Contents.Col span={24}>
              <Dropdown
                items={myNft721s}
                onItemSelected={(item) => onHandleClickDropdownItem(item)}
                selectedItem={selectedNft}
              />
            </SelectNftContainer.Contents.Col>
            <SelectNftContainer.Contents.Col span={24}>
              <DetailButton onClick={onHandleClickSelectBtn} disabled={false}>
                Select
              </DetailButton>
            </SelectNftContainer.Contents.Col>
          </SelectNftContainer.Contents.Row>
        </SelectNftContainer.Wrapper.Col>
      </SelectNftContainer.Wrapper.Row>
    </>
  )
}

const SelectNftContainer = {
  Wrapper: {
    Row: styled(Row)`
      width: ${(props) => (props.theme.breakpoint === 'mobile' ? '100%' : '500px')};
      background-color: #20202a;
      border-radius: 20px;
      padding: 35px;
    `,
    Col: styled(Col)`
      display: flex;
      flex-direction: column;
    `
  },
  Contents: {
    Row: styled(Row)``,
    Col: styled(Col)`
      display: flex;
      flex-direction: column;
      align-items: center;
    `,
    NftImg: styled.img`
      width: 200px;
      height: 200px;
      border-radius: 10px;
      ${(props) => !props.src && 'background-color:#5f5f5f;'};
    `,
    NoneImage: styled.div`
      width: 200px;
      height: 200px;
      background-color: #5f5f5f;
      border-radius: 10px;
    `
  }
}

export default SelectNft
