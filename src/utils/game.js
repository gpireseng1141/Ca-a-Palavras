const DIRECTIONS = [
  [0, 1], [1, 0], [1, 1], [-1, 1],
  [0, -1], [-1, 0], [-1, -1], [1, -1]
]
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVXZ'

export function createPuzzle(words, size) {
  const grid = Array.from({ length: size }, () => Array(size).fill(''))
  const placements = {}
  const ordered = [...words].sort((a, b) => b.length - a.length)

  for (const word of ordered) {
    let placed = false
    for (let attempt = 0; attempt < 500 && !placed; attempt++) {
      const [dr, dc] = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)]
      const row = Math.floor(Math.random() * size)
      const col = Math.floor(Math.random() * size)
      const endRow = row + dr * (word.length - 1)
      const endCol = col + dc * (word.length - 1)
      if (endRow < 0 || endRow >= size || endCol < 0 || endCol >= size) continue
      const cells = Array.from({ length: word.length }, (_, i) => ({ row: row + dr * i, col: col + dc * i }))
      if (cells.some(({ row: r, col: c }, i) => grid[r][c] && grid[r][c] !== word[i])) continue
      cells.forEach(({ row: r, col: c }, i) => { grid[r][c] = word[i] })
      placements[word] = cells
      placed = true
    }
    if (!placed) throw new Error(`Não foi possível posicionar a palavra ${word}.`)
  }

  return {
    grid: grid.map(row => row.map(letter => letter || LETTERS[Math.floor(Math.random() * LETTERS.length)])),
    placements
  }
}

export function getStraightLine(start, end) {
  if (!start || !end) return []
  const dr = end.row - start.row
  const dc = end.col - start.col
  if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return []
  const steps = Math.max(Math.abs(dr), Math.abs(dc))
  const stepR = Math.sign(dr)
  const stepC = Math.sign(dc)
  return Array.from({ length: steps + 1 }, (_, i) => ({ row: start.row + stepR * i, col: start.col + stepC * i }))
}

export function lineKey(cells) {
  return cells.map(({ row, col }) => `${row}-${col}`).join('|')
}