/**
 * General-purpose test helpers.
 */

/**
 * Returns true if the given array is sorted in ascending order.
 */
export function isSortedAscending(arr: (string | number)[]): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }
  return true;
}

/**
 * Returns true if the given array is sorted in descending order.
 */
export function isSortedDescending(arr: (string | number)[]): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < arr[i + 1]) return false;
  }
  return true;
}

/**
 * Rounds a number to 2 decimal places (useful for price comparisons).
 */
export function roundToTwo(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Generates a random integer between min and max (inclusive).
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
