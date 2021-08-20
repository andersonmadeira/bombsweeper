import React from 'react'
import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'

export const GlobalStyles: React.FC = () => (
  <Global
    styles={css`
      html,
      body,
      #root {
        height: 100%;
        margin: 0;
      }
    `}
  />
)

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f7faff;
`
