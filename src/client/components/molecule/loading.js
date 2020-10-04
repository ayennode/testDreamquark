import React from 'react'
import styled from 'styled-components'

const StyledLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10%;
`

const StyledLoading = styled.div`
  position: relative;
  display: table-cell;
  width: 150px;
  height: 150px;
  background-color: #2c3e50;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  transition: box-shadow 250ms ease;

  color: #fff;
  margin: 5px 0;
  text-transform: uppercase;
  text-align: center;
  font-family: 'Arial', sans-serif;
  font-size: 10px;
  letter-spacing: 2px;
  line-height: 1.5;
  // padding-top: 55px;

  span:nth-child(1) {
    animation-delay: 800ms;
  }
  span:nth-child(2) {
    animation-delay: 600ms;
  }
  span:nth-child(3) {
    animation-delay: 400ms;
  }
  span:nth-child(4) {
    animation-delay: 200ms;
  }
  span:nth-child(6) {
    animation-delay: 200ms;
  }
  span:nth-child(7) {
    animation-delay: 400ms;
  }
  span:nth-child(8) {
    animation-delay: 600ms;
  }
  span:nth-child(9) {
    animation-delay: 800ms;
  }
`

const StyledSpanBar = styled.span`
  width: 1px;
  height: 12px;
  background: #fff;
  margin: 0 3px;
  display: inline-block;
  animation: opacity-2 1000ms infinite ease-in-out;

  @keyframes opacity-2 {
    0% {
      opacity: 1;
      height: 15px;
    }
    50% {
      opacity: 0;
      height: 15px;
    }
    100% {
      opacity: 1;
      height: 15px;
    }
  }
`

const StyledSpace = styled.div`
  padding-top: 55px;
`

export const Loading = () => (
  <StyledLoadingContainer>
    <StyledLoading>
      <StyledSpace>
        <div>loading</div>
        <StyledSpanBar />
        <StyledSpanBar />
        <StyledSpanBar />
        <StyledSpanBar />
        <StyledSpanBar />
        <StyledSpanBar />
        <StyledSpanBar />
        <StyledSpanBar />
        <StyledSpanBar />
      </StyledSpace>
    </StyledLoading>
  </StyledLoadingContainer>
)
