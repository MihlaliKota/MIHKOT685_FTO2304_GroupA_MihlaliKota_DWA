/**
 * @param {Function} reducer - A reducer function that manages the state.
 * @returns {Object} An object with methods for managing state.
 */
const createStore = (reducer) => {
  let state = undefined;
  const subscribers = [];

  /**
   * Get the current state.
   * @returns {*} The current state.
   */
  const getState = () => state;

  /**
   * Dispatch an action to update the state.
   * @param {Object} action - An action object describing the state change.
   */
  const dispatch = (action) => {
    state = reducer(state, action);
    subscribers.forEach((subscriber) => subscriber());
  };

  /**
   * Subscribe to state changes.
   * @param {Function} subscriber - A function to be called when the state changes.
   * @returns {Function} A function to unsubscribe from state changes.
   */
  const subscribe = (subscriber) => {
    subscribers.push(subscriber);

    // Return an unsubscribe function
    return () => {
      const index = subscribers.indexOf(subscriber);
      if (index !== -1) {
        subscribers.splice(index, 1);
      }
    };
  };

  // Initialize the state
  dispatch({ type: "@@INIT" });

  return { getState, dispatch, subscribe };
};

export default createStore;
