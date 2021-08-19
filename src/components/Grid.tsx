import React from 'react'
import styled from '@emotion/styled'
import { Tile } from './Tile'

const StyledGrid = styled.div<{ columns: number }>`
  display: grid;
  width: max-content;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  border: 0;
`

export interface GridProps {
  lines: number
  columns: number
  mines: number
}

const probability = (n: number): boolean => !!n && Math.random() <= n

const buildMineField = (lines: number, columns: number, mines: number): Record<string, boolean> => {
  const field: Record<string, boolean> = {}
  let minesLeft = mines

  for (let l = 0; l < lines; l++) {
    for (let c = 0; c < columns; c++) {
      const tileCode = `${l}-${c}`
      const hasMine = probability(0.15)

      field[tileCode] = hasMine

      if (hasMine) {
        minesLeft -= 1
      }

      if (minesLeft === 0) {
        return field
      }
    }
  }

  return field
}

export const Grid: React.FC<GridProps> = ({ lines, columns, mines }) => {
  const [gameStep, setGameStep] = React.useState<'in_progress' | 'over'>('in_progress')
  const [minefield, setMinefield] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    if (gameStep !== 'over') {
      const field = buildMineField(lines, columns, mines)
      setMinefield(field)
    }
  }, [lines, columns, mines, gameStep])

  const onGameOver = React.useCallback(() => setGameStep('over'), [])

  return (
    <>
      <StyledGrid columns={columns}>
        {[...new Array(lines * columns)].map((_, i) => {
          const line = Math.floor(i / lines)
          const column = i % columns
          const tileCode = `${line}-${column}`
          return (
            <Tile
              key={tileCode}
              field={minefield}
              line={line}
              column={column}
              onGameOver={onGameOver}
              step={gameStep}
            />
          )
        })}
      </StyledGrid>
      {gameStep === 'over' && (
        <>
          <span>Game Over!</span>
          <button onClick={() => setGameStep('in_progress')}>Restart</button>
        </>
      )}
    </>
  )
}
