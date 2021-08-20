import React from 'react'
import styled from '@emotion/styled'

import { Tile } from './Tile'
import { GameStatus } from './types'
import { buildMineField, getTileCode, getTilesAround } from './utils'

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

  &:hover .endgame-card {
    opacity: 1;
  }
`

const EndGameCard = styled.div`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 20px;
  width: 180px;
  height: 180px;
  left: calc(50% - (180px / 2));
  top: calc(50% - (180px / 2));
  transform: perspective(750px) translate3d(0px, 0px, -250px) rotateX(27deg) scale(0.9, 0.9);
  border: 5px solid #e6e6e6;
  box-shadow: 0 70px 40px -20px rgba(0, 0, 0, 0.2);
  transition: 0.4s ease-in-out transform, 0.3s ease-in-out opacity;

  opacity: 0;

  &:hover {
    transform: translate3d(0px, 0px, -250px);

    & button {
      opacity: 1;
      transform: translate3d(0px, 0px, 0px);
    }
  }
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

  opacity: 0;
  transform: translate3d(0px, 50px, 0px);

  transition: 0.4s ease-in-out transform, 0.2s ease-in-out opacity;
`

export interface GridProps {
  lines: number
  columns: number
  mines: number
}

export const Grid: React.FC<GridProps> = ({ lines, columns, mines }) => {
  const [gameStatus, setGameStatus] = React.useState<GameStatus>('in_progress')
  const [minefield, setMinefield] = React.useState<Record<string, number>>({})
  const [revealedTiles, setRevealedTiles] = React.useState<Record<string, boolean>>({})

  const handleRevealTile = React.useCallback(
    (line: number, column: number) => {
      const tileCode = getTileCode(line, column)
      const newRevealedTiles: Record<string, boolean> = {}
      const toBeRevealed = [{ line, column }]

      if (minefield[tileCode] === -1) {
        setGameStatus('lost')
      }

      while (toBeRevealed.length > 0) {
        const next = toBeRevealed.pop()

        if (next) {
          const tileCode = getTileCode(next.line, next.column)

          newRevealedTiles[tileCode] = true

          if (minefield[tileCode] > 0) {
            continue
          }

          getTilesAround(next.line, next.column, lines, columns).forEach(pos => {
            const code = getTileCode(pos.l, pos.c)

            if (!revealedTiles[code] && !newRevealedTiles[code]) {
              toBeRevealed.push({ line: pos.l, column: pos.c })
            }
          })
        }
      }

      setRevealedTiles(revealed => ({ ...revealed, ...newRevealedTiles }))
    },
    [lines, columns, minefield, revealedTiles],
  )

  React.useEffect(() => {
    if (gameStatus === 'in_progress') {
      const field = buildMineField(lines, columns, mines)
      setMinefield(field)
      setRevealedTiles({})
    }
  }, [lines, columns, mines, gameStatus])

  React.useEffect(() => {
    if (Object.keys(revealedTiles).length + mines === lines * columns) {
      setGameStatus(currentStatus => (currentStatus === 'in_progress' ? 'won' : currentStatus))
    }
  }, [revealedTiles, setGameStatus, lines, columns, mines])

  return (
    <GameContainer lines={lines} columns={columns}>
      <StyledGrid columns={columns}>
        {[...new Array(lines * columns)].map((_, i) => {
          const line = Math.floor(i / lines)
          const column = i % columns
          const tileCode = getTileCode(line, column)

          return (
            <Tile
              key={tileCode}
              line={line}
              column={column}
              value={minefield[tileCode]}
              handleReveal={handleRevealTile}
              isRevealed={revealedTiles[tileCode] || gameStatus !== 'in_progress'}
            />
          )
        })}
      </StyledGrid>
      {gameStatus !== 'in_progress' && (
        <EndGameCard className="endgame-card">
          <EndGameEmoji>{gameStatus === 'lost' ? '☠️' : '😎'}</EndGameEmoji>
          <RestartButton gameStatus={gameStatus} onClick={() => setGameStatus('in_progress')}>
            Restart
          </RestartButton>
        </EndGameCard>
      )}
    </GameContainer>
  )
}
