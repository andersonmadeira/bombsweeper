import React from 'react'
import styled from '@emotion/styled'

import { GameStatus } from './types'

const StyledTile = styled.div<{ isRevealed: boolean; hasMine: boolean }>`
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  // temporary, just for debugging purposes
  background: ${({ isRevealed, hasMine }) => (hasMine && isRevealed ? 'tomato' : '#77C063')};
  border: 2px solid #569358;

  transition: all 500ms ease-in-out;
`

const LabelNumber = styled.span`
  color: #345835;
  font-weight: 700;
  font-size: 18px;
`

const LabelMine = styled.span`
  font-size: 15px;
`

export interface TileProps {
  line: number
  column: number
  field: Record<string, boolean>
  onGameOver: () => void
  gameStatus: GameStatus
}

const searchMines = (line: number, column: number, field: Record<string, boolean>): number => {
  let count = 0

  if (field[`${line}-${column}`]) {
    return -1
  }

  for (let l = line - 1; l <= line + 1; l++) {
    for (let c = column - 1; c <= column + 1; c++) {
      if (field[`${l}-${c}`] && (l !== line || c !== column)) {
        count += 1
      }
    }
  }

  return count
}

export const Tile: React.FC<TileProps> = ({ line, column, field, onGameOver, gameStatus }) => {
  const [label, setLabel] = React.useState<JSX.Element>()

  const code = `${line}-${column}`

  const handleClickTile = React.useCallback(() => {
    const mineCount = searchMines(line, column, field)
    const tileLabel =
      mineCount === -1 ? <LabelMine>💣</LabelMine> : <LabelNumber>{mineCount}</LabelNumber>

    if (mineCount === -1) {
      onGameOver()
    }

    setLabel(tileLabel)
  }, [column, line, field, onGameOver])

  React.useEffect(() => {
    if (gameStatus === 'in_progress') {
      setLabel(undefined)
    } else {
      handleClickTile()
    }
  }, [gameStatus, handleClickTile])

  return (
    <StyledTile
      hasMine={field[code]}
      isRevealed={gameStatus !== 'in_progress'}
      onClick={() => gameStatus === 'in_progress' && handleClickTile()}
    >
      {label}
    </StyledTile>
  )
}
