import { TileType } from './types'

export const getTileType = (value: number): TileType =>
  value === -1 ? 'bomb' : value > 0 ? 'number' : 'empty'

export const getTileCode = (line: number, column: number): string => `${line}-${column}`

export const probability = (n: number): boolean => !!n && Math.random() <= n

export const buildMineField = (
  lines: number,
  columns: number,
  mines: number,
): Record<string, number> => {
  const field: Record<string, number> = {}
  let minesLeft = mines

  for (let l = 0; l < lines; l++) {
    for (let c = 0; c < columns; c++) {
      const tileCode = getTileCode(l, c)

      field[tileCode] = 0

      if (minesLeft > 0 && probability(0.15)) {
        field[tileCode] = -1
        minesLeft -= 1
      }
    }
  }

  for (let l = 0; l < lines; l++) {
    for (let c = 0; c < columns; c++) {
      const tileCode = getTileCode(l, c)

      if (field[tileCode] === -1) {
        continue
      }

      field[tileCode] = countMinesAround(l, c, lines, columns, field)
    }
  }

  return field
}

export const countMinesAround = (
  line: number,
  column: number,
  lines: number,
  columns: number,
  field: Record<string, number>,
): number =>
  getTilesAround(line, column, lines, columns).reduce(
    (sum, pos) => (field[getTileCode(pos.l, pos.c)] === -1 ? sum + 1 : sum),
    0,
  )

export const getTilesAround = (
  line: number,
  column: number,
  lines: number,
  columns: number,
): { l: number; c: number }[] => {
  const tiles = []

  for (let l = line - 1; l <= line + 1; l++) {
    for (let c = column - 1; c <= column + 1; c++) {
      if (l < 0 || l >= lines || c < 0 || c >= columns) {
        continue
      }

      tiles.push({ l, c })
    }
  }

  return tiles
}
