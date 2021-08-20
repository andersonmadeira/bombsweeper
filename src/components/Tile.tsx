import React from 'react'
import styled from '@emotion/styled'

import { TileType } from './types'
import { getTileType } from './utils'

const StyledTile = styled.span<{ isRevealed: boolean; type: TileType }>`
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  background: ${({ isRevealed, type }) =>
    !isRevealed || type === 'number' ? '#77C063' : type === 'bomb' ? 'tomato' : '#8F6F4F'};
  border: 2px solid
    ${({ isRevealed, type }) =>
      !isRevealed || type === 'number' ? '#569358' : type === 'bomb' ? 'tomato' : '#6C4D36'};

  box-shadow: ${({ isRevealed, type }) =>
    isRevealed && type === 'empty'
      ? 'inset 2px 2px 8px #4f372e'
      : '0px 3px 15px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5)'};

  transition: all 500ms ease-in-out;
`

const TileLabel = styled.span<{ isRevealed: boolean }>`
  color: #345835;
  font-weight: 700;
  font-size: 18px;
  visibility: ${({ isRevealed }) => (isRevealed ? 'visible' : 'hidden')};
  opacity: ${({ isRevealed }) => (isRevealed ? 1 : 0)};
`

export interface TileProps {
  line: number
  column: number
  value: number
  handleReveal: (line: number, column: number) => void
  isRevealed: boolean
}

export const Tile: React.FC<TileProps> = ({ line, column, value, handleReveal, isRevealed }) => {
  const type = getTileType(value)

  return (
    <StyledTile
      type={type}
      isRevealed={isRevealed}
      onClick={() => handleReveal(line, column)}
      aria-role="button"
    >
      <TileLabel isRevealed={isRevealed}>
        {type === 'bomb' ? '💣' : type === 'number' ? value : ''}
      </TileLabel>
    </StyledTile>
  )
}
