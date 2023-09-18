/**
 * Redux-inspired store.
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

// Create the Redux store with the counter reducer
const store = createStore(counterReducer);

// Function to log the current state to the console
const logStateToConsole = () => {
  console.log("Current State:", store.getState());
};

// Function to increment the counter
const incrementCounter = () => {
  store.dispatch({ type: "INCREMENT" });
};

// Function to decrement the counter
const decrementCounter = () => {
  store.dispatch({ type: "DECREMENT" });
};

// Function to reset the counter
const resetCounter = () => {
  store.dispatch({ type: "RESET" });
};

// Subscribe to state changes and update the HTML
store.subscribe(() => {
  const counterElement = document.getElementById("counter");
  counterElement.textContent = store.getState().toString();
});