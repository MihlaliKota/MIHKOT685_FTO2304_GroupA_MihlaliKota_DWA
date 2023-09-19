/**
 * Reducer function for managing the counter state.
 * @param {number} state - The current state of the counter.
 * @param {Object} action - The action object that describes the state change.
 * @returns {number} The new state of the counter.
 */
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "RESET":
      return 0;
    default:
      return state;
  }
};

export default counterReducer;
