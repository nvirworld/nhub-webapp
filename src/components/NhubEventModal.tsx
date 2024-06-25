import React, { useEffect, useState } from 'react'
import { Modal as AntdModal, Image } from 'antd'
import { styled } from 'styled-components'
import * as Shared from './Shared'

interface NhubEventModalProps {
  children: React.ReactNode
  src: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Modal = styled(AntdModal)`
  .ant-modal-content {
    border-radius: 0;
    padding: 0;
  }
  .ant-modal-close {
  }
  .ant-modal-close-x {
  }
`

const CloseButton = styled.button`
  background-color: #137afa;
  height: 25px;
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
`

const NhubEventModal = (props: NhubEventModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    const pathname = window.location.pathname
    if (pathname === '/dashboard' || pathname === '/welcome') {
      setIsOpen(true)
    }
  }, [])
  return (
    <>
      {isOpen && (
        <Modal
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          footer={null}
          mask={false}
          centered={true}
          closeIcon={false}
        >
          <Wrapper>
            <Image width={'100%'} height={'100%'} src={props.src} />
            <CloseButton onClick={() => setIsOpen(false)}>
              <Shared.NhubTypo type="regular" usage="cardTitle">
                Close
              </Shared.NhubTypo>
            </CloseButton>
          </Wrapper>
        </Modal>
      )}
      {props.children}
    </>
  )
}

export default NhubEventModal
