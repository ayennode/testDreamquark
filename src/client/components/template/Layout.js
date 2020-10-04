import React, { useRef, useState, useEffect } from 'react'
import { Menu, Container, Content, Box, Modal, Loading } from '../../components'
import styled from 'styled-components'

export const Layout = ({ menuList, modal, children }) => (
  <>
    <Content>
      <InsideContent>
        <Modal active={modal}>
          <Loading />
        </Modal>
        <Menu items={menuList} />
        <Container small>
          <Box>{children}</Box>
        </Container>
      </InsideContent>
    </Content>
  </>
)

const StyledLayout = styled.div`
  display: flex;
  flex-flow: row wrap;
  height: auto;
  min-height: ${({ minHeight }) => minHeight}px;
  background-color: #e6e6e6;
`

export const InsideContent = ({ children, ...rest }) => {
  const [height, setHeight] = useState('auto')
  const ref = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight - 1) //header - footer - forcePadding
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })
  return (
    <StyledLayout ref={ref} minHeight={height} {...rest}>
      {children}
    </StyledLayout>
  )
}
