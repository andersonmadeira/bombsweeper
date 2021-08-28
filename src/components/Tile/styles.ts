import styled from '@emotion/styled'

import { GameStatus, TileType } from '../types'

export const StyledTile = styled.span<{
  isRevealed: boolean
  gameStatus: GameStatus
  type: TileType
}>`
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  background: ${({ isRevealed, type, gameStatus }) =>
    !isRevealed || type === 'number'
      ? '#77C063'
      : type === 'empty'
      ? '#8F6F4F'
      : gameStatus === 'lost'
      ? 'tomato'
      : '#77C063'};
  border: 2px solid
    ${({ isRevealed, type, gameStatus }) =>
      !isRevealed || type === 'number'
        ? '#569358'
        : type === 'empty'
        ? '#6C4D36'
        : gameStatus === 'lost'
        ? 'tomato'
        : '#569358'};

  box-shadow: ${({ isRevealed, type }) =>
    isRevealed && type === 'empty'
      ? 'inset 2px 2px 8px #4f372e'
      : '0px 3px 15px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5)'};

  transition: all 500ms ease-in-out;
`

export const TileLabel = styled.span<{ isRevealed: boolean }>`
  color: #345835;
  font-weight: 700;
  font-size: 18px;
  visibility: ${({ isRevealed }) => (isRevealed ? 'visible' : 'hidden')};
  opacity: ${({ isRevealed }) => (isRevealed ? 1 : 0)};
`
