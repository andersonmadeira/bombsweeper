import React from 'react'
import styled from '@emotion/styled'

const StyledTile = styled.div<{ hasMine: boolean }>`
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  // temporary, just for debugging purposes
  background: ${({ hasMine }) => (hasMine ? 'tomato' : '#797ef6')};
  border: 0;
  margin: 1px;
`

export interface TileProps {
  line: number
  column: number
  field: Record<string, boolean>
  onGameOver: () => void
  step: 'in_progress' | 'over'
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

export const Tile: React.FC<TileProps> = ({ line, column, field, onGameOver, step }) => {
  const [label, setLabel] = React.useState<string>('')

  const code = `${line}-${column}`

  React.useEffect(() => {
    if (step === 'in_progress') {
      setLabel('')
    }
  }, [step])

  const handleClickTile = React.useCallback(() => {
    const mineCount = searchMines(line, column, field)
    const tileLabel = mineCount === -1 ? '*' : `${mineCount}`

    if (mineCount === -1) {
      onGameOver()
    }

    setLabel(tileLabel)
  }, [column, line, field, onGameOver])

  return (
    <StyledTile hasMine={field[code]} onClick={() => step === 'in_progress' && handleClickTile()}>
      <span>{label}</span>
    </StyledTile>
  )
}
