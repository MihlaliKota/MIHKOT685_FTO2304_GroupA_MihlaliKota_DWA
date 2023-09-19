import createStore from "./redux/store.js";
import counterReducer from "./redux/reducer.js";
import { increment, decrement, reset } from "./redux/actions.js";

// Create the Redux store with the counter reducer
const store = createStore(counterReducer);

// Function to log the current state to the console
const logStateToConsole = () => {
  console.log("Current State:", store.getState());
};

// Function to increment the counter
const incrementCounter = () => {
  store.dispatch(increment());
  logStateToConsole();
};

// Function to decrement the counter
const decrementCounter = () => {
  store.dispatch(decrement());
  logStateToConsole();
};

// Function to reset the counter
const resetCounter = () => {
  store.dispatch(reset());
  logStateToConsole();
};

// Subscribe to state changes and update the HTML
store.subscribe(() => {
  const counterElement = document.getElementById("counter");
  counterElement.textContent = store.getState().toString();
});

// Connects to HTML elements
const incrementButton = document.getElementById("add");
const decrementButton = document.getElementById("subtract");
const resetButton = document.getElementById("reset");

// Event listener for the "Add" button
incrementButton.addEventListener("click", () => {
  incrementCounter();
});

// Event listener for the "Subtract" button
decrementButton.addEventListener("click", () => {
  decrementCounter();
});

// Event listener for the "Reset" button
resetButton.addEventListener("click", () => {
  resetCounter();
});

// Initial update of the counter in the HTML
logStateToConsole();
