import React, { useState, useRef, useEffect } from 'react'
import {
  DropdownContainer,
  DropdownList,
  DropdownItemBlock,
  DropdownItem,
  DropdownSelectedItemWrapper,
  DropdownImg
} from './Dropdown.styles'
import { INft721Item } from '../../../../../../types/entity.type'
import * as Shared from '../../../../../../components/Shared'

interface DropdownProps {
  // items: DropdownItemProps[]
  // onItemSelected: (item: DropdownItemProps) => void
  selectedItem: INft721Item | null
  items: INft721Item[]
  onItemSelected: (INft721Item: any) => void
}

const Dropdown: React.FC<DropdownProps> = ({ selectedItem, items, onItemSelected }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleItemClick = (item: INft721Item) => {
    onItemSelected(item)
    setIsOpen(false)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current != null && containerRef.current.contains(event.target as Node)) {
      return
    }
    setIsOpen(false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <DropdownContainer ref={containerRef} isOpen={isOpen}>
      <DropdownSelectedItemWrapper onClick={() => setIsOpen(!isOpen)}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Shared.NhubTypo type="regular" usage="subTitle">
            Select your NFT
          </Shared.NhubTypo>
          <Shared.NhubIcon.DropDownArrowIcon />
        </div>
        {isOpen && (
          <DropdownList>
            <DropdownItemBlock>
              {items
                .filter((item) => item.tokenId !== selectedItem?.tokenId)
                .map((item, index) => (
                  <DropdownItem key={index} onClick={() => handleItemClick(item)}>
                    <DropdownImg src={item?.nft721.imgUrl} />
                    <Shared.NhubTypo type="bold" usage="stakeBtn">
                      {item?.nft721.name} {item.tokenId}
                    </Shared.NhubTypo>
                  </DropdownItem>
                ))}
            </DropdownItemBlock>
          </DropdownList>
        )}
      </DropdownSelectedItemWrapper>
    </DropdownContainer>
  )
}

export default Dropdown
