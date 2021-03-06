import React from 'react'

import { Tile } from '../Tile'
import { GameStatus } from '../types'
import { buildMineField, getTileCode, getTilesAround } from '../utils'
import { EndGameCard, EndGameEmoji, GameContainer, RestartButton, StyledGrid } from './styles'

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
              gameStatus={gameStatus}
              handleReveal={handleRevealTile}
              isRevealed={revealedTiles[tileCode] || gameStatus !== 'in_progress'}
            />
          )
        })}
      </StyledGrid>
      {gameStatus !== 'in_progress' && (
        <EndGameCard className="endgame-card">
          <EndGameEmoji>{gameStatus === 'lost' ? '??????' : '????'}</EndGameEmoji>
          <RestartButton gameStatus={gameStatus} onClick={() => setGameStatus('in_progress')}>
            Restart
          </RestartButton>
        </EndGameCard>
      )}
    </GameContainer>
  )
}
