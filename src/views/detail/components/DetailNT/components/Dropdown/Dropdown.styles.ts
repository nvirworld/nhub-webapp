import styled from 'styled-components'

interface DropdownContainerProps {
  isOpen: boolean
}
export const DropdownContainer = styled.div<DropdownContainerProps>`
  position: relative;
  width: 100%;
  mig-height: 40px;
  border: ${(props) => (props.isOpen ? 'none' : `solid 1px ${props.theme.blue}`)};
  border-radius: 10px;
  background-color: #121212;
  cursor: pointer;
`

export const DropdownSelectedItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 16px 20px;
`

export const DropdownList = styled.div`
  position: absolute;
  top: 35px;
  left: 0;
  z-index: 1;
  width: 100%;
  overflow: scroll-y;
`

export const DropdownItemBlock = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 0;
  margin: 0;
`
export const DropdownItem = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background-color: #121212;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  // background-color: #ffffff;
`

export const DropdownImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 3px;
  margin-right: 10px;
`
