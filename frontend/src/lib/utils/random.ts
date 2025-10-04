// Get a random item from an array
export const getRandomItem = <T,>(items: readonly T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};
