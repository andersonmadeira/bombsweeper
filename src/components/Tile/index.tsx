import React from 'react'

import { StyledTile, TileLabel } from './styles'
import { getTileType } from '../utils'

export interface TileProps {
  line: number
  column: number
  value: number
  handleReveal: (line: number, column: number) => void
  isRevealed: boolean
}

export const Tile: React.FC<TileProps> = ({ line, column, value, handleReveal, isRevealed }) => {
  const [isFlagged, setIsFlagged] = React.useState(false)

  React.useEffect(() => {
    if (isRevealed) {
      setIsFlagged(false)
    }
  }, [isRevealed])

  const type = getTileType(value)

  return (
    <StyledTile
      role="button"
      type={type}
      isRevealed={isRevealed}
      onClick={() => !isFlagged && handleReveal(line, column)}
      onContextMenu={e => {
        e.preventDefault()
        setIsFlagged(!isFlagged)
      }}
    >
      <TileLabel isRevealed={isRevealed || isFlagged}>
        {!isRevealed && isFlagged ? '🚩' : type === 'bomb' ? '💣' : type === 'number' ? value : ''}
      </TileLabel>
    </StyledTile>
  )
}
