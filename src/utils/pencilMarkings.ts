/**
 * either removes or inserts the desired mark from the array of marks
 * @param markingsAtIndex the array of current pencil marks
 * @param markingNumber the desired mark
 */
export function getResultingMarks(markingsAtIndex: number[], markingNumber: number) {
  if (markingsAtIndex?.includes(markingNumber)) {
    return markingsAtIndex?.filter(number => number !== markingNumber);
  } else {
    return [...new Set([...markingsAtIndex, markingNumber])].sort((a, b) => a - b);
  }
}