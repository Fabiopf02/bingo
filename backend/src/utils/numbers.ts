const maxNumbersForColumn = 5;
const numberOfColumns = 5;

function createValues(): Array<number[]> {
  const columns: Array<number[]> = [];
  for (let i = 0; i < numberOfColumns; i += 1) {
    const column: number[] = [];
    for (let j = i * 15 + 1; j <= (i + 1) * 15; j += 1) {
      column.push(j);
    }
    columns.push(column);
  }

  return columns;
}

export function generateCardNumbers(): Array<number[]> {
  const columns: Array<number[]> = [];
  const values: Array<number[]> = createValues();

  for (let i = 0; i < numberOfColumns; i += 1) {
    const col: number[] = values[i];
    const column: number[] = [];
    for (let j = 0; j < maxNumbersForColumn; j += 1) {
      const randomPosition = Math.floor(Math.random() * col.length);
      const value = col[randomPosition];
      column.push(value);
      col.splice(randomPosition, 1);
    }
    const sorted = column.sort((a, b) => a - b);
    columns.push(sorted);
  }

  columns[2][2] = 0;
  return columns;
}
