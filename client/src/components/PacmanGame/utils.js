export const initGridState = (rows, cols) => {
  const column = new Array(cols).fill(0);
  return new Array(rows).fill(column);
};
