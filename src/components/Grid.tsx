import React from 'react'
import styled from '@emotion/styled'

import { Tile } from './Tile'
import { GameStatus } from './types'

const StyledGrid = styled.div<{ columns: number }>`
  display: grid;
  width: calc(${({ columns }) => columns} * 30px);
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  border: 0;
`

const GameContainer = styled.div<{ lines: number; columns: number }>`
  position: relative;
  width: calc(${({ columns }) => columns} * 30px);
  height: calc(${({ lines }) => lines} * 30px);
`

const EndGameInfo = styled.div`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  padding: 20px;
  width: 180px;
  height: 180px;
  left: calc(50% - (180px / 2));
  top: calc(50% - (180px / 2));
`

const EndGameEmoji = styled.span`
  font-size: 80px;
  margin-bottom: 10px;
`

const RestartButton = styled.button<{ gameStatus: GameStatus }>`
  cursor: pointer;
  padding: 6px 12px;
  border: 0;
  color: #fff;
  background-color: ${({ gameStatus }) => (gameStatus === 'lost' ? 'tomato' : '#77c063')};
  border-radius: 4px;
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
  const [gameStatus, setGameStatus] = React.useState<GameStatus>('in_progress')
  const [minefield, setMinefield] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    if (gameStatus === 'in_progress') {
      const field = buildMineField(lines, columns, mines)
      setMinefield(field)
    }
  }, [lines, columns, mines, gameStatus])

  const onGameOver = React.useCallback(() => setGameStatus('lost'), [])

  return (
    <GameContainer lines={lines} columns={columns}>
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
              gameStatus={gameStatus}
            />
          )
        })}
      </StyledGrid>
      {gameStatus !== 'in_progress' && (
        <EndGameInfo>
          <EndGameEmoji>☠️</EndGameEmoji>
          <RestartButton gameStatus={gameStatus} onClick={() => setGameStatus('in_progress')}>
            Restart
          </RestartButton>
        </EndGameInfo>
      )}
    </GameContainer>
  )
}

// bomb => 💣
// win => 😎
// loose => ☠️
