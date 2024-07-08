// Simulating an API call with a delay
export const fetchInitialCount = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 10)); // Random number between 0 and 9
    }, 1000);
  });
};
