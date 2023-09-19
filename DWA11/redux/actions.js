/**
 * Function to increment the counter.
 * @returns {Object} An action object with type 'INCREMENT'.
 */
const increment = () => {
  return {
    type: "INCREMENT",
  };
};

/**
 * Function to decrement the counter.
 * @returns {Object} An action object with type 'DECREMENT'.
 */
const decrement = () => {
  return {
    type: "DECREMENT",
  };
};

/**
 * Function to reset the counter.
 * @returns {Object} An action object with type 'RESET'.
 */
const reset = () => {
  return {
    type: "RESET",
  };
};

export { increment, decrement, reset };
